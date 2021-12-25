from django.urls import path
from .views import *

urlpatterns = [
    path('',index,name=""),
    path("login",index),
     path("signup",index),
    path("reset-password",index),
    path("password/reset/confirm/<uid>/<token>",index),
     path("activate/<uid>/<token>",index),
     
]
