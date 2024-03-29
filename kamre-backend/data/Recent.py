from data.db_connection import db_connection


db = db_connection()


class Recent(db.EmbeddedDocument):
    quiz_valid = db.BooleanField(default=False)
    Aktywne_count = db.IntField(default=0)
    Bierne_count = db.IntField(default=0)
    ZmianaMyslenia_count = db.IntField(default=0)
    PozytywneEmocje_count = db.IntField(default=0)
    total = db.IntField(default=0)
