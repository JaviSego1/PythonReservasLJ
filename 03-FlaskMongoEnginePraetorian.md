# Autenticación JWT con Praetorian y MongoEngine en Flask

Vamos a hacer una API REST con algunas rutas protegidas y a las que vamos a poder acceder con autenticación Bearer (token JWT).

## Instalar dependencias necesarias

Primero, asegúrate que tienes las dependencias o librerías necesarias:

```sh
pip install flask mongoengine flask-praetorian flask-cors flask-bcrypt
```

## Configurar Flask con MongoEngine

Creamos o modificamos el archivo `app.py` con la configuración de MongoDB y Flask.

```python
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_praetorian import Praetorian
from flask_bcrypt import Bcrypt
from mongoengine import connect, Document, StringField, BooleanField

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Configuración de MongoDB
app.config["MONGODB_SETTINGS"] = {
    "db": "testdb",
    "host": "mongodb://localhost:27017/testdb"
}
connect(**app.config["MONGODB_SETTINGS"])

# Configuración de Flask-Praetorian
app.config["SECRET_KEY"] = "supersecretkey"
app.config["JWT_ACCESS_LIFESPAN"] = {"hours": 24}

# Inicializar Praetorian
guard = Praetorian()

```

## Definir el modelo de usuario

MongoEngine no usa SQLAlchemy, así que definimos un **modelo de usuario** con las funciones necesarias para Flask-Praetorian.

```python
class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    roles = StringField(default="user")  # Praetorian usa esto para roles
    is_active = BooleanField(default=True)

    @classmethod
    def lookup(cls, username):
        return cls.objects(username=username).first()

    @classmethod
    def identify(cls, user_id):
        return cls.objects(id=user_id).first()

    def is_valid(self):
        return self.is_active
```

**Nota**: `lookup()` y `identify()` son métodos que necesita Flask-Praetorian para buscar usuarios.

## Inicializar Praetorian con MongoEngine

Agregamos esta línea en `app.py` después de definir el modelo:

```python
guard.init_app(app, User)
```

## Crear rutas de autenticación

Ahora, agregamos **registro de usuarios, login y ruta protegida**.

```python
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if User.objects(username=username).first():
        return jsonify({"error": "Usuario ya existe"}), 400

    hashed_password = guard.hash_password(password)
    user = User(username=username, password=hashed_password).save()

    return jsonify({"message": "Usuario registrado"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.objects(username=username).first()

    if user and guard.authenticate(username, password):
        token = guard.encode_jwt_token(user)
        return jsonify({"access_token": token}), 200
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401


@app.route("/protected", methods=["GET"])
@guard.auth_required
def protected():
    user = guard.current_user()
    return jsonify({"message": f"Bienvenido, {user.username}."}), 200
```

Para probar los endpoints:

**Registro de usuario**

```sh
curl -X POST http://127.0.0.1:5000/register -H "Content-Type: application/json" -d '{"username": "admin", "password": "1234"}'
```

**Login y obtención del token**

```sh
curl -X POST http://127.0.0.1:5000/login -H "Content-Type: application/json" -d '{"username": "admin", "password": "1234"}'
```

**Acceso a una ruta protegida (reemplaza `<TOKEN>` por el token obtenido)**

```sh
curl -X GET http://127.0.0.1:5000/protected -H "Authorization: Bearer <TOKEN>"
```
