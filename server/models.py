from server import db
from uuid import uuid4



class Quote(db.Model):

    id = db.Column(db.Integer(), primary_key=True, unique=True)
    quote = db.Column(db.Text(), nullable=False)
    author = db.Column(db.Text(), nullable=False)
    category = db.Column(db.Text())


def get_uuid():
    return uuid4().hex


class User(db.Model):

    id = db.Column(db.Text(), primary_key=True, unique=True,default=get_uuid)
    username = db.Column(db.Text(), nullable=False, unique=True)
    email = db.Column(db.Text(), nullable=False, unique=True)
    password = db.Column(db.Text(), nullable=False)

class Liked(db.Model):

    id = db.Column(db.Integer(), primary_key=True, unique=True)
    user_id = db.Column(db.Text())
    quote_id = db.Column(db.Integer())
