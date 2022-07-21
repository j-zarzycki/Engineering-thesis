from data.Activity import Activity


def create_activity(registered_date, activity_name):
    activity = Activity()

    activity.registered_date = registered_date
    activity.activity_name = activity_name

    activity.save()

    return activity