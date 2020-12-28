from ..models import Trip
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseForbidden
import json
from django.views import View
from django.core import serializers


class TripsView(View):
    def post(self, request):
        if request.user.is_authenticated:
            trip_data = json.loads(request.body)
            new_trip = Trip()
            try:
                new_trip.name = trip_data['name']
                new_trip.user = request.user
                new_trip.save()
                return HttpResponse('Successfully created trip!')
            except KeyError:
                return HttpResponseBadRequest('Incorrect trip data')
        else:
            return HttpResponseForbidden('Пользователь не авторизован')

    def get(self, request):
        if request.user.is_authenticated:
            data = serializers.serialize(
                "json", Trip.objects.filter(user=request.user.id))
            return JsonResponse({'data': data})
        else:
            return HttpResponseForbidden('Пользователь не авторизован')
