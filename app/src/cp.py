FACEBOOK_APP_ID = "185318768251247"
FACEBOOK_APP_SECRET = "f9cb1482d17dd99f33f0a76a427b54e0"
PREDICTION_LIMITS = {
  'p_r': {'min': 0, 'max': 150,},
  'p_w': {'min': 1, 'max': 10,},
  'p_s': {'min': 1, 'max': 10,},
  't_r': {'min': 0, 'max': 250,},
  't_s': {'min': 1, 'max': 30,},
}

import webapp2
import jinja2
import os
import facebook
import urllib2
import pprint

from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.api.urlfetch import fetch

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
  def get(self):
    matches = Match.all().fetch(1000)
#    items = []
#    for match in matches:
#      item = {'str_key': str(match.key().id_or_name()),
#              'data': match 
#              }
#      items.append(item)
    template_values = {
      'matches': matches,
      'current_user': self.current_user,
      'facebook_app_id': FACEBOOK_APP_ID,
      'prediction_limits': PREDICTION_LIMITS,
                       }
    template = jinja_environment.get_template('templates/homepage.html')
    self.response.out.write(template.render(template_values))

# Once app.yaml sends us here we call use appropriate clases to show functionality for appropriate paths
app = webapp2.WSGIApplication([
  ('/', MainPage),
], debug = True)
  