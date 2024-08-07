from django.urls import path
from .views import ReferenceListView

urlpatterns = [
    path('references/', ReferenceListView.as_view(), name='reference-list'),

]

