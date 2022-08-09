from data.db_connection import db_connection


db = db_connection()


class Emergency(db.Document):
    tip_id = db.IntField(required=True, unique=True)
    tip = db.StringField(require=True)

    meta = {
        'colleciton': 'emergency'
    }