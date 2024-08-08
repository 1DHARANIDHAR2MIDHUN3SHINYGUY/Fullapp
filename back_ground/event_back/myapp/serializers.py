from rest_framework import serializers
from .models import User, Admin, CorporateEvent, EventRegister

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['id', 'username', 'email', 'password']

class CorporateEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorporateEvent
        fields = ['id', 'name', 'description', 'date', 'time', 'venue', 'image', 'gmap', 'location', 'capacity']

class EventRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegister
        fields = ['id', 'firstName', 'lastName', 'email', 'age', 'businessName', 'organizationName', 'businessAddress', 'city', 'state', 'zipcode', 'userId', 'eventId']
