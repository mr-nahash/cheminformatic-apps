from django.urls import path
from .views import ReferenceListView

urlpatterns = [
    path('pubmed_index/', ReferenceListView.as_view(), name='reference-list'),

]

