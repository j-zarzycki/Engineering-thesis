from flask import Flask


def flask_connection():
    app = Flask(__name__)
    return app