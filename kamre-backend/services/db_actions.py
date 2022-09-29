import datetime
import secrets
import string

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
from data.Archive import Archive
from data.Recovery import Recovery
from data.Emergency_personal_tip import EmergencyPersonalTip
from data.Emergency_personal import EmergencyPersonal
import random

months_dict = months_dict()


def create_user(user_id) -> User:
    user = User()
    recent = Recent()
    emgr_seen = Emergency_seen()
    user.user_id = user_id

    user.recent.append(recent)
    user.emergency_seen = emgr_seen

    user.save()

    return user


def archive_check(user_id):
    user = User.objects(user_id=user_id).first()
    archive = Archive()

    archive.user_id = str(user.id)
    archive.year = user.activities_years[0]['year']

    archive.activities = user.activities_years[0]['activities']
    del user.activities_years[0]
    user.save()
    archive.save()


def update_emergency_personal(user_id, activity_content):
    user = User.objects(user_id=user_id).first()
    emrg_personal = EmergencyPersonal.objects(user_id=user.id).first()
    emrg_tip = EmergencyPersonalTip()

    emrg_tip.created = datetime.datetime.utcnow()
    emrg_tip.tip = activity_content

    if emrg_personal is not None:
        emrg_personal['tips'].append(emrg_tip)

    else:
        emrg_personal = EmergencyPersonal()
        emrg_personal.user_id = user.id
        emrg_personal.tips.append(emrg_tip)

    emrg_personal.save()


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
        yr.year = int(registered_date.year)
        user.activities_years.append(yr)
    x = 0
    for el in user.activities_years:
        if el['year'] == int(registered_date.year):
            user.activities_years[x].activities.append(activity)
        x += 1
    user.save()

    if user.recent[0]['quiz_valid']:
        quiz_validity_check(user)
    else:
        count_activities(user_id)
    if len(user.activities_years) != 1:
        archive_check(user_id)
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
        yr.year = int(registered_date.year)
        user.activities_years.append(yr)
    x = 0
    for el in user.activities_years:
        if el['year'] == int(registered_date.year):
            user.activities_years[x].activities.append(activity)
        x += 1
    user.save()

    if user.recent[0]['quiz_valid']:
        quiz_validity_check(user)
    else:
        count_activities(user_id)
    if len(user.activities_years) != 1:
        archive_check(user_id)

    if activity_name == 'Dobre słowo':
        update_emergency_personal(user_id, activity_content)

    return user


def get_all(user_id):
    activities = []
    user = User.objects(user_id=user_id).first()
    archived = Archive.objects(user_id=str(user.id)).order_by('-year').all()
    for yr in user.activities_years:
        for el in reversed(yr['activities']):
            ac = {
                'registered_date': str(el['registered_date']),
                'activity_name': el['activity_name'],
                'has_content': el['has_content'],
                'activity_content': el['activity_content'],
                'activity_category': el['activity_category']
            }
            activities.append(ac)

    for yr in archived:
        for el in reversed(yr['activities']):
            ac = {
                'registered_date': str(el['registered_date']),
                'activity_name': el['activity_name'],
                'has_content': el['has_content'],
                'activity_content': el['activity_content'],
                'activity_category': el['activity_category']
            }
            activities.append(ac)

    return activities


