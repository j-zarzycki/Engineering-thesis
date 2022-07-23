from data.Activity import Activity
from data.Favorites import Favorites
from dateutil import parser
from data.months_dict import months_dict


months_dict = months_dict()


def create_activity(registered_date, activity_name):
    activity = Activity()

    activity.registered_date = registered_date
    activity.activity_name = activity_name

    activity.save()

    return activity


def create_activity_content(registered_date, activity_name, has_content, activity_content):
    activity = Activity()

    activity.registered_date = registered_date
    activity.activity_name = activity_name
    activity.has_content = has_content
    activity.activity_content = activity_content

    activity.save()
    return activity


def get_all():
    activity_names = []
    activity_dates = []
    activity_content = []

    for entry in Activity.objects:
        activity_names.append(entry.activity_name)
        activity_dates.append(entry.registered_date)
        try:
            activity_content.append(entry.has_content)
        except:
            activity_content.append(False)

    return activity_names, activity_dates, activity_content


def get_month(month,year):
    activity_names = []
    activity_dates = []
    activity_content = []

    start = parser.parse(f'{year}-{month}-1 00:00:00')
    end_of_month = months_dict[int(month)]
    try:
        end = parser.parse(f'{year}-{month}-{end_of_month} 23:59:59')
    except:
        end = parser.parse(f'{year}-{month}-28 23:59:59')

    activity = Activity.objects().filter(registered_date__gte=start, registered_date__lte=end)

    for entry in activity:
        activity_names.append(entry.activity_name)
        activity_dates.append(entry.registered_date)
        try:
            activity_content.append(entry.has_content)
        except:
            activity_content.append(False)

    return activity_names, activity_dates, activity_content


def check_content(month, year, day, hour, minute, second, name):
    start = parser.parse(f'{year}-{month}-{day} {hour}:{minute}:{second}')
    end = parser.parse(f'{year}-{month}-{day} {hour}:{minute}:{second}.999')

    activity = Activity.objects().filter(registered_date__gte=start, registered_date__lte=end, activity_name=name).first()
    try:
        has_content = activity.has_content
    except:
        has_content = False

    return has_content


def get_one(month, year, day, hour, minute, second, name, has_content):
    start = parser.parse(f'{year}-{month}-{day} {hour}:{minute}:{second}')
    end = parser.parse(f'{year}-{month}-{day} {hour}:{minute}:{second}.999')

    activity = Activity.objects().filter(registered_date__gte=start, registered_date__lte=end, activity_name=name).first()
    if has_content:
        return activity.activity_name, activity.registered_date, activity.activity_content
    else:
        return activity.activity_name, activity.registered_date


def toggle_favorite(activity_name):
    try:
        favorite = Favorites.objects().filter(activity_name=activity_name).first()
        favorite.delete()

        return f'{activity_name} has been removed from favorites'
    except:
        favorite = Favorites()
        favorite.activity_name = activity_name
        favorite.save()

        return f'{activity_name} has been added to favorites'


def get_favorites():
    favorites = []
    for entry in Favorites.objects:
        favorites.append(entry.activity_name)

    if len(favorites) == 0:
        return 'You have no favorite activities'
    else:
        return favorites


def get_day(month, year, day):
    activity_names = []
    activity_dates = []
    has_content = []

    start = parser.parse(f'{year}-{month}-{day} 00:00:00')
    end = parser.parse(f'{year}-{month}-{day} 23:59:59.999')

    activity = Activity.objects().filter(registered_date__gte=start, registered_date__lte=end)

    for entry in activity:
        activity_names.append(entry.activity_name)
        activity_dates.append(entry.registered_date)
        try:
            has_content.append(entry.has_content)
        except:
            has_content.append(False)

    return activity_names, activity_dates, has_content
