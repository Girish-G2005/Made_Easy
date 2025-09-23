from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns= [
    path('auth/signup/', views.SignupView.as_view(), name="signup"),
    path('auth/login/', TokenObtainPairView.as_view(), name="login"),
    path('auth/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('auth/home/', views.HomeView.as_view(), name="home"),
]