def get_month(user_id, month, year):
    activities = []

    start = parser.parse(f'{year}-{month}-1 00:00:00')
    end_of_month = months_dict[int(month)]
    try:
        end = parser.parse(f'{year}-{month}-{end_of_month} 23:59:59')
    except:
        end = parser.parse(f'{year}-{month}-28 23:59:59')
    user = User.objects().filter(user_id=user_id).first()
    archive = Archive.objects().filter(user_id=str(user.id), year=year).first()

    for yr in user.activities_years:
        for el in reversed(yr['activities']):
            if start <= el['registered_date'] <= end:
                ac = {
                    'registered_date': str(el['registered_date']),
                    'activity_name': el['activity_name'],
                    'has_content': el['has_content'],
                    'activity_content': el['activity_content'],
                    'activity_category': el['activity_category']
                }
                activities.append(ac)
    if archive is not None:
        for el in reversed(archive['activities']):
            if start <= el['registered_date'] <= end:
                ac = {
                    'registered_date': str(el['registered_date']),
                    'activity_name': el['activity_name'],
                    'has_content': el['has_content'],
                    'activity_content': el['activity_content'],
                    'activity_category': el['activity_category']
                }
                activities.append(ac)

    return activities


def get_one(user_id, month, year, day, hour, minute, second, name):
    start = parser.parse(f'{year}-{month}-{day} {hour}:{minute}:{second}')
    end = parser.parse(f'{year}-{month}-{day} {hour}:{minute}:{second}.99')

    user = User.objects().filter(user_id=user_id).first()
    archive = Archive.objects().filter(user_id=str(user.id), year=year).first()
    activities = []

    for yr in user.activities_years:
        for el in reversed(yr['activities']):
            if start <= el['registered_date'] <= end and el['activity_name'] == name:
                ac = {
                    'registered_date': str(el['registered_date']),
                    'activity_name': el['activity_name'],
                    'has_content': el['has_content'],
                    'activity_content': el['activity_content'],
                    'activity_category': el['activity_category']
                }
                activities.append(ac)
    if archive is not None:
        for el in reversed(archive['activities']):
            if start <= el['registered_date'] <= end and el['activity_name'] == name:
                ac = {
                    'registered_date': str(el['registered_date']),
                    'activity_name': el['activity_name'],
                    'has_content': el['has_content'],
                    'activity_content': el['activity_content'],
                    'activity_category': el['activity_category']
                }
                activities.append(ac)

    return activities


def toggle_favorite(user_id, activity_name):
    user = User.objects(user_id=user_id).first()
    fav = Favorites()
    usr_favs = []

    for el in user.favorites:
        usr_favs.append(el['activity_name'])

    if activity_name in usr_favs:
        user.favorites.pop(usr_favs.index(activity_name))
        user.save()

        return f'Activity {activity_name} removed from favorites'

    else:
        fav.activity_name = activity_name
        user.favorites.append(fav)

    user.save()

    return f'Activity {activity_name} added to favorites'


def get_favorites(user_id):
    user = User.objects(user_id=user_id).first()
    favorites = []

    for entry in user.favorites:
        favorites.append(entry['activity_name'])

    if len(favorites) == 0:
        return 'You have no favorite activities'
    else:
        return favorites


