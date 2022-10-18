from data.db_connection import db_connection

db = db_connection()


class ChatResult(db.Document):
    result_code = db.StringField(required=True, unique=True)
    activity_list = db.ListField(db.StringField())

    meta = {
        'collection': 'chat_results'
    }