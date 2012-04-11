FACEBOOK_APP_ID = "185318768251247"
FACEBOOK_APP_SECRET = "f9cb1482d17dd99f33f0a76a427b54e0"
PREDICTION_LIMITS = {
  'p_r': {'min': 0, 'max': 150,},
  'p_w': {'min': 1, 'max': 10,},
  'p_s': {'min': 1, 'max': 10,},
  't_r': {'min': 0, 'max': 250,},
  't_s': {'min': 1, 'max': 30,},
}

# TODO move the above to config file. Hide from git.

import webapp2
import jinja2
import os
import facebook
import urllib2
import yaml
import datetime
import time
import json

from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.api.urlfetch import fetch
from google.appengine.ext.db import Key


from schema import *

# We initialize the templating engine with the current files path
jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class BaseHandler(webapp2.RequestHandler):
    """Provides access to the active Facebook user in self.current_user

    The property is lazy-loaded on first access, using the cookie saved
    by the Facebook JavaScript SDK to determine the user ID of the active
    user. See http://developers.facebook.com/docs/authentication/ for
    more information.
    """
    @property
    def current_user(self):
        if not hasattr(self, "_current_user"):
            self._current_user = None
            cookie = facebook.get_user_from_cookie(
                self.request.cookies, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET)
            if cookie:
                # Store a local instance of the user data so we don't need
                # a round-trip to Facebook on every request
                user = User.get_by_key_name(cookie["uid"])
                if not user:
                    graph = facebook.GraphAPI(cookie["access_token"])
                    profile = graph.get_object("me")
                    user = User(key_name=str(profile["id"]),
                                id=str(profile["id"]),
                                name=profile["name"],
                                profile_url=profile["link"],
                                access_token=cookie["access_token"],
                                email=profile['email']
                                )
                    user.put()
                elif user.access_token != cookie["access_token"]:
                    user.access_token = cookie["access_token"]
                    user.put()
                self._current_user = user
        return self._current_user


class MainPage(BaseHandler):
  """Renders the homepage where users can start playing the game straight away"""
  def get(self):
    match_team_stats = TeamMatchStats.get_matches_team_stats()
    match_player_stats = PlayerMatchStats.get_matches_player_stats()
    
#    self.response.out.write(match_player_stats)
    
    current_user_predictions = Prediction.get_user_predictions(self.current_user)
    if self.current_user is not None:
      current_user_key = str(self.current_user.key())
    else:
      current_user_key = None
#    stream = open("cp_static_data.yaml", "r") #TODO: use only on local setup
#    stream = open("cp_static_data_dev.yaml", "r") #TODO: use only on cp-dev setup
    stream = open("cp_static_data_live.yaml", "r") #TODO: use only on cp-live setup
    cp_data = yaml.load(stream)
    
    '''
    Add tags to matches to reflect what the user can do in their context and what information is shown there
          future => matches that are more than a day away from current time and are still not open for predictions
          open => matches which are about to take place and are open for predictions
          pending => matches that have their predictions closed but scoring and point calculation not done yet
          closed => matches which are over and scoring, points calculation has been done as well
    ''' 
    current_datetime = datetime.datetime.now() #TODO real val to use
#    current_datetime = datetime.datetime.strptime('Fri Apr 10 2012 19:00','%a %b %d %Y %H:%M') #TODO temp val to use
    for match_key in cp_data['match_keys']:
      match_datetime = cp_data['matches'][match_key]['start_time']
      match_time_delta = match_datetime - current_datetime
      if (match_time_delta.days > 0):
        cp_data['matches'][match_key]['flag'] = 'future'
        cp_data['matches'][match_key]['pred_start_time'] = (match_datetime - datetime.timedelta(days=1))
      elif (match_time_delta.days < 0):
        # If scores of this match are updated then the match is 'closed' else it is 'pending'
        if cp_data['matches'][match_key]['key'] in match_team_stats :
          cp_data['matches'][match_key]['flag'] = 'closed' 
        else:
          cp_data['matches'][match_key]['flag'] = 'pending'
      else:
        cp_data['matches'][match_key]['flag'] = 'open'
    
    template_values = {
      'cp': cp_data,
      'current_user': self.current_user,
      'current_user_key': current_user_key,
      'request': self.request,
      'environ': os.environ,
      'facebook_app_id': FACEBOOK_APP_ID,
      'prediction_limits': PREDICTION_LIMITS,
      'user_pred': current_user_predictions,
      'match_player_stats': match_player_stats,
      'match_team_stats': match_team_stats,
                       }
    
    template = jinja_environment.get_template('templates/homepage_2.html')
    self.response.out.write(template.render(template_values))
    
