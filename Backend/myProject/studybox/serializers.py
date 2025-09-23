from rest_framework import serializers
from .models import Documents, Semester

class DocSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documents
        fields = ['id', 'title', 'pdf_file', 'uploaded_at']

class SemSerializer(serializers.ModelSerializer):
    documents = DocSerializer(many=True, read_only=True)
    class Meta:
        model = Semester
        fields = '__all__'
