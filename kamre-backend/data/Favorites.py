from data.db_connection import db_connection


db = db_connection()


class Favorites(db.EmbeddedDocument):
    activity_name = db.StringField()

