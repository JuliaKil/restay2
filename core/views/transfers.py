from ..models import Transfer, Trip, Event, Hotel
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseForbidden
import json
from django.views import View
from django.core import serializers
from datetime import datetime
from pytz import timezone


def transformTime(dateandtime, timeZone):
    date = dateandtime.split(' ')[0]
    time = dateandtime.split(' ')[1]
    splitDate = date.split('-')
    splitTime = time.split(':')
    return datetime(int(splitDate[0]), int(splitDate[1]), int(splitDate[2]), int(splitTime[0]), int(splitTime[1]), 0, 0, timezone(timeZone))


def transformTimezone(timezone):
    timezone = ''.join(['Etc/', timezone])
    if timezone.find('+') != -1:
        timezone = timezone.replace('+', '-')
    else:
        timezone = timezone.replace('-', '+')
    return timezone


def checkTime(startTime, endTime, trip):
    if startTime >= endTime:
        return False
    for event in Event.objects.filter(trip = trip):
        if (startTime >= event.startTime and startTime < event.endTime) or (endTime > event.startTime and endTime <= event.endTime):
            return False
    for hotel in Hotel.objects.filter(trip = trip):
        if (hotel.startTime >= startTime and hotel.startTime < endTime) or (hotel.endTime > startTime and hotel.endTime <= endTime):
            return False        
    return True



class TransfersView(View):
    def post(self, request):
        if request.user.is_authenticated:
            transfer_data = json.loads(request.body)
            new_transfer = Transfer()
            try:
                new_transfer.startTimezone = transformTimezone(transfer_data['startTimezone'])
                new_transfer.endTimezone = transformTimezone(transfer_data['endTimezone'])
                startTime = transformTime(transfer_data['startTime'], new_transfer.startTimezone)
                endTime =  transformTime(transfer_data['endTime'], new_transfer.endTimezone)
                new_transfer.trip = Trip.objects.get(pk = transfer_data['tripId'])
                if checkTime(startTime, endTime, new_transfer.trip):
                    new_transfer.startTime = startTime
                    new_transfer.endTime = endTime
                else:
                    return HttpResponseBadRequest('Неправильное время')
                new_transfer.price = transfer_data['price']
                new_transfer.transferType = transfer_data['transferType']
                if 'departurePoint' in transfer_data:
                    new_transfer.departurePoint = transfer_data['departurePoint']
                if 'arrivalPoint' in transfer_data:
                    new_transfer.arrivalPoint = transfer_data['arrivalPoint']
                if 'number':
                    new_transfer.number = transfer_data['number']
                new_transfer.save()
                return HttpResponse('Successfully created transfer!')
            except KeyError:
                return HttpResponseBadRequest('Incorrect transfer data')
        else:
            return HttpResponseForbidden('Пользователь не авторизован')