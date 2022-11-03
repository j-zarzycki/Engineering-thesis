from data.db_connection import db_connection


db = db_connection()

class EmergencyPersonalTip(db.EmbeddedDocument):

    created = db.DateTimeField()
    tip_id = db.SequenceField(value_decorator=1)
    tip = db.StringField()

    meta = {
        'indexes': [
            {'fields': ['created'], 'expireAfterSeconds': 3600}
        ]
    }