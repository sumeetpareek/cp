import webapp2

import jinja2
import os
from google.appengine.api import users

from schema import *

# We initialize the templating engine with the current files path
jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class MainPage(webapp2.RequestHandler):
  def get(self):
    matches = Match.all()
    user = users.get_current_user()
    
    template_values = {
      'matches': matches,
      'user': user,
      'login_url': users.create_login_url(self.request.uri)
                       }
    template = jinja_environment.get_template('templates/homepage.html')
    self.response.out.write(template.render(template_values))

# Once app.yaml sends us here we call use appropriate clases to show functionality for appropriate paths
app = webapp2.WSGIApplication([
  ('/', MainPage),
], debug = True)
  
