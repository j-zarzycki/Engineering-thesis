questions = {
    1: "Question 1",
    2: "Question 2",
    3: "Question 3",
    4: "Question 4",
    5: "Question 5",
    6: "Question 6"
}


def chat(question_id, answer):
    switch = {
        1: question_1(answer),
        2: question_2(answer),
        3: question_3(answer),
        4: question_4(answer),
        5: question_5(answer),
        6: question_6(answer)
    }
    res = switch.get(question_id)
    print(res)
    return res


def opener():
    question = questions[1]
    question_id = 1
    answers = {
        1: "Answer 1 leading to q 2",
        2: "Answer 2 leading to q 3",
        3: "Answer 3 leading to q 4"
    }

    return question, question_id, answers


def question_1(answer):
    switch = {
        1: {
            "question": questions[2],
            "question_id": 2,
            "answers": {
                1: "Answer 1 ending q 2",
                2: "Answer 2 leading to q 5"
            }
        },
        2: {
            "question": questions[3],
            "question_id": 3,
            "answers": {
                1: "Answer 1 ending q 3",
                2: "Answer 2 ending q 3",
                3: "Answer 3 leading to q 6"
            }
        },
        3: {
            "question": questions[4],
            "question_id": 4,
            "answers": {
                1: "Answer 1 ending q4",
                2: "Answer 2 ending q4"
            }
        }
    }
    return switch.get(answer, "Invalid input")


def question_2(answer):
    switch = {
        1: {
            "question": None,
            "question_id": None,
            "answers": {1: "Thank you for ending q 2"}
        },
        2: {
            "question": questions[5],
            "question_id": 5,
            "answers":{
                1: "Answer 1 to q 5 ends",
                2: "Answer 2 to q 5 ends"
            }
        }
    }
    return switch.get(answer, "Invalid input")


def question_3(answer):
    switch = {
        1: {
            "question": None,
            "question_id": None,
            "answers": {1: "Thank you for ending q 3 ending 1"}
        },
        2: {
            "question": None,
            "question_id": None,
            "answers": {1: "Thank you for ending q 3 ending 2"}
        },
        3: {
            "question": questions[6],
            "question_id": 6,
            "answers": {
                1: "Answer 1 to q 6 ends",
                2: "Answer 2 to q 6 ends"
            }
        },
    }
    return switch.get(answer, "Invalid input")


def question_4(answer):
    switch = {
        1: {
            "question": None,
            "question_id": None,
            "answers": {1: "Thank you for ending q 4 ending 1"}
        },
        2: {
            "question": None,
            "question_id": None,
            "answers": {1: "Thank you for ending q 4 ending 2"}
        }
    }
    return switch.get(answer, "Invalid input")


def question_5(answer):
    switch = {
        1: {
            "question": None,
            "question_id": None,
            "answers": {1: "Thank you for ending q 5 ending 1"}
        },
        2: {
            "question": None,
            "question_id": None,
            "answers": {1: "Thank you for ending q 5 ending 2"}
        }
    }
    return switch.get(answer, "Invalid input")


def question_6(answer):
    switch = {
        1: {
            "question": None,
            "question_id": None,
            "answers": {1: "Thank you for ending q 6 ending 1"}
        },
        2: {
            "question": None,
            "question_id": None,
            "answers": {1: "Thank you for ending q 6 ending 2"}
        }
    }
    return switch.get(answer, "Invalid input")

