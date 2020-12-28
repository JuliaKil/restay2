from .transfers import transformTime, transformTimezone
from ..models import Transfer, Trip, Event, Hotel
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseForbidden
import json
from django.views import View
from django.core import serializers


def checkTime(startTime, endTime, trip, pk):
    if startTime >= endTime:
        return False
    for event in Event.objects.filter(trip = trip).exclude(pk=pk):
        if (startTime >= event.startTime and startTime < event.endTime) or (endTime > event.startTime and endTime <= event.endTime):
            return False
    for hotel in Hotel.objects.filter(trip = trip):
        if (hotel.startTime >= startTime and hotel.startTime < endTime) or (hotel.endTime > startTime and hotel.endTime <= endTime):
            return False  
    return True


class TransferView(View):
    def put(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            transfer_data = json.loads(request.body)
            transfer_id = kwargs.get('transferId')
            try:
                transfer = Transfer.objects.get(pk=transfer_id)
                try:
                    transfer.startTimezone = transformTimezone(transfer_data['startTimezone'])
                    transfer.endTimezone = transformTimezone(transfer_data['endTimezone'])
                    startTime = transformTime(transfer_data['startTime'], transfer.startTimezone)
                    endTime =  transformTime(transfer_data['endTime'], transfer.endTimezone)
                    transfer.trip = Trip.objects.get(pk = transfer_data['tripId'])
                    if checkTime(startTime, endTime, transfer.trip, transfer_id):
                        transfer.startTime = startTime
                        transfer.endTime = endTime
                    else:
                        return HttpResponseBadRequest('Неправильное время')
                    transfer.price = transfer_data['price']
                    transfer.transferType = transfer_data['transferType']
                    if 'departurePoint' in transfer_data:
                        transfer.departurePoint = transfer_data['departurePoint']
                    if 'arrivalPoint' in transfer_data:
                        transfer.arrivalPoint = transfer_data['arrivalPoint']
                    if 'number':
                        transfer.number = transfer_data['number']
                    transfer.save()
                    return HttpResponse('Successfully updated transfer!')
                except KeyError:
                    return HttpResponseBadRequest('Incorrect transfer data')
            except Transfer.DoesNotExist:
                return HttpResponseBadRequest('Transfer not found') 
        else:
            return HttpResponseForbidden('Пользователь не авторизован')

    def delete(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            transfer_id = kwargs.get('transferId')
            transfer = Transfer.objects.filter(id=transfer_id)
            if transfer.exists():
                transfer.delete()
                return HttpResponse('Successfully deleted transfer!')
            else:
                return HttpResponseBadRequest('Transfer not found')
        else:
            return HttpResponseForbidden('Пользователь не авторизован')