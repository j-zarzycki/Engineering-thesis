from data.Activity import Activity
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

    for entry in Activity.objects:
        activity_names.append(entry.activity_name)
        activity_dates.append(entry.registered_date)

    return activity_names, activity_dates


def get_month(month,year):
    activity_names = []
    activity_dates = []

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

    return activity_names, activity_dates


