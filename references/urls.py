from django.urls import path

from . import views

urlpatterns = [
    path("", views.collection_data, name="collection_data"),
]