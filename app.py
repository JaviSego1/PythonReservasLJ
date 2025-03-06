from flask import Flask, jsonify, request, json
from flask_cors import CORS
from flask_praetorian import Praetorian, current_user
from mongoengine import connect, Document, StringField, BooleanField 
import mongoengine as mongo
import flask_praetorian

from modelos.Usuarios import Usuarios

from controladores.instalacion import Instalacion

app = Flask(__name__)

# Configuración de Flask-Praetorian
app.config["SECRET_KEY"] = "d41d8cd98f00b204e9800998ecf8427e"
# Este es el tiempo durante el cual el token de acceso es válido
app.config["JWT_ACCESS_LIFESPAN"] = {"hours": 24}
# Este es el tiempo durante el cual el token de actualización es válido
app.config["JWT_REFRESH_LIFESPAN"] = {"days": 7}


# Configuración de MongoDB
app.config["MONGODB_SETTINGS"] = {
    "host": "localhost",
    "db": "deporte",
    "username": "root",
    "password": "78agsbjha7834aSDFjhd73",
    "port": 27017
}


mongo.connect(**app.config["MONGODB_SETTINGS"])
try:
    database = mongo.get_db()
    print(f"Conectado a MongoDB: {database.name}")
    # Creamos el usuario por defecto al menos para poder hacer login la primera vez   
    usuarios = Usuarios.objects(username='operador')
    if usuarios.count() < 1:
        Usuarios(
            username='operador',
            email='operador@g.educaand.es',                
            password='Secreto123',
            roles='ADMIN',
            is_active = True).save()    
except Exception as e:
    print(f"Error de conexión a MongoDB: {e}")


# Activamos el CORS para que desde el front React 
# podamos hacer peticiones al back con flask

cors = CORS()

# Inicializar Praetorian
guard = Praetorian()
# Le decimos a Praetorian qué modelo gestiona los usuarios
guard.init_app(app, Usuarios)


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    hashed_password = guard.hash_password(password)
    email = data.get("email")
    roles = "OPERARIO"

    if Usuarios.objects(username=username).first():
        return jsonify({"error": "Usuario ya existe"}), 400
    
    user = Usuarios(username=username, hashed_password=hashed_password, email=email).save()

    return jsonify({"message": "Usuario registrado"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = Usuarios.objects(username=username).first()

    if user and guard.authenticate(username, password):
        token = guard.encode_jwt_token(user)
        return jsonify({"access_token": token}), 200
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401


@app.route("/protected", methods=["GET"])
@flask_praetorian.auth_required
def protected():
    user = current_user()
    return jsonify({"message": f"Bienvenido, {user.username}."}), 200


app.register_blueprint(Instalacion)


# Run the APP
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)