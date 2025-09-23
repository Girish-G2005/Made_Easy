from django.urls import path
from . import views

urlpatterns = [
    path('studybox/', views.SemDocumentsList.as_view(), name="sem-docs-list"),
]
