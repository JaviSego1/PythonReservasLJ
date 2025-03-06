from mongoengine import connect, Document, StringField, IntField

# Conexión a la base de datos
connect(
    db="deporte",
    host="localhost",
    username="root",
    password="78agsbjha7834aSDFjhd73",
    port=27017
)

# Definición del modelo de Instalaciones
class Instalaciones(Document):
    id = IntField(primary_key=True)
    nombre = StringField(required=True, unique=True)

# Datos a insertar
datos_instalaciones = [
    {"id": 7, "nombre": "tenis arriba"},
    {"id": 8, "nombre": "tenis césped artificial"},
    {"id": 9, "nombre": "fútbol"},
    {"id": 10, "nombre": "baloncesto"},
    {"id": 11, "nombre": "squash"},
    {"id": 13, "nombre": "sauna mujeres"},
    {"id": 14, "nombre": "pista de pádel"},
    {"id": 16, "nombre": "sauna caballeros"}
]

# Inserción de los datos en la colección
for instalacion in datos_instalaciones:
    nueva_instalacion = Instalaciones(**instalacion)
    nueva_instalacion.save()

print("Datos insertados correctamente en la colección instalaciones.")
