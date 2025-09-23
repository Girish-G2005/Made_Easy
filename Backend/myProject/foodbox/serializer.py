from rest_framework import serializers
from .models import Hotels, Items, Reaction

class ItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Items
        fields = ['id', 'name']
        

class HotelSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many= True, read_only= True)
    class Meta:
        model = Hotels
        fields = ['id', 'name', 'image', 'items']

class ReactionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= Reaction
        fields= ['id', 'item', 'is_like', 'user']
