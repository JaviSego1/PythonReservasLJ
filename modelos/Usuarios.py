from mongoengine import Document, StringField, BooleanField, ObjectIdField
import bson

class Usuarios(Document):
    _id = ObjectIdField()
    username = StringField(required=True, unique=True)
    hashed_password = StringField()
    email = StringField(required=True, unique=True)
    # Praetorian usa esto para roles
    roles = StringField(default="user")  
    is_active = BooleanField(default=True)

    @property
    def identity(self):
        """
        *Required Attribute or Property*

        flask-praetorian requires that the user class has an ``identity`` instance
        attribute or property that provides the unique id of the user instance
        """
        return str(self._id)

    @classmethod
    def lookup(cls, username):
        return cls.objects(username=username).first()

    @classmethod
    def identify(cls, user_id):
        return cls.objects(id=user_id).first()

    def is_valid(self):
        return self.is_active
    
    @property
    def rolenames(self):
        """
        *Required Attribute or Property*

        flask-praetorian requires that the user class has a ``rolenames`` instance
        attribute or property that provides a list of strings that describe the roles
        attached to the user instance
        """
        try:
            return self.roles.split(",")
        except Exception:
            return []
        
    @classmethod
    def get_by_id(cls, in_id):
        if type(in_id) is str:
            in_id = bson.ObjectId(in_id)
        return cls.objects.get(_id=in_id)
    
    @classmethod
    def identify(cls, id):
        """
        *Required Method*

        flask-praetorian requires that the user class implements an ``identify()``
        class method that takes a single ``id`` argument and returns user instance if
        there is one that matches or ``None`` if there is not.
        """
        if cls.id_exists(id):
            return cls.get_by_id(id)
        return None
    
    @classmethod
    def id_exists(cls, in_id):
        if type(in_id) is str:
            in_id = bson.ObjectId(in_id)
        return cls.objects(_id=in_id)
    
    def is_valid(self):
        return self.is_active
    
    @property
    def password(self):
        """
        *Required Attribute or Property*

        flask-praetorian requires that the user class has a ``password`` instance
        attribute or property that provides the hashed password assigned to the user
        instance
        """
        return self.hashed_password