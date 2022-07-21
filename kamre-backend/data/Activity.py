from data.db_connection import db_connection


db = db_connection()


class Activity(db.Document):
    registered_date = db.DateTimeField(required=True)
    activity_name = db.StringField(required=True)

    meta = {
        'collection': 'activities'
    }