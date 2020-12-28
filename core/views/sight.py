from ..models import Sight, Trip, Event
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseForbidden
import json
from django.views import View
from django.core import serializers
from datetime import datetime
from .transfers import transformTime, transformTimezone
from .transfer import checkTime

class SightView(View):
    def put(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            sight_data = json.loads(request.body)
            sight_id = kwargs.get('sightId')
            try:
                sight = Sight.objects.get(pk=sight_id)
                try:
                    sight.startTimezone = transformTimezone(sight_data['startTimezone'])
                    sight.endTimezone = transformTimezone(sight_data['endTimezone'])
                    startTime = transformTime(sight_data['startTime'], sight.startTimezone)
                    endTime =  transformTime(sight_data['endTime'], sight.endTimezone)
                    sight.trip = Trip.objects.get(pk = sight_data['tripId'])
                    if checkTime(startTime, endTime, sight.trip, sight_id):
                        sight.startTime = startTime
                        sight.endTime = endTime
                    else:
                        return HttpResponseBadRequest('Неправильное время')
                    sight.price = sight_data['price']
                    sight.name = sight_data['name']
                    if 'address' in sight_data:
                        sight.address = sight_data['address']
                    sight.save()
                    return HttpResponse('Successfully changed sight!')
                except KeyError:
                    return HttpResponseBadRequest('Incorrect sight data')
            except Sight.DoesNotExist:
                return HttpResponseBadRequest('Sight not found') 
        else:
            return HttpResponseForbidden('Пользователь не авторизован')

    def delete(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            sight_id = kwargs.get('sightId')
            sight = Sight.objects.filter(id=sight_id)
            if sight.exists():
                sight.delete()
                return HttpResponse('Successfully deleted sight!')
            else:
                return HttpResponseBadRequest('Sight not found')
        else:
            return HttpResponseForbidden('Пользователь не авторизован')