from data.db_connection import db_connection


db = db_connection()


class Answer(db.Document):
    answer_id = db.IntField(required=True, unique=True)
    answers = db.ListField(db.StringField())

    meta = {
        'collection': 'answers'
    }