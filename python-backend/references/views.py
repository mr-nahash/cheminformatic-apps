from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .db import get_database
from bson import ObjectId

# Helper function to convert ObjectId to string
def convert_objectid_to_str(document):
    if '_id' in document:
        print(f"Before conversion: {document['_id']}")  # Debug: Print ObjectId before conversion
        document['_id'] = str(document['_id'])
        print(f"After conversion: {document['_id']}")  # Debug: Print ObjectId after conversion
    return document

class ReferenceListView(APIView):
    def get(self, request):
        db = get_database()  # Connect to the MongoDB database
        collection = db['references']  # Access the 'references' collection
        references = list(collection.find())  # Retrieve all documents from the collection and convert the cursor to a list

        # Debug: Print each document before conversion
        print("Documents before conversion:")
        for doc in references:
            print(doc)

        # Convert ObjectId to string for each document
        references = [convert_objectid_to_str(doc) for doc in references]

        # Debug: Print each document after conversion
        print("Documents after conversion:")
        for doc in references:
            print(doc)
        
        return Response(references, status=status.HTTP_200_OK)  # Return the list of documents as a JSON response

    def post(self, request):
        db = get_database()
        collection = db['references']
        data = request.data

        # Debug: Print data before insertion
        print("Data to be inserted:", data)
        
        collection.insert_one(data)
        
        return Response({"message": "Reference added successfully!"}, status=status.HTTP_201_CREATED)
