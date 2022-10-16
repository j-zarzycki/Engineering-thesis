from data.db_connection import db_connection
from data.Activity import Activity

db = db_connection()


class Archive(db.Document):
    user_id = db.StringField(required=True)
    year = db.IntField(required=True)

    activities = db.ListField(db.EmbeddedDocumentField(Activity))

    meta = {
        'collection': 'archive'
    }