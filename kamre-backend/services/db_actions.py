from data.Activity import Activity
from data.Favorites import Favorites
from data.Activity_year import Activity_year
from data.User import User
from dateutil import parser
from data.months_dict import months_dict
from data.Categories import Categories
from data.Recent import Recent
from data.Emergency import Emergency
from data.Emergency_seen import Emergency_seen
import random

months_dict = months_dict()


def create_user(user_id) -> User:
    user = User()
    user.user_id = user_id

    user.save()

    return user


def create_activity(user_id, registered_date, activity_name):
    user = User.objects(user_id=user_id).first()
    cat = Categories.objects()
    activity = Activity()

    activity.registered_date = registered_date
    activity.activity_name = activity_name
    for category in cat:
        if activity_name in category['activities']:
            activity.activity_category = category['category']
    yrs = []
    for el in user.activities_years:
        yrs.append(el['year'])
    if int(registered_date.year) not in yrs:
        yr = Activity_year()
        yr.year=int(registered_date.year)
        user.activities_years.append(yr)
    x = 0
    for el in user.activities_years:
        if el['year'] == int(registered_date.year):
            user.activities_years[x].activities.append(activity)
        x += 1
    user.save()
    count_activities(user_id)
    return user


def create_activity_content(user_id, registered_date, activity_name, has_content, activity_content):
    user = User.objects(user_id=user_id).first()
    activity = Activity()
    cat = Categories.objects()

    activity.registered_date = registered_date
    activity.activity_name = activity_name
    activity.has_content = has_content
    activity.activity_content = activity_content

    for category in cat:
        if activity_name in category['activities']:
            activity.activity_category = category['category']
    yrs = []
    for el in user.activities_years:
        yrs.append(el['year'])
    if int(registered_date.year) not in yrs:
        yr = Activity_year()
        yr.year=int(registered_date.year)
        user.activities_years.append(yr)
    x = 0
    for el in user.activities_years:
        if el['year'] == int(registered_date.year):
            user.activities_years[x].activities.append(activity)
        x += 1
    user.save()
    count_activities(user_id)
    return user


def get_all(user_id):
    activities = []
    user = User.objects(user_id=user_id).first()
    for yr in user.activities_years:
        for el in yr['activities']:
            ac = {
                'registered_date': str(el['registered_date']),
                'activity_name': el['activity_name'],
                'has_content': el['has_content'],
                'activity_content': el['activity_content']
            }
            activities.append(ac)
    return activities

def get_month(user_id, month,year):
    activities = []

    start = parser.parse(f'{year}-{month}-1 00:00:00')
    end_of_month = months_dict[int(month)]
    try:
        end = parser.parse(f'{year}-{month}-{end_of_month} 23:59:59')
    except:
        end = parser.parse(f'{year}-{month}-28 23:59:59')
    user = User.objects().filter(user_id=user_id).first()

    for yr in user.activities_years:
        for el in reversed(yr['activities']):
            if el['registered_date'] >= start and el['registered_date'] <= end:
                ac = {
                    'registered_date': str(el['registered_date']),
                    'activity_name': el['activity_name'],
                    'has_content': el['has_content'],
                    'activity_content': el['activity_content']
                }
                activities.append(ac)

    return activities


def get_one(user_id, month, year, day, hour, minute, second, name):
    start = parser.parse(f'{year}-{month}-{day} {hour}:{minute}:{second}')
    end = parser.parse(f'{year}-{month}-{day} {hour}:{minute}:{second}.99')

    user = User.objects().filter(user_id=user_id).first()
    activities = []

    for yr in user.activities_years:
        for el in reversed(yr['activities']):
            if el['registered_date'] >= start and el['registered_date'] <= end and el['activity_name'] == name:
                ac = {
                    'registered_date': str(el['registered_date']),
                    'activity_name': el['activity_name'],
                    'has_content': el['has_content'],
                    'activity_content': el['activity_content']
                }
                activities.append(ac)

    return activities


def toggle_favorite(user_id, activity_name):
    user = User.objects(user_id = user_id).first().favorites
    try:
        favorite = user.favorites.filter(activity_name=activity_name).first()
        favorite.delete()

        return f'{activity_name} has been removed from favorites'
    except:

        user.activity_name = activity_name
        user.save()

        return f'{activity_name} has been added to favorites'


