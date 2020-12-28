from ..models import Trip, Hotel, Sight, Transfer, Event
from django.views import View
from django.http import HttpResponseForbidden, JsonResponse, HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator, classonlymethod
import asyncio
from django.core import serializers
from django.db.models import Sum
import json


class TripView(View):
    # @classonlymethod
    # def as_view(cls, **initkwargs):
    #     view = super().as_view(**initkwargs)
    #     view._is_coroutine = asyncio.coroutines._is_coroutine
    #     return view


    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            trip_id = kwargs.get('tripId')
            trip = Trip.objects.filter(pk=trip_id)
            if trip.exists():
                events_data = serializers.serialize("json", Event.objects.filter(trip__in = trip).order_by('startTime'))
                hotels_data = serializers.serialize("json", Hotel.objects.filter(trip__in = trip).order_by('startTime'))
                sights_data = serializers.serialize("json", Sight.objects.filter(trip__in = trip).order_by('startTime').select_related())
                transfers_data = serializers.serialize("json", Transfer.objects.filter(trip__in = trip).order_by('startTime').select_related())
                total_price = 0
                event_total_price = Event.objects.filter(trip__in = trip).aggregate(Sum('price'))['price__sum'];
                if event_total_price is not None:
                    total_price += event_total_price
                hotel_total_price = Hotel.objects.filter(trip__in = trip).aggregate(Sum('price'))['price__sum'];
                if hotel_total_price is not None:
                    total_price += hotel_total_price
                name = trip[0].name
                return JsonResponse({'name': name, 'totalPrice': total_price, 'transfers_data': transfers_data, 'hotels_data': hotels_data, 'sights_data': sights_data, 'events_data': events_data })
            else:
                return HttpResponseBadRequest('Путешествие не найдено')
        else:
            return HttpResponseForbidden('Пользователь не авторизован')

    def put(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            trip_data = json.loads(request.body)
            trip_id = kwargs.get('tripId')
            try:
                trip = Trip.objects.get(pk=trip_id)
                try:
                    trip.name = trip_data['name']
                    trip.save()
                    return HttpResponse('Successfully changed trip!')
                except KeyError:
                    return HttpResponseBadRequest('Incorrect trip data')
            except Trip.DoesNotExist:
                return HttpResponseBadRequest('Путешествие не найдено')
        else:
            return HttpResponseForbidden('Пользователь не авторизован')

    def delete(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            trip_id = kwargs.get('tripId')
            trip = Trip.objects.filter(id=trip_id)
            if trip.exists():
                trip.delete()
                return HttpResponse('Successfully deleted trip!')
            else:
                return HttpResponseBadRequest('Путешествие не найдено')
        else:
            return HttpResponseForbidden('Пользователь не авторизован')



