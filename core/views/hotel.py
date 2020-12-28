from ..models import Hotel, Trip, Event
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseForbidden
import json
from django.views import View
from django.core import serializers
from .transfers import transformTime, transformTimezone
from datetime import date
from .hotels import checkTime

class HotelView(View):
    def put(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            hotel_data = json.loads(request.body)
            hotel_id = kwargs.get('hotelId')
            try:
                hotel = Hotel.objects.get(pk=hotel_id)
                try:
                    hotel.Timezone = transformTimezone(hotel_data['timezone'])
                    startTime = transformTime(hotel_data['startTime'], hotel.Timezone)
                    endTime =  transformTime(hotel_data['endTime'], hotel.Timezone)
                    hotel.trip = Trip.objects.get(pk = hotel_data['tripId'])
                    if checkTime(startTime, endTime, hotel.trip):
                        hotel.startTime = startTime
                        hotel.endTime = endTime
                    else:
                        return HttpResponseBadRequest('Неправильное время')
                    pricePerNight = hotel_data['pricePerNight']
                    hotel.price = (int(str(endTime - startTime).split()[0])+1) * pricePerNight
                    hotel.name = hotel_data['name']
                    if 'room' in hotel_data:
                        hotel.room = hotel_data['room']
                    if 'address' in hotel_data:
                        hotel.address = hotel_data['address']
                    hotel.save()
                    return HttpResponse('Successfully changed hotel!')
                except KeyError:
                    return HttpResponseBadRequest('Incorrect hotel data')
            except Hotel.DoesNotExist:
                return HttpResponseBadRequest('Hotel not found')
        else:
            return HttpResponseForbidden('Пользователь не авторизован')


    def delete(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            hotel_id = kwargs.get('hotelId')
            hotel = Hotel.objects.filter(id=hotel_id)
            if hotel.exists():
                hotel.delete()
                return HttpResponse('Successfully deleted hotel!')
            else:
                return HttpResponseBadRequest('Hotel not found')
        else:
            return HttpResponseForbidden('Пользователь не авторизован')