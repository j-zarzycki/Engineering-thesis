from data.db_connection import db_connection


db = db_connection()


class Activity(db.EmbeddedDocument):
    registered_date = db.DateTimeField(required=True)
    activity_name = db.StringField(required=True)
    has_content = db.BooleanField(default=False)
    activity_content = db.StringField(default='null')
    activity_category = db.StringField(required=True)
