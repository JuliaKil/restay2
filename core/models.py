from django.db import models
from django.contrib.auth.models import User


class Trip(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Event(models.Model):
    startTime = models.DateTimeField()
    startTimezone = models.CharField(max_length=10)
    endTime = models.DateTimeField()
    endTimezone = models.CharField(max_length=10)
    price = models.PositiveIntegerField(null=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)


class Transfer(Event):
    transferType = models.CharField(max_length=100)
    departurePoint = models.TextField(null=True)
    arrivalPoint = models.TextField(null=True)
    number = models.CharField(max_length=30, null=True)


class Hotel(models.Model):
    startTime = models.DateTimeField()
    Timezone = models.CharField(max_length=10)
    endTime = models.DateTimeField()
    price = models.PositiveIntegerField(null=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    room = models.CharField(max_length=100, null=True)
    address = models.TextField(null=True)


class Sight(Event):
    name = models.CharField(max_length=100)
    address = models.TextField(null=True)
