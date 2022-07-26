from flask import request, jsonify
from services.flask_connection import flask_connection
from flask_cors import CORS
from dateutil import parser
import services.db_actions as svc


app = flask_connection()
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/noContent", methods=['POST'])
def noContent():
    res = request.get_json()
    registered_date = parser.parse(res['registered_date'])
    activity_name = res['activity_name']

    svc.create_activity(registered_date, activity_name)
    return jsonify({'res': 'created entry'})


@app.route("/hasContent", methods=['POST'])
def has_content():
    res = request.get_json()
    registered_date = parser.parse(res['registered_date'])
    activity_name = res['activity_name']
    has_content = True
    activity_content = res['activity_content']

    svc.create_activity_content(registered_date,activity_name,has_content,activity_content)

    return jsonify({'res': 'created entry with content'})


@app.route("/toggleFavorite", methods=['POST'])
def toggle_favorite():
    res = request.get_json()
    activity_name = res['activity_name']
    response = svc.toggle_favorite(activity_name)

    return jsonify({'res': response})


@app.route("/getAll", methods=['GET'])
def get_all():
    names, dates, check_content = svc.get_all()

    return jsonify({'names': names, 'dates': dates, 'has_content': check_content})


@app.route("/getMonth", methods=['GET'])
def get_month():
    month = request.args.get('month')
    year = request.args.get('year')
    names, dates, check_content = svc.get_month(month, year)

    return jsonify({'names': names, 'dates': dates, 'has_content': check_content})


@app.route("/getOne", methods=['GET'])
def get_one():

    month = request.args.get('month')
    year = request.args.get('year')
    day = request.args.get('day')
    hour = request.args.get('hour')
    minute = request.args.get('minute')
    second = request.args.get('second')
    name = request.args.get('name')

    check_content = svc.check_content(month,year,day,hour,minute,second,name)

    if check_content:
        name, date, content = svc.get_one(month, year, day, hour, minute, second, name, check_content)

        return jsonify({'name': name, 'date': date, 'content': content})
    else:
        name, date = svc.get_one(month, year, day, hour, minute, second, name, check_content)

        return jsonify(({'name': name, 'date': date}))


@app.route("/getFavs", methods=['GET'])
def get_favorites():
    favs = svc.get_favorites()

    return jsonify({'favorites': favs})


@app.route("/getDay", methods=['GET'])
def get_day():

    month = request.args.get('month')
    year = request.args.get('year')
    day = request.args.get('day')

    names, dates, check_content = svc.get_day(month, year, day)

    return jsonify({'names': names, 'dates': dates, 'has_content': check_content})


app.run(port=5000)

