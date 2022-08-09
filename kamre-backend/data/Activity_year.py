from data.db_connection import db_connection
from data.Activity import Activity

db = db_connection()


class Activity_year(db.EmbeddedDocument):
    year = db.IntField()
    activities = db.SortedListField(db.EmbeddedDocumentField(Activity), ordering="registered_date")
