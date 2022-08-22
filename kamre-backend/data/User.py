from data.db_connection import db_connection
from data.Activity_year import Activity_year
from data.Favorites import Favorites
from data.Emergency_seen import Emergency_seen
from data.Recent import Recent

db = db_connection()


class User(db.Document):
    user_id = db.StringField(required=True, unique=True)

    activities_years = db.SortedListField(db.EmbeddedDocumentField(Activity_year), ordering="year")
    favorites = db.EmbeddedDocumentListField(Favorites)
    emergency_seen = db.EmbeddedDocumentListField(Emergency_seen)
    recent = db.ListField(db.EmbeddedDocumentField(Recent))

    meta = {
        'collection': 'users'
    }