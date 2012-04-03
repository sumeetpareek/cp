FACEBOOK_APP_ID = "185318768251247"
FACEBOOK_APP_SECRET = "f9cb1482d17dd99f33f0a76a427b54e0"

import facebook
import os.path
import wsgiref.handlers
import logging
import urllib2
import webapp2
import pprint

import jinja2
import os

from google.appengine.ext import db
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.api.urlfetch import fetch

from schema import *

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class User(db.Model):
    id = db.StringProperty(required=True)
    created = db.DateTimeProperty(auto_now_add=True)
    updated = db.DateTimeProperty(auto_now=True)
    name = db.StringProperty(required=True)
    profile_url = db.StringProperty(required=True)
    access_token = db.StringProperty(required=True)
    email = db.EmailProperty(required=True)


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
        
        
#        graph = facebook.GraphAPI(cookie["access_token"])
#        profile = graph.get_object("me")  
#        self.response.out.write(profile)
        
        return self._current_user


class FBLogin(BaseHandler):
    def get(self):
      self.response.out.write("sanity check")
#        path = os.path.join(os.path.dirname(__file__), "example.html")
#        args = dict(current_user=self.current_user,
#                    facebook_app_id=FACEBOOK_APP_ID)
#        template = jinja_environment.get_template('templates/fblogin.html')
#        self.response.out.write(template.render(args))
#
#    def post(self):
#        url = self.request.get('url')
#        file = urllib2.urlopen(url)
#        graph = facebook.GraphAPI(self.current_user.access_token)
#        graph.put_photo(file, "Test Image")




#class FBLogin(webapp2.RequestHandler):
#    def get(self):
#      self.response.headers['Content-Type'] = 'text/plain'
#      self.response.out.write('Facebook login test')

app = webapp2.WSGIApplication([('/fblogin', FBLogin)],
                              debug=True)