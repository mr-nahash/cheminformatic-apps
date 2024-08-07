from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .db import get_database
from bson import ObjectId


#MongoDB uses ObjectId for _id fields by default. 
# If you need to handle this in your API, consider 
# converting ObjectId to a string or handling it appropriately
#  in your data models or responses.
def convert_objectid_to_str(document):
    if '_id' in document:
        document['_id'] = str(document['_id'])
    return document


class ReferenceListView(APIView):
    def get(self, request):
        db = get_database()  # Connect to the MongoDB database
        collection = db['references']  # Access the 'references' collection
        references = list(collection.find())  # Retrieve all documents from the collection and convert the cursor to a list
        references = [convert_objectid_to_str(doc) for doc in references]  # Convert ObjectId to string for each document
        
        return Response(references, status=status.HTTP_200_OK)  # Return the list of documents as a JSON response

class ReferenceListView(APIView):
    def get(self, request):
        db = get_database()
        collection = db['references']
        references = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB's ObjectId
        
        return Response(references, status=status.HTTP_200_OK)

    def post(self, request):
        db = get_database()
        collection = db['references']
        data = request.data
        collection.insert_one(data)
        
        return Response({"message": "Reference added successfully!"}, status=status.HTTP_201_CREATED)