class PredHandler(BaseHandler):
  """Has URL callbacks for saving and loading predicitons via Ajax"""
  def post(self):
    if self.current_user:
      if self.request.get('pred_key'):
        pred = Prediction.get((Key(self.request.get('pred_key'))))
      else:
        pred = Prediction()
      
      pred.user = self.current_user
      pred.match = Key(self.request.get('match_key'))
      
      pred.pred_six_player = Key(self.request.get('player_six'))
      pred.pred_six_player_val = int(self.request.get('player_six_pred'))
      
      pred.pred_wicket_player = Key(self.request.get('player_wicket'))
      pred.pred_wicket_player_val = int(self.request.get('player_wicket_pred'))
      
      pred.pred_run_player = Key(self.request.get('player_run'))
      pred.pred_run_player_val = int(self.request.get('player_run_pred'))
      
      pred.pred_six_team = Key(self.request.get('team_six'))
      pred.pred_six_team_val = int(self.request.get('team_six_pred'))
      
      pred.pred_run_team = Key(self.request.get('team_run'))
      pred.pred_run_team_val = int(self.request.get('team_run_pred'))
      
      pred_key = pred.put()
      if pred_key:
        response = {'status': 'SUCCESS', 'pred_key': str(pred_key)}
        json_response = json.dumps(response)
        self.response.headers.add_header('content-type', 'application/json', charset='utf-8')
        self.response.out.write(json_response)
      else:
        response = {'status': 'FAIL', 'pred_key': pred_key}
        json_response = json.dumps(response)
        self.response.headers.add_header('content-type', 'application/json', charset='utf-8')
        self.response.out.write(json_response)


class UserMatchPredHandler(BaseHandler):
  def get(self,match_keyname_raw,match_string_raw):
    # Get the match key
    
    match_keyname = match_keyname_raw.replace("-","_")
    match_string = match_string_raw.replace("-"," ")
    user_key = self.request.get('user')
    
    match_team_stats = TeamMatchStats.get_matches_team_stats()
    match_player_stats = PlayerMatchStats.get_matches_player_stats()    
    
#    stream = open("cp_static_data.yaml", "r") #TODO: use only on local setup
#    stream = open("cp_static_data_dev.yaml", "r") #TODO: use on the dev setup
    stream = open("cp_static_data_live.yaml", "r") #TODO: use on the live setup
    cp_data = yaml.load(stream)
    
    user = User.get(Key(user_key))
    user_pred = Prediction.get_user_predictions(user)
    
    current_datetime = datetime.datetime.now() #TODO real val to use
#    current_datetime = datetime.datetime.strptime('Fri Apr 6 2012 18:00','%a %b %d %Y %H:%M') #TODO temp val to use
#    current_datetime = datetime.datetime.strptime('Fri Apr 10 2012 19:00','%a %b %d %Y %H:%M') #TODO temp val to use
    for match_key in cp_data['match_keys']:
      match_datetime = cp_data['matches'][match_key]['start_time']
      match_time_delta = match_datetime - current_datetime
      if (match_time_delta.days > 0):
        cp_data['matches'][match_key]['flag'] = 'future'
        cp_data['matches'][match_key]['pred_start_time'] = (match_datetime - datetime.timedelta(days=1))
      elif (match_time_delta.days < 0):
        # If scores of this match are updated then the match is 'closed' else it is 'pending'
        if cp_data['matches'][match_key]['key'] in match_team_stats :
          cp_data['matches'][match_key]['flag'] = 'closed' 
        else:
          cp_data['matches'][match_key]['flag'] = 'pending'
      else:
        cp_data['matches'][match_key]['flag'] = 'open'
    
    template_values = {
      'cp': cp_data,
      'user': user,
      'match_key': match_keyname,
      'match_string': match_string,
      'environ': os.environ,
      'current_user': self.current_user,
      'request': self.request,
      'facebook_app_id': FACEBOOK_APP_ID,
      'prediction_limits': PREDICTION_LIMITS,
      'user_pred': user_pred,
      'match_player_stats': match_player_stats,
      'match_team_stats': match_team_stats,
                       }
    
    template = jinja_environment.get_template('templates/direct_url_user_match_pred.html')
    self.response.out.write(template.render(template_values))
    
#    self.response.out.write('You will see preds for match = ' + match_keyname + ' made by user = ' + user_key)


# Once app.yaml sends us here we call use appropriate clases to show functionality for appropriate paths
app = webapp2.WSGIApplication([
  ('/', MainPage),
  ('/pred/put', PredHandler),
  ('/ipl-2012/prediction/(.*)/(.*)', UserMatchPredHandler),
], debug = True)
  
