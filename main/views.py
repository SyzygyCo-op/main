import logging

from flask import render_template
from main import app

logger = logging.getLogger(__name__)

@app.route('/', methods=['GET'])
def index_view():
    return render_template('index.html')

@app.route('/email', methods=['GET'])
def email_view():
    return render_template('email.html')

#URL: https://api.airtable.com/v0/appLNoFDjXHyBGvB8/Member%20List \
#        HEADER: “Authorization: Bearer YOUR_API_KEY”
 #       HEADER: "Content-type: application/json"
  #      DATA:  '{
##           "fields": {
#                 "Name": "Marc Wagenseil",
 #                         "Email": "marcwagenseil@gmail.com",
  #                            "Type": [
   #                                 "recVI4TgMmmCAYZzR"
    #                                    ],
     #                                       "Card Number": "0009272927",
      #                                          "Instagram": "@marcwagenseil",
       #                                             "facebook": "Marc Wagenseil"
        #                                              }
       # }'