def get_day(user_id, month, year, day):
    activities = []

    start = parser.parse(f'{year}-{month}-{day} 00:00:00')
    end = parser.parse(f'{year}-{month}-{day} 23:59:59.999')

    user = User.objects().filter(user_id=user_id).first()
    archive = Archive.objects().filter(user_id=str(user.id), year=year).first()

    for yr in user.activities_years:
        for el in reversed(yr['activities']):
            if start <= el['registered_date'] <= end:
                ac = {
                    'registered_date': str(el['registered_date']),
                    'activity_name': el['activity_name'],
                    'has_content': el['has_content'],
                    'activity_content': el['activity_content'],
                    'activity_category': el['activity_category']
                }
                activities.append(ac)
    if archive is not None:
        for el in reversed(archive['activities']):
            if start <= el['registered_date'] <= end:
                ac = {
                    'registered_date': str(el['registered_date']),
                    'activity_name': el['activity_name'],
                    'has_content': el['has_content'],
                    'activity_content': el['activity_content'],
                    'activity_category': el['activity_category']
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
    usr_favs = []

    for el in user.favorites:
        usr_favs.append(el['activity_name'])

    recent.Aktywne_count = 0
    recent.Bierne_count = 0
    recent.ZmianaMyslenia_count = 0
    recent.PozytywneEmocje_count = 0
    recent.total = 0
    last_day = ""
    days = 0

    for yr in reversed(user.activities_years):
        for el in reversed(yr['activities']):
            value_added = 1
            date = el['registered_date'].date()
            if last_day != date:
                days += 1
            last_day = el['registered_date'].date()

            if days == 28:
                break

            if el['activity_name'] in usr_favs:
                value_added = 2

            if el['activity_category'] == "Aktywne":
                recent.Aktywne_count += value_added
            elif el['activity_category'] == "Bierne":
                recent.Bierne_count += value_added
            elif el['activity_category'] == "Zmiana myślenia":
                recent.ZmianaMyslenia_count += value_added
            elif el['activity_category'] == "Pozytywne emocje":
                recent.PozytywneEmocje_count += value_added
            recent.total += value_added

    if days != 28:
        archive = Archive.objects(user_id=str(user.id)).order_by('-year').first()
        if archive is not None:
            for el in reversed(archive['activities']):
                value_added = 1
                date = el['registered_date'].date()
                if last_day != date:
                    days += 1
                last_day = el['registered_date'].date()

                if days == 28:
                    break

                if el['activity_name'] in usr_favs:
                    value_added = 2

                if el['activity_category'] == "Aktywne":
                    recent.Aktywne_count += value_added
                elif el['activity_category'] == "Bierne":
                    recent.Bierne_count += value_added
                elif el['activity_category'] == "Zmiana myślenia":
                    recent.ZmianaMyslenia_count += value_added
                elif el['activity_category'] == "Pozytywne emocje":
                    recent.PozytywneEmocje_count += value_added
                recent.total += value_added

    recent.quiz_valid = False

    if len(user.recent) > 0:
        user.recent[0] = recent
    else:
        user.recent.append(recent)
    user.save()

    return recent


def quiz_validity_check(user: User):
    days = 0
    last_day = ""
    recent = Recent()
    for yr in reversed(user.activities_years):
        for el in reversed(yr['activities']):
            date = el['registered_date'].date()
            if last_day != date:
                days += 1
            last_day = el['registered_date'].date()
            if days == 14:
                recent.quiz_valid = False
                user.recent[0] = recent
                user.save()


def set_recent(user_id, b_count, a_count, z_count, p_count):
    user = User.objects(user_id=user_id).first()
    recent = Recent()

    recent.Aktywne_count = a_count
    recent.Bierne_count = b_count
    recent.ZmianaMyslenia_count = z_count
    recent.PozytywneEmocje_count = p_count
    recent.quiz_valid = True

    recent.total = a_count + b_count + z_count + p_count

    user.recent[0] = recent
    user.save()

    return user


def get_reccomended(user_id):
    user = User.objects(user_id=user_id).first()
    recent = user.recent[0]
    bierne = Categories.objects(category="Bierne").first().activities
    aktywne = Categories.objects(category="Aktywne").first().activities
    zmyslenia = Categories.objects(category="Zmiana myślenia").first().activities
    pemocje = Categories.objects(category="Pozytywne emocje").first().activities
    recommended = []

    activities = {
        0: bierne,
        1: aktywne,
        2: zmyslenia,
        3: pemocje
    }
    # bierne 0 aktywne 1 zmyslenia 2 pemocje 3

    percentages = {
        0: recent['Bierne_count'] / recent['total'],
        1: recent['Aktywne_count'] / recent['total'],
        2: recent['ZmianaMyslenia_count'] / recent['total'],
        3: recent['PozytywneEmocje_count'] / recent['total']
    }

    percentages = dict(sorted(percentages.items(), key=lambda item: item[1], reverse=True))

    ind = 0
    for key in percentages:
        if ind < 2:
            recommended += random.sample(activities[key], 2)
            ind += 1
        else:
            recommended += random.sample(activities[key], 1)

    return recommended


def set_emergency(tip) -> Emergency:
    emergency = Emergency()

    emergency.tip = tip

    emergency.save()

    return emergency


def get_emergency(user_id):
    user = User.objects(user_id=user_id).first()
    tips = Emergency.objects()
    tips_personal = EmergencyPersonal.objects(user_id=user.id).first()
    tip_dict = {}
    tips_seen = []

    if user.emergency_seen['last_seen_personal'] or tips_personal is None or len(tips_personal['tips']) == 0:
        for el in user.emergency_seen['seen']:
            tips_seen.append(el)

        for obj in tips:
            tip_dict[obj['tip_id']] = obj['tip']

        tip_ids = list(tip_dict.keys())
        if len(tips_seen) >= len(tip_ids):
            user.emergency_seen['seen'] = []
            tips_seen = []

        tip_ids = list(set(tip_ids) - set(tips_seen))
        sent_id = random.sample(tip_ids, 1)

        user.emergency_seen['seen'].append(sent_id[0])
        user.emergency_seen['last_seen_personal'] = False

    else:
        for el in user.emergency_seen['seen_personal']:
            tips_seen.append(el)

        for obj in tips_personal['tips']:
            tip_dict[obj['tip_id']] = obj['tip']

        tip_ids = list(tip_dict.keys())
        if len(tips_seen) >= len(tip_ids):
            user.emergency_seen['seen_personal'] = []
            tips_seen = []

        tip_ids = list(set(tip_ids) - set(tips_seen))
        sent_id = random.sample(tip_ids, 1)
        user.emergency_seen['seen_personal'].append(sent_id[0])
        user.emergency_seen['last_seen_personal'] = True

    user.save()

    return tip_dict[sent_id[0]]


def get_all_activities():
    cat = Categories.objects()
    activities = {}
    for obj in cat:
        activities[obj['category']] = obj['activities']

    return activities


def stress():
    #############################

    # stress test#

    months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
    year = 2020
    hours = [6, 12, 18]
    for month in months:
        for day in days:
            for hour in hours:
                reg_dat = parser.parse(f'{year}-{month}-{day} {hour}:00:00')
                create_activity_content(1, reg_dat, "Wdzięczność", True, "Test")

    #############################


def user_check(user_id):
    user = User.objects(user_id=user_id).first()
    if user is None:
        create_user(user_id)

    return user


def user_clear_chat_answers(user_id):
    user = User.objects(user_id=user_id).first()
    user.chat_answers = []
    user.save()


def user_check_answers(user_id):
    user = User.objects(user_id=user_id).first()
    return user.chat_answers


def user_update_answers(user_id, answer):
    user = User.objects(user_id=user_id).first()
    user.chat_answers.append(answer)
    user.save()


def check_id(user_id):
    user = User.objects(user_id=user_id).first()
    print(str(user.id))


def delete_account(user_id):
    user = User.objects(user_id=user_id).first()
    archived = Archive.objects(user_id=str(user.id)).all()

    for el in archived:
        delete_archive(str(user.id))

    user.delete()


def delete_archive(user_id):
    archived = Archive.objects(user_id=user_id).first()
    archived.delete()


def generate_recovery(user_id):
    recovery = Recovery()
    user = User.objects(user_id=user_id).first()
    length = 15

    recovery.created = datetime.datetime.utcnow()
    recovery.user_id = user.id

    recovery_code = ''.join(secrets.choice(string.ascii_letters + string.digits) for i in range(length))

    recovery.recovery_code = recovery_code

    try:
        recovery.save()
        return recovery_code
    except:
        return None


def migrate_account(recovery_code, user_id):
    recovery = Recovery.objects(recovery_code=recovery_code).first()
    try:
        user = User.objects(id=recovery.user_id).first()

        user.user_id = user_id
        user.save()

        recovery.delete()
        return True
    except:
        return False
