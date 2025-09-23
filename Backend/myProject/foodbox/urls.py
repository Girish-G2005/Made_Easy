from django.urls import path
from . import views

urlpatterns = [
    path('foodbox/', views.FoodData.as_view(), name= "food-data"),
    path('reaction/', views.ReactionData.as_view(), name= "reaction-data"),
]
