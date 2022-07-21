from flask import request, jsonify
from services.flask_connection import flask_connection
from flask_cors import CORS
from dateutil import parser
import services.db_actions as svc


app = flask_connection()
CORS(app)


@app.route("/noContent", methods=['POST'])
def no_content():
    res = request.get_json()
    registered_date = parser.parse(res['registered_date'])
    activity_name = res['activity_name']

    svc.create_activity(registered_date, activity_name)
    return jsonify({'res': 'created entry'})


app.run(port=5000)

