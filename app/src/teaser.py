import webapp2

import jinja2
import os


# We initialize the templating engine with the current files path
jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class TeaserPage(webapp2.RequestHandler):
  def get(self):
    template_values = {
      'site_title': "Captain Pandey - Title",
      'site_msg': "Captain Pandey - Teaser"
                       }
    # Fetch the index.html template and render it
    template = jinja_environment.get_template('templates/teaser.html')
    self.response.out.write(template.render(template_values))

# Once app.yaml sends us here we call use appropriate clases to show functionality for appropriate paths
app = webapp2.WSGIApplication([
  ('/', TeaserPage),
], debug = True)
  
