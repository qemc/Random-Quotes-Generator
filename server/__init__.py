from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from server.config import ApplicationConfig


app = Flask(__name__)
app.config.from_object(ApplicationConfig)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)

with app.app_context():
    db.create_all()
    
    
from server import routes

