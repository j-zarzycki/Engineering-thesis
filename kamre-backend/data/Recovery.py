from data.db_connection import db_connection
from datetime import datetime

db = db_connection()


class Recovery(db.Document):

    created = db.DateTimeField()
    recovery_code = db.StringField(unique=True)
    user_id = db.ObjectIdField()

    meta = {
        'collection': 'recovery',
        'indexes': [
            {'fields': ['created'], 'expireAfterSeconds': 3600}
        ]
    }