def get_favorites():
    favorites = []
    for entry in Favorites.objects:
        favorites.append(entry.activity_name)

    if len(favorites) == 0:
        return 'You have no favorite activities'
    else:
        return favorites


def get_day(user_id, month, year, day):
    activities = []

    start = parser.parse(f'{year}-{month}-{day} 00:00:00')
    end = parser.parse(f'{year}-{month}-{day} 23:59:59.999')

    user = User.objects().filter(user_id=user_id).first()

    for yr in user.activities_years:
        for el in reversed(yr['activities']):
            if el['registered_date'] >= start and el['registered_date'] <= end:
                ac = {
                    'registered_date': str(el['registered_date']),
                    'activity_name': el['activity_name'],
                    'has_content': el['has_content'],
                    'activity_content': el['activity_content']
                }
                activities.append(ac)

    return activities


def set_categories(category_name, activities) -> Categories:
    category = Categories()

    category.category = category_name
    category.activities = activities

    category.save()

    return category


def count_activities(user_id) -> Recent:
    recent = Recent()
    user = User.objects(user_id=user_id).first()

    recent.Aktywne_count = 0
    recent.Bierne_count = 0
    recent.ZmianaMyslenia_count = 0
    recent.PozytywneEmocje_count = 0
    recent.total = 0
    last_day = ""
    days = 0

    for yr in reversed(user.activities_years):
        for el in reversed(yr['activities']):
            date = el['registered_date'].date()
            if last_day != date:
                days += 1
            last_day = el['registered_date'].date()

            if days == 28:
                break

            if el['activity_category'] == "Aktywne":
                recent.Aktywne_count += 1
            elif el['activity_category'] == "Bierne":
                recent.Bierne_count += 1
            elif el['activity_category'] == "Zmiana myslenia":
                recent.ZmianaMyslenia_count += 1
            elif el['activity_category'] == "Pozytywne emocje":
                recent.PozytywneEmocje_count += 1
            recent.total += 1

    if len(user.recent) > 0:
        user.recent[0] = recent
    else:
        user.recent.append(recent)
    user.save()

    return recent


def get_reccomended(user_id):
    user = User.objects(user_id=user_id).first()
    recent = user.recent[0]
    bierne = Categories.objects(category="Bierne").first().activities
    aktywne = Categories.objects(category="Aktywne").first().activities
    zmyslenia = Categories.objects(category="Zmiana myslenia").first().activities
    pemocje = Categories.objects(category="Pozytywne emocje").first().activities
    recommended = []

    activities = {
        0: bierne,
        1: aktywne,
        2: zmyslenia,
        3: pemocje
    }
    #bierne 0 aktywne 1 zmyslenia 2 pemocje 3

    percentages = {
        0: recent['Bierne_count'] / recent['total'],
        1: recent['Aktywne_count'] / recent['total'],
        2: recent['ZmianaMyslenia_count'] / recent['total'],
        3: recent['PozytywneEmocje_count'] / recent['total']
    }

    percentages = dict(sorted(percentages.items(), key=lambda item:item[1], reverse=True))

    ind = 0
    for key in percentages:
        if ind < 2:
            recommended += random.sample(activities[key], 2)
            ind +=  1
        else:
            recommended += random.sample(activities[key], 1)

    return recommended


def set_emergency(tip_id, tip) -> Emergency:
    emergency = Emergency()

    emergency.tip_id = tip_id
    emergency.tip = tip

    emergency.save()

    return emergency


def get_emergency(user_id):
    user = User.objects(user_id=user_id).first()
    seen = Emergency_seen()
    tips = Emergency.objects()
    tip_dict = {}
    tips_seen = []

    for obj in user.emergency_seen:
        tips_seen.append(obj.seen)

    for obj in tips:
        tip_dict[obj['tip_id']] = obj['tip']

    tip_ids = list(tip_dict.keys())
    if len(tips_seen) == len(tip_ids):
        user.emergency_seen = []
        tips_seen = []

    tip_ids = list(set(tip_ids) - set(tips_seen))

    sent_id = random.sample(tip_ids, 1)
    print(sent_id)
    print(tip_dict[sent_id[0]])
    seen.seen = sent_id[0]
    user.emergency_seen.append(seen)
    user.save()

    return tip_dict[sent_id[0]]


def get_all_activities():
    cat = Categories.objects()
    activities = {}
    for obj in cat:
        activities[obj['category']] = obj['activities']

    return activities
