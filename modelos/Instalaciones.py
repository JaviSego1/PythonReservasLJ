from mongoengine import Document, StringField, BooleanField, ObjectIdField
import bson

class Instalaciones(Document):
    """
    Objeto plantilla para mongoengine. Representa la localización de un item inventariable.
    :param nombre: required string value    
    """
    _id = ObjectIdField()
    # codigo = db.SequenceField()
    nombre= StringField(required=True, unique=True)
