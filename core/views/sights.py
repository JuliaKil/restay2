from ..models import Sight, Trip, Event
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseForbidden
import json
from django.views import View
from django.core import serializers
from datetime import datetime
from .transfers import transformTime, transformTimezone, checkTime

class SightsView(View):
    def post(self, request):
        if request.user.is_authenticated:
            sight_data = json.loads(request.body)
            new_sight = Sight()
            try:
                new_sight.startTimezone = transformTimezone(sight_data['startTimezone'])
                new_sight.endTimezone = transformTimezone(sight_data['endTimezone'])
                startTime = transformTime(sight_data['startTime'], new_sight.startTimezone)
                endTime =  transformTime(sight_data['endTime'], new_sight.endTimezone)
                new_sight.trip = Trip.objects.get(pk = sight_data['tripId'])
                if checkTime(startTime, endTime, new_sight.trip):
                    new_sight.startTime = startTime
                    new_sight.endTime = endTime
                else:
                    return HttpResponseBadRequest('Неправильное время')
                new_sight.price = sight_data['price']
                new_sight.name = sight_data['name']
                if 'address' in sight_data:
                    new_sight.address = sight_data['address']
                new_sight.save()
                return HttpResponse('Successfully created sight!')
            except KeyError:
                return HttpResponseBadRequest('Incorrect sight data')
        else:
            return HttpResponseForbidden('Пользователь не авторизован')