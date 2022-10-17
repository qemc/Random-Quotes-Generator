from server import app, bcrypt, db
from flask import jsonify, request, session
from server.models import Quote, User, Liked
import random



@app.route("/@me")
def get_current_user():
    user_id = session.get('user_id')
    
    if not user_id:
        return jsonify({"error": "Unauthorized me"}), 401
    
    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        'username': user.username,
        'email': user.email,
        'id': user.id
    })


@app.route("/", methods=['GET'])
def home():
    
    user_id = session.get('user_id')
    is_liked = False
    
    if not user_id:
        return jsonify({"error": "Unauthorized me"}), 401
    
    
    id_to_display = random.randint(1, 96124)
    
    
    
    display = Quote.query.filter_by(id=id_to_display).first()
    
    chk_relation = Liked.query.filter_by(user_id = user_id, quote_id = id_to_display).first() is not None
        
    if chk_relation:
        is_liked = True
    else:
        is_liked = False 

    session["quote_id"] = id_to_display


    return jsonify({
        'quote': display.quote,
        'author': display.author,
        'category': display.category,
        'is_likied': is_liked
    })


@app.route("/register", methods = ['POST'])
def register():
    
    new_email = request.json["email"]
    new_username = request.json["username"]
    new_password = request.json["password"]
    
    email_exists = User.query.filter_by(email=new_email).first() is not None
    username_exists = User.query.filter_by(username=new_username).first() is not None

    if username_exists:
        return jsonify({
            'error': "username exists"
        }), 401
    
    if email_exists:
        return jsonify({
            'error': "email exists"
        }), 401
    
    password_hash = bcrypt.generate_password_hash(new_password)

    new_user = User(username=new_username, email=new_email, password=password_hash)
    
    db.session.add(new_user)
    db.session.commit()
    
    session['user_id'] = new_user.id
    
    return jsonify({
        'username': new_user.username,
        'email': new_user.email,
        'id': new_user.id
    })



@app.route('/login', methods=['POST'])
def login():
    login = request.json["login"]
    password = request.json["password"]

    exists_mail = False
    exists_username = False

    if login.find('@') > 0:
        if User.query.filter_by(email=login).first() is not None:
            exists_mail = True
    else:
        if User.query.filter_by(username=login).first() is not None:
            exists_username = True

    if exists_mail == True:
        user = User.query.filter_by(email=login).first()
    elif exists_username == True:
        user = User.query.filter_by(username=login).first()
    else:
        return jsonify({
            "error": "unauthorized"
        }), 401



    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({
            "error": "unauthorized"
            "u"
        }), 401

    session["user_id"] = user.id
    

    return jsonify({
        'username': user.username,
        'email': user.email,
        'id': user.id
    })


@app.route('/logout', methods=['POST'])
def logout():
    
    session.pop('user_id', None)
    
    return jsonify({
        "user_status": "Logged out"
    })
    
    
@app.route('/like', methods=['POST'])
def like():
    
    
    user_id = session.get('user_id')
    quote_id = session.get('quote_id')
    
    if not user_id:
        return jsonify({"error": "Unauthorized me"}), 401
    
    if not quote_id:
        return jsonify({"error": "Unauthorized me"}), 401

    chk_relation = Liked.query.filter_by(user_id = user_id, quote_id = quote_id).first() is not None
        
    if chk_relation:
        return jsonify({
            "error" : "already liked",
        }),401
    
    new_liked = Liked(user_id = user_id, quote_id = quote_id)
    db.session.add(new_liked)
    db.session.commit()
    
    return jsonify({
        "quote_id": str(quote_id),
        "user_id": str(user_id)
    })
    
    

@app.route('/get_liked', methods=['GET', 'POST'])
def get_liked():
    
    current_user = session.get('user_id')   
    
    if not current_user:
        return jsonify({"error": "Unauthorized me"}), 401

    liked_quotes = Liked.query.filter_by(user_id = current_user).all()
    quotes = []
    for item in liked_quotes:
        quotee = Quote.query.filter_by(id = int(item.quote_id)).first()
        quote = {
            "id":quotee.id,
            "quote": quotee.quote,
            "author": quotee.author,
            "category": quotee.category 
        }
        quotes.append(quote)
        


    
    
    return jsonify(quotes)
    
    
@app.route('/delete_like', methods=['POST'])
def dislike():
    
    current_user = session.get('user_id')     
    id_to_delete = request.json['id']

    if not current_user:
        return jsonify({"error": "Unauthorized me"}), 401

    Liked.query.filter_by(quote_id = id_to_delete, user_id = current_user).delete()
    db.session.commit()
    
    return jsonify ({
        "deleted_id": id_to_delete,
    })
