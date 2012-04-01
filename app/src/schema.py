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
