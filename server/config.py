import redis

class ApplicationConfig():

    SECRET_KEY = '6be575743c714c0250e548de'
    #laptop
   # SQLALCHEMY_DATABASE_URI =  'sqlite:///C:/Users/Grzegorz/Documents/Porg/quotesv2/server/db.db'  
    #PC  
    SQLALCHEMY_DATABASE_URI =  'sqlite:///db.db' 
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")