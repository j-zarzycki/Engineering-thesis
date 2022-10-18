from flask import request, jsonify, json
from services.flask_connection import flask_connection
import cryptography
from dateutil import parser
import services.db_actions as svc
import services.menu as menu
import services.jwt_svc as jwt_svc
import jwt
from flask_socketio import SocketIO, send
from dotenv import load_dotenv
# import simple_websocket
load_dotenv()
import os


app = flask_connection()
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET')
socketio = SocketIO(app, cors_allowed_origins='*')


@app.route("/newUser", methods=['POST'])
def new_user():
    res = request.get_json()
    user_id = res['user_id']
    svc.create_user(user_id)
    return jsonify({'res': 'created new user'})


@app.route("/login", methods=['POST'])
def login():
    res = request.get_json()
    device_id = str(res['device_id'])
    svc.user_check(device_id)
    token = jwt_svc.create_token(device_id)
    return jsonify({"auth_token": token})


def check():
    token = request.headers.get('token')
    status, token = jwt_svc.check_token(token)
    if status:
        return status, token['device_id']
    else:
        return status, (jsonify({'res': 'Token invalid'}), 401)


@app.route("/noContent", methods=['POST'])
def no_content():
    status, user_id = check()
    if status:
        res = request.get_json()
        registered_date = parser.parse(res['registered_date'].replace(':', 'T', 1))
        activity_name = res['activity_name']

        svc.create_activity(user_id, registered_date, activity_name)
        return jsonify({'res': 'created entry'})
    else:
        return user_id


@app.route("/hasContent", methods=['POST'])
def has_content():
    status, user_id = check()
    if status:
        res = request.get_json()
        registered_date = parser.parse(res['registered_date'].replace(':', 'T', 1))
        activity_name = res['activity_name']
        has_content = True
        activity_content = res['activity_content']

        if type(activity_content) is str:
            activity_content = [activity_content]

        svc.create_activity_content(user_id, registered_date,activity_name,has_content,activity_content)

        return jsonify({'res': 'created entry with content'})
    else:
        return user_id


@app.route("/toggleFavorite", methods=['POST'])
def toggle_favorite():
    status, user_id = check()
    if status:
        res = request.get_json()
        activity_name = res['activity_name']
        response = svc.toggle_favorite(user_id, activity_name)

        return jsonify({'res': response})
    else:
        return user_id


@app.route("/getAll", methods=['GET'])
def get_all():
    status, user_id = check()
    if status:
        res = svc.get_all(user_id)
        res = json.loads(json.dumps(res, default=lambda x : x.__dict__))
        return jsonify({'res': res})
    else:
        return user_id


@app.route("/getMonth", methods=['GET'])
def get_month():
    status, user_id = check()
    if status:
        month = request.args.get('month')
        year = request.args.get('year')
        res = svc.get_month(user_id, month, year)
        res = json.loads(json.dumps(res, default=lambda x : x.__dict__))

        return jsonify({'res': res})
    else:
        return user_id


@app.route("/getOne", methods=['GET'])
def get_one():
    status, user_id = check()
    if status:
        month = request.args.get('month')
        year = request.args.get('year')
        day = request.args.get('day')
        hour = request.args.get('hour')
        minute = request.args.get('minute')
        second = request.args.get('second')
        name = request.args.get('name')

        res = svc.get_one(user_id, month, year, day, hour, minute, second, name)
        res = json.loads(json.dumps(res, default=lambda x: x.__dict__))

        return jsonify({'res': res})
    else:
        return user_id


@app.route("/getFavs", methods=['GET'])
def get_favorites():
    status, user_id = check()
    if status:
        favs = svc.get_favorites(user_id)

        return jsonify({'favorites': favs})
    else:
        return user_id


@app.route("/getDay", methods=['GET'])
def get_day():
    status, user_id = check()
    if status:
        month = request.args.get('month')
        year = request.args.get('year')
        day = request.args.get('day')

        res = svc.get_day(user_id, month, year, day)
        res = json.loads(json.dumps(res, default=lambda x: x.__dict__))

        return jsonify(({'res': res}))
    else:
        return user_id


@app.route("/setCategory", methods=['POST'])
def set_category():
    res = request.get_json()
    category_name = res['category_name']
    activities = res['activities']

    svc.set_categories(category_name, activities)

    return jsonify({'res': f'created category:{category_name}, with activities: {activities}'})


@app.route("/getRecommended", methods=['GET'])
def get_recommended():
    status, user_id = check()
    if status:
        res = svc.get_reccomended(user_id)

        return jsonify({'res': res})
    else:
        return user_id


@app.route("/setEmergency", methods=['POST'])
def set_emergency():
    res = request.get_json()
    # tip_id = res['tip_id']
    tip = res['tip']
    for el in tip:
        svc.set_emergency(el)

    return jsonify({'res': f'Created tip {tip}'})


@app.route("/getEmergency", methods=['GET'])
def get_emergency():
    status, user_id = check()
    if status:
        emergency = svc.get_emergency(user_id)

        return jsonify({'res': emergency})
    else:
        return user_id


@app.route("/getAllActivities", methods=['GET'])
def get_all_activities():
    res = svc.get_all_activities()

    return jsonify({'res': res})


@app.route("/setRecent", methods=['POST'])
def set_recent():
    status, user_id = check()
    if status:
        res = request.get_json()

        z_count = res['z_count']
        p_count = res['p_count']
        a_count = res['a_count']
        b_count = res['b_count']

        svc.set_recent(user_id, b_count, a_count, z_count, p_count)

        return jsonify({'res':'Set recent'})
    else:
        return user_id


@app.route("/account", methods=['DELETE'])
def delete_account():
    status, user_id = check()
    if status:
        svc.delete_account(user_id)

        return jsonify({'res': 'Account and all archived activities deleted'})

    else:
        return user_id


@app.route("/recovery", methods=['GET'])
def generate_code():
    status, user_id = check()
    if status:
        while True:
            recovery_code = svc.generate_recovery(user_id)
            if recovery_code is not None:
                break
        return jsonify({'recovery_code': recovery_code})
    else:
        return user_id


@app.route("/recovery", methods=['POST'])
def migrate_account():
    res = request.get_json()
    recovery_code = res['recovery_code']
    user_id = res['device_id']

    if svc.migrate_account(recovery_code, user_id):
        return jsonify({'res': 'Account updated'})
    else:
        return jsonify({'res': 'Invalid code'}), 400

@app.route("/getBlurb", methods=['GET'])
def get_blurb():
    status, user_id = check()
    if status:
        return jsonify({'res': svc.get_blurb(user_id)})
    else:
        return user_id

# app.run(port=5000, ssl_context="adhoc")
# socketio.run(app, allow_unsafe_werkzeug=True)



