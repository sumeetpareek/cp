import webapp2

class SanityCheck(webapp2.RequestHandler):
  def get(self):
    self.response.headers['Content-Type'] = 'text/plain'
    self.response.out.write('If this messages shows then everything is sane!!!')

app = webapp2.WSGIApplication([('/', SanityCheck)],
                              debug=True)