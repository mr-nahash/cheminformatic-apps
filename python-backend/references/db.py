from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


def get_database():
    uri = "mongodb+srv://u_pick_it:u_pick_it@chemconnect.mbuwkso.mongodb.net/?retryWrites=true&w=majority&ssl=true&tls=true&tlsAllowInvalidCertificates=true&appName=ChemConnect"
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client['chemConnect']
    return db
