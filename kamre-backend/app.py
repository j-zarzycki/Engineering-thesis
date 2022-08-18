from flask import request, jsonify, json
from services.flask_connection import flask_connection
from flask_cors import CORS
import cryptography
from dateutil import parser
import services.db_actions as svc
import services.menu as menu

app = flask_connection()
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/newUser", methods=['POST'])
def newUser():
    res = request.get_json()
    user_id = res['user_id']
    svc.create_user(user_id)
    return jsonify({'res': 'created new user'})


@app.route("/noContent", methods=['POST'])
def noContent():
    res = request.get_json()
    user_id = res['user_id']
    registered_date = parser.parse(res['registered_date'].replace(':', 'T', 1))
    activity_name = res['activity_name']

    svc.create_activity(user_id, registered_date, activity_name)
    return jsonify({'res': 'created entry'})


@app.route("/hasContent", methods=['POST'])
def has_content():
    res = request.get_json()
    registered_date = parser.parse(res['registered_date'].replace(':', 'T', 1))
    activity_name = res['activity_name']
    has_content = True
    activity_content = res['activity_content']
    user_id = res['user_id']

    svc.create_activity_content(user_id, registered_date,activity_name,has_content,activity_content)

    return jsonify({'res': 'created entry with content'})


@app.route("/toggleFavorite", methods=['POST'])
def toggle_favorite():
    res = request.get_json()
    user_id = res['user_id']
    activity_name = res['activity_name']
    response = svc.toggle_favorite(user_id, activity_name)

    return jsonify({'res': response})


@app.route("/getAll", methods=['GET'])
def get_all():
    user_id = request.args.get('user_id')
    res = svc.get_all(user_id)
    res = json.loads(json.dumps(res, default=lambda x : x.__dict__))

    return jsonify({'res': res})


@app.route("/getMonth", methods=['GET'])
def get_month():
    month = request.args.get('month')
    year = request.args.get('year')
    user_id = request.args.get('user_id')
    res = svc.get_month(user_id, month, year)
    res = json.loads(json.dumps(res, default=lambda x : x.__dict__))

    return jsonify({'res': res})


@app.route("/getOne", methods=['GET'])
def get_one():

    month = request.args.get('month')
    year = request.args.get('year')
    day = request.args.get('day')
    hour = request.args.get('hour')
    minute = request.args.get('minute')
    second = request.args.get('second')
    name = request.args.get('name')
    user_id = request.args.get('user_id')

    res = svc.get_one(user_id, month, year, day, hour, minute, second, name)
    res = json.loads(json.dumps(res, default=lambda x: x.__dict__))

    return jsonify(({'res': res}))


@app.route("/getFavs", methods=['GET'])
def get_favorites():
    user_id = request.args.get('user_id')
    favs = svc.get_favorites(user_id)

    return jsonify({'favorites': favs})


@app.route("/getDay", methods=['GET'])
def get_day():

    month = request.args.get('month')
    year = request.args.get('year')
    day = request.args.get('day')
    user_id = request.args.get('user_id')

    res = svc.get_day(user_id, month, year, day)
    res = json.loads(json.dumps(res, default=lambda x: x.__dict__))

    return jsonify(({'res': res}))


@app.route("/setCategory", methods=['POST'])
def set_category():
    res = request.get_json()
    category_name = res['category_name']
    activities = res['activities']

    svc.set_categories(category_name, activities)

    return jsonify({'res': f'created category:{category_name}, with activities: {activities}'})


@app.route("/getRecommended", methods=['GET'])
def get_recommended():
    user_id = request.args.get('user_id')
    res = svc.get_reccomended(user_id)

    return jsonify({'res': res})


@app.route("/setEmergency", methods=['POST'])
def set_emergency():
    res = request.get_json()
    tip_id = res['tip_id']
    tip = res['tip']
    svc.set_emergency(tip_id, tip)

    return jsonify({'res': f'Created tip {tip} with id {tip_id}'})


@app.route("/getEmergency", methods=['GET'])
def get_emergency():
    user_id = request.args.get('user_id')
    emergency = svc.get_emergency(user_id)

    return jsonify({'res': emergency})


@app.route("/getAllActivities", methods=['GET'])
def get_all_activities():
    res = svc.get_all_activities()

    return jsonify({'res': res})


@app.route("/setRecent", methods=['POST'])
def set_recent():
    res = request.get_json()

    user_id = res['user_id']
    z_count = res['z_count']
    p_count = res['p_count']
    a_count = res['a_count']
    b_count = res['b_count']

    svc.set_recent(user_id, b_count, a_count, z_count, p_count)

    return jsonify({'res':'Set recent'})


@app.route("/getOpener", methods=['GET'])
def get_opener():
    question, question_id, answers = menu.opener()
    return jsonify({'question': question,'question_id': question_id, 'answers': answers})


@app.route("/chat", methods=['POST'])
def chat():
    res = request.get_json()
    question_id = res['question_id']
    answer = res['answer']

    response = menu.chat(question_id, answer)

    return jsonify({'res': response})

# app.run(port=5000, ssl_context="adhoc")
if __name__ == '__main__':
       app.run()

