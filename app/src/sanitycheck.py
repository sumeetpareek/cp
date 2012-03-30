import webapp2

class SanityCheck(webapp2.RequestHandler):
    def get(self):
      self.response.headers['Content-Type'] = 'text/plain'
      self.response.out.write('If you see this then things are Sane!')

app = webapp2.WSGIApplication([('/sanitycheck', SanityCheck)],
                              debug=True)