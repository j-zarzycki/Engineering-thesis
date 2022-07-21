from flask import request, jsonify
from services.flask_connection import flask_connection
from flask_cors import CORS
from dateutil import parser
import services.db_actions as svc


app = flask_connection()
CORS(app)


@app.route("/noContent", methods=['POST'])
def noContent():
    res = request.get_json()
    registered_date = parser.parse(res['registered_date'])
    activity_name = res['activity_name']

    svc.create_activity(registered_date, activity_name)
    return jsonify({'res': 'created entry'})


@app.route("/getAll", methods=['GET'])
def get_all():
    names, dates = svc.get_all()

    return jsonify({'names': names, 'dates': dates})


@app.route("/getMonth", methods=['GET'])
def get_month():
    month = request.args.get('month')
    year = request.args.get('year')
    names, dates = svc.get_month(month, year)

    return jsonify({'names': names, 'dates': dates})


app.run(port=5000)

