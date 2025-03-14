from mongoengine import Document, ObjectIdField, DateTimeField, ReferenceField
from modelos.Instalaciones import Instalaciones
import bson

class Horarios(Document):
    
    _id = ObjectIdField()
    # codigo = db.SequenceField()
    hora_inicio= DateTimeField(required=True, unique=False)
    hora_fin= DateTimeField(required=True, unique=False)
    instalacion= ReferenceField(Instalaciones)
