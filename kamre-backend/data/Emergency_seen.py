from data.db_connection import db_connection


db = db_connection()


class Emergency_seen(db.EmbeddedDocument):
    seen = db.IntField()