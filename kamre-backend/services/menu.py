import services.db_actions as svc
import random


def get_results(user_id):
    return svc.user_check_answers(user_id), True


def confirmation_opener():
    return ['Czy pomogło?'], [['Tak', 'Nie']], False


def get_all_questions_answers():
    questions = svc.get_all_questions()
    answers = svc.get_all_answers()
    return questions, answers, False
