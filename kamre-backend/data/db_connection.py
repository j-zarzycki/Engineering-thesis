from services.flask_connection import flask_connection
from flask_mongoengine import MongoEngine


def db_connection():
    DB_URI = "mongodb+srv://kamreadmin:QtO7uf3gf2iRreCe@kmaremongodbcluster.tdwnckn.mongodb.net/?retryWrites=true&w=majority"
    app = flask_connection()
    app.config["MONGODB_HOST"] = DB_URI

    db = MongoEngine(app)
    return db
