from .serializer import HotelSerializer, ReactionSerializer
from .models import Hotels, Reaction
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class FoodData(generics.ListAPIView):
    queryset = Hotels.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated]

class ReactionData(generics.ListCreateAPIView):
    queryset = Reaction.objects.all()
    serializer_class = ReactionSerializer
    permission_classes = [IsAuthenticated]
