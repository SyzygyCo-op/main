from flask import Flask
from flask_wtf.csrf import CSRFProtect
from flask_socketio import SocketIO

from . import settings

app = Flask(__name__)
app.config.from_object(settings)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
if settings.DEBUG:
    app.debug = True
socketio = SocketIO(app)
csrf = CSRFProtect(app)

#pylint: disable=wrong-import-position
from . import views
