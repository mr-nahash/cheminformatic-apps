from django.shortcuts import render
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


# Create your views here.

def collection_data(request):
    uri = "mongodb+srv://u_pick_it:u_pick_it@chemconnect.mbuwkso.mongodb.net/?retryWrites=true&w=majority&appName=ChemConnect"

    #    Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))    
    db = client['chemConnect']
    collection = db['references']
    

    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        data = collection.find()  # Retrieve all documents in the collection
        return render(request, 'list_of_apps/collection_data.html', {'data': data})

    except Exception as e:
        print(e)