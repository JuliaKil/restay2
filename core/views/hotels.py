from ..models import Hotel, Trip, Event
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseForbidden
import json
from django.views import View
from django.core import serializers
from .transfers import transformTime, transformTimezone
from datetime import date

def checkTime(startTime, endTime, trip):
    if startTime >= endTime:
        return False
    for event in Event.objects.filter(trip = trip):
        if (startTime >= event.startTime and startTime < event.endTime) or (endTime > event.startTime and endTime <= event.endTime):
            return False
    return True

class HotelsView(View):
    def post(self, request):
        if request.user.is_authenticated:
            hotel_data = json.loads(request.body)
            new_hotel = Hotel()
            try:
                new_hotel.Timezone = transformTimezone(hotel_data['timezone'])
                startTime = transformTime(hotel_data['startTime'], new_hotel.Timezone)
                endTime =  transformTime(hotel_data['endTime'], new_hotel.Timezone)
                new_hotel.trip = Trip.objects.get(pk = hotel_data['tripId'])
                if checkTime(startTime, endTime, new_hotel.trip):
                    new_hotel.startTime = startTime
                    new_hotel.endTime = endTime
                else:
                    return HttpResponseBadRequest('Неправильное время')
                pricePerNight = hotel_data['pricePerNight']
                new_hotel.price = (int(str(endTime - startTime).split()[0])+1) * pricePerNight
                new_hotel.name = hotel_data['name']
                if 'room' in hotel_data:
                    new_hotel.room = hotel_data['room']
                if 'address' in hotel_data:
                    new_hotel.address = hotel_data['address']
                new_hotel.save()
                return HttpResponse('Successfully created hotel!')
            except KeyError:
                return HttpResponseBadRequest('Incorrect hotel data')
        else:
            return HttpResponseForbidden('Пользователь не авторизован')
