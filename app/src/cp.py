import webapp2

import jinja2
import os

from schema import *

# We initialize the templating engine with the current files path
jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class MainPage(webapp2.RequestHandler):
  def get(self):
    # Fetch the index.html template and render it
    template = jinja_environment.get_template('templates/index.html')
    self.response.out.write(template.render())
#    team = Team()
#    team.put()
#    match = Match()
#    match.put()
    

# Once app.yaml sends us here we call use appropriate clases to show functionality for appropriate paths
app = webapp2.WSGIApplication([
  ('/', MainPage),
], debug = True)
  
