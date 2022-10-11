from data.db_connection import db_connection


db = db_connection()


class Emergency(db.Document):
    tip_id = db.SequenceField(value_decorator=1)
    tip = db.StringField(require=True)

    meta = {
        'colleciton': 'emergency'
    }