from data.db_connection import db_connection
from data.Emergency_personal_tip import EmergencyPersonalTip


db = db_connection()

class EmergencyPersonal(db.Document):
    user_id = db.ObjectIdField()
    tips = db.ListField(db.EmbeddedDocumentField(EmergencyPersonalTip))

    meta = {
        'collection': 'emergency_personal'
    }

