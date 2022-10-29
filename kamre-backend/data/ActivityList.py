from data.db_connection import db_connection


db = db_connection()


class ActivityList(db.Document):
    category = db.StringField(required=True)
    activity_name = db.StringField(required=True)
    url = db.StringField(required=True)

    meta = {
        'collections': 'activity_list'
    }
