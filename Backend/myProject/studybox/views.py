from django.shortcuts import render
from rest_framework import generics
from .models import Semester
from .serializers import SemSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class SemDocumentsList(generics.ListAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemSerializer
    permission_classes = [IsAuthenticated]
