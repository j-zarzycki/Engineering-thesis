from data.db_connection import db_connection


db = db_connection()


class Categories(db.Document):
    category = db.StringField(required=True)
    activities = db.ListField(db.StringField())

    meta = {
        'collection': 'categories'
    }