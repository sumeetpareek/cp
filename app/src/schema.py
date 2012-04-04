from google.appengine.ext import db

import datetime
import time
SIMPLE_TYPES = (int, long, float, bool, dict, basestring, list)

def to_dict(model):
    output = {}

    for key, prop in model.properties().iteritems():
        value = getattr(model, key)

        if value is None or isinstance(value, SIMPLE_TYPES):
            output[key] = value
        elif isinstance(value, datetime.date):
            # Convert date/datetime to ms-since-epoch ("new Date()").
            ms = time.mktime(value.utctimetuple())
            ms += getattr(value, 'microseconds', 0) / 1000
            output[key] = int(ms)
        elif isinstance(value, db.GeoPt):
            output[key] = {'lat': value.lat, 'lon': value.lon}
        elif isinstance(value, db.Model):
            output[key] = to_dict(value)
        else:
            raise ValueError('cannot encode ' + repr(prop))

    return output

class Team(db.Model):
  name = db.StringProperty()

class Match(db.Model):
  start_time = db.DateTimeProperty()
  team_one = db.ReferenceProperty(Team, collection_name="home_match_set")
  team_two = db.ReferenceProperty(Team, collection_name="away_match_set")
  
class User(db.Model):
  id = db.StringProperty(required=True)
  created = db.DateTimeProperty(auto_now_add=True)
  updated = db.DateTimeProperty(auto_now=True)
  name = db.StringProperty(required=True)
  profile_url = db.StringProperty(required=True)
  access_token = db.StringProperty(required=True)
  email = db.EmailProperty(required=True)
  
class Player(db.Model):
  name = db.StringProperty()
  role = db.StringProperty()
  team = db.ReferenceProperty(Team, collection_name="player_set")

class Prediction(db.Model):
  user = db.ReferenceProperty(User, collection_name="user_pred_set")
  match = db.ReferenceProperty(Match, collection_name="match_pred_set")
  pred_six_player = db.ReferenceProperty(Player, collection_name="player_pred_six_set")
  pred_run_player = db.ReferenceProperty(Player, collection_name="player_pred_run_set")
  pred_wicket_player = db.ReferenceProperty(Player, collection_name="player_pred_wicket_set")
  pred_six_team = db.ReferenceProperty(Team, collection_name="team_pred_six_set")
  pred_run_team = db.ReferenceProperty(Team, collection_name="team_pred_run_set")
  pred_six_player_val = db.IntegerProperty()
  pred_run_player_val = db.IntegerProperty()
  pred_wicket_player_val = db.IntegerProperty()
  pred_six_team_val = db.IntegerProperty()
  pred_run_team_val = db.IntegerProperty()
  
  @staticmethod
  def get_user_predictions(user):
    if not user: return None
    predictions = Prediction.all().filter("user =", user).fetch(100)
    user_predictions = {}
    for prediction in predictions:
      user_predictions.update({str(Prediction.match.get_value_for_datastore(prediction)): 
                                {
                                  'pred_key': str(prediction.key()),
                                  'six_player_key': str(Prediction.pred_six_player.get_value_for_datastore(prediction)),
                                  'six_player_val': prediction.pred_six_player_val,
                                  'wicket_player_key': str(Prediction.pred_wicket_player.get_value_for_datastore(prediction)),
                                  'wicket_player_val': prediction.pred_wicket_player_val,
                                  'run_player_key': str(Prediction.pred_run_player.get_value_for_datastore(prediction)),
                                  'run_player_val': prediction.pred_run_player_val,
                                  'run_team_key': str(Prediction.pred_run_team.get_value_for_datastore(prediction)),
                                  'run_team_val': prediction.pred_run_team_val,
                                  'six_team_key': str(Prediction.pred_six_team.get_value_for_datastore(prediction)),
                                  'six_team_val': prediction.pred_six_team_val,
                                  'pred_match_key': str(Prediction.match.get_value_for_datastore(prediction)),
                                }
                              })
    return user_predictions

class PlayerMatchStats(db.Model):
  player = db.ReferenceProperty(Player, collection_name="player_stats_in_matches")
  match = db.ReferenceProperty(Match, collection_name="players_stats_in_match")
  runs = db.IntegerProperty()
  sixes = db.IntegerProperty()
  wickets = db.IntegerProperty()
  team_one_or_two = db.StringProperty()
  
  @staticmethod
  def get_matches_player_stats():
    matches_player_stats = PlayerMatchStats.all().fetch(1000) #TODO this number needs to be more when more matches have been played
    matches_player_stats_dict = {}
    for stat in matches_player_stats:
      try:
        matches_player_stats_dict[str(PlayerMatchStats.match.get_value_for_datastore(stat))]
      except KeyError, e:
        matches_player_stats_dict[str(PlayerMatchStats.match.get_value_for_datastore(stat))] = {}
      
      try:
        matches_player_stats_dict[str(PlayerMatchStats.match.get_value_for_datastore(stat))][str(PlayerMatchStats.player.get_value_for_datastore(stat))]
      except KeyError, e:
        matches_player_stats_dict[str(PlayerMatchStats.match.get_value_for_datastore(stat))][str(PlayerMatchStats.player.get_value_for_datastore(stat))] = {
            'stat_key': str(stat.key()),
            'runs': stat.runs,
            'sixes': stat.sixes,
            'wickets': stat.wickets,
            'team_one_or_two': stat.team_one_or_two, 
          }
    return matches_player_stats_dict


class TeamMatchStats(db.Model):
  team = db.ReferenceProperty(Team, collection_name="team_stats_in_matches")
  match = db.ReferenceProperty(Match, collection_name="teams_stats_in_match")
  runs = db.IntegerProperty()
  sixes = db.IntegerProperty()
  
  @staticmethod
  def get_matches_team_stats():
    matches_team_stats = TeamMatchStats.all().fetch(1000) #TODO this number needs to be more when more matches have been played
    matches_team_stats_dict = {}
    for stat in matches_team_stats:
      try:
        matches_team_stats_dict[str(TeamMatchStats.match.get_value_for_datastore(stat))]
      except KeyError, e:
        matches_team_stats_dict[str(TeamMatchStats.match.get_value_for_datastore(stat))] = {}
      
      try:
        matches_team_stats_dict[str(TeamMatchStats.match.get_value_for_datastore(stat))][str(TeamMatchStats.team.get_value_for_datastore(stat))]
      except KeyError, e:
        matches_team_stats_dict[str(TeamMatchStats.match.get_value_for_datastore(stat))][str(TeamMatchStats.team.get_value_for_datastore(stat))] = {
            'stat_key': str(stat.key()),
            'runs': stat.runs,
            'sixes': stat.sixes,
          }
    return matches_team_stats_dict