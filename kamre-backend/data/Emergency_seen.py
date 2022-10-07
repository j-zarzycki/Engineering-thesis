from data.db_connection import db_connection


db = db_connection()


class Emergency_seen(db.EmbeddedDocument):
    seen = db.ListField(db.IntField())
    seen_personal = db.ListField(db.IntField())

    last_seen_personal = db.BooleanField(default=False)