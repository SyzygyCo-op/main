import re
import urllib
import logging

from flask import render_template, request, jsonify, session, redirect, url_for

from main import app, socketio, csrf, settings

logger = logging.getLogger(__name__)

@app.route('/', methods=['GET'])
def index_view():
    return render_template('index.html')

@app.route('/invite', methods=['GET'])
def invite_view():
    return render_template('invite.html')

@app.route('/email', methods=['GET'])
def email_view():
    return render_template('email.html')
