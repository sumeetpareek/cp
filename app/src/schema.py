from google.appengine.ext import db

class Team(db.Model):
  name = db.StringProperty()

class Match(db.Model):
  start_time = db.DateTimeProperty()
  team_one = db.ReferenceProperty(Team, collection_name="team_one_set")
  team_two = db.ReferenceProperty(Team, collection_name="team_two_set")