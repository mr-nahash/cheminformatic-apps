from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


# Create your views here.

def collection_data(request):
    uri = "mongodb+srv://u_pick_it:u_pick_it@chemconnect.mbuwkso.mongodb.net/?retryWrites=true&w=majority&ssl=true&tls=true&tlsAllowInvalidCertificates=true&appName=ChemConnect"

    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))    
    db = client['chemConnect']
    collection = db['references']
    
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        
        data = list(collection.find())  # Convert cursor to a list
        
        return render(request, 'references/collection_data.html', {'data': data})

    except Exception as e:
        print(e)
        return render(request, 'references/collection_data.html', {'error': str(e)})