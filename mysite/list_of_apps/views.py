from django.shortcuts import render
from pymongo import MongoClient


# Create your views here.
from django.shortcuts import render

def collection_data(request):
    client = MongoClient('mongodb+srv://u_pick_it:u_pick_it@chemconnect.mbuwkso.mongodb.net/?retryWrites=true&w=majority&appName=ChemConnect&tls=true&tlsAllowInvalidCertificates=true')
    db = client['chemConnect']
    collection = db['references']
    
    data = collection.find()  # Retrieve all documents in the collection
    return render(request, 'list_of_apps/collection_data.html', {'data': data})