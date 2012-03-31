from google.appengine.ext import db

class Team(db.Model):
  name = db.StringProperty()

class Match(db.Model):
  start_time = db.DateTimeProperty()
  team_one = db.ReferenceProperty(Team, collection_name="team_one_set")
  team_two = db.ReferenceProperty(Team, collection_name="team_two_set")
  
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
  team = db.ReferenceProperty(Team, collection_name="player_team_set")
