import services.db_actions as svc
import random

questions = ['Jak się czujesz?', 'Gdzie jesteś?','Ile masz czasu?']
av_answers = [['Dobrze', 'Średnio', 'Źle'],
              ['W domu', 'Na świeżym powietrzu', 'W drodze', 'W miejscu publicznym'],
              ['Dużo', 'Mało']]

ans = {
    'Dobrze': 1,
    'W domu': 1,
    'Dużo': 1,
    'Średnio': 2,
    'Na świeżym powietrzu': 2,
    'Mało': 2,
    'Źle': 3,
    'W drodze': 3,
    'W miejscu publicznym': 4
}

results = {
    (1, 1, 1): ["Świadomy prysznic", "Przygotuj coś pysznego", "Spacer", "Jazda na rowerze",
                "Oddychanie", "TedX", "Piosenka", "Muzyka klasyczna", "Medytacja", "Podcast", "Dźwięki ambientowe",
                "Mięśień kreatywności",
                "Wdzięczność", "Wizualizacja swojego procesu zmiany", "Wystarczający", "Poprzedni dzień", "Dobre słowo"],
    (1, 1, 2): ["Oddychanie", "Piosenka", "Muzyka klasyczna",
                "Mięśień kreatywności",
                "Wdzięczność", "Wystarczający", "Poprzedni dzień", "Dobre słowo"],
    (1, 2, 1): ["Spacer", "Jazda na rowerze",
                "Oddychanie", "TedX", "Piosenka", "Muzyka klasyczna", "Medytacja", "Podcast", "Dźwięki ambientowe",
                "Mięśień kreatywności",
                "Wdzięczność", "Wizualizacja swojego procesu zmiany", "Wystarczający", "Poprzedni dzień", "Dobre słowo"],
    (1, 2, 2): ["Oddychanie", "Piosenka", "Muzyka klasyczna",
                "Mięśień kreatywności",
                "Wdzięczność", "Wizualizacja swojego procesu zmiany", "Wystarczający", "Poprzedni dzień", "Dobre słowo"],
    (1, 3, 1): ["Oddychanie", "TedX", "Piosenka", "Muzyka klasyczna", "Podcast", "Dźwięki ambientowe",
                "Mięsień kreatywności",
                "Wdzięczność", "Wizualizacja swojego procesu zmiany", "Wystarczający", "Poprzedni dzień", "Dobre słowo"],
    (1, 3, 2): ["Oddychanie", "Piosenka", "Muzyka klasyczna",
                "Mięśień kreatywności",
                "Wdzięczność", "Wizualizacja swojego procesu zmiany", "Wystarczający", "Poprzedni dzień", "Dobre słowo"],
    (1, 4, 1): ["Spacer",
                "Oddychanie", "TedX", "Piosenka", "Muzyka klasyczna", "Medytacja", "Podcast", "Dźwięki ambientowe",
                "Mięśień kreatywności",
                "Wdzięczność", "Wizualizacja swojego procesu zmiany", "Wystarczający", "Poprzedni dzień",
                "Dobre słowo"],
    (1, 4, 2): ["Oddychanie", "Piosenka", "Muzyka klasyczna",
                "Mięśień kreatywności",
                "Wdzięczność", "Wizualizacja swojego procesu zmiany", "Wystarczający", "Poprzedni dzień", "Dobre słowo"]
}


def opener():
    return questions[0], av_answers[0]


def chat(user_id, msg):
    if msg != 'Tak' and msg != 'Nie':
        svc.user_update_answers(user_id, ans.get(msg))
        if len(svc.user_check_answers(user_id)) < 3:
            return questions[len(svc.user_check_answers(user_id))], av_answers[len(svc.user_check_answers(user_id))]
        else:
            return get_results(user_id)
    else:
        if msg == 'Tak':
            svc.user_clear_chat_answers(user_id)
            return 'Good shit', 'Nice'
        else:
            return get_results(user_id)


def get_results(user_id):
    res = svc.user_check_answers(user_id)
    activities = results.get(tuple(res))
    return random.sample(activities, 1), "Czy pomogło? Tak, Nie"
