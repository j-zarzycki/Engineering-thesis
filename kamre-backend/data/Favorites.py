from data.db_connection import db_connection


db = db_connection()

class Favorites(db.Document):
    activity_name = db.StringField(required=True)

    meta = {
        'collection': 'favorites'
    }