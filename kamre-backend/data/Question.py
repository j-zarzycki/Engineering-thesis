from data.db_connection import db_connection


db = db_connection()


class Question(db.Document):
    question_id = db.IntField(required=True, unique=True)
    question_content = db.StringField(required=True)

    meta = {
        'collection': 'questions'
    }