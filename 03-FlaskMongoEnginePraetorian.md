# Autenticación JWT con Praetorian y MongoEngine en Flask

Vamos a hacer una API REST con algunas rutas protegidas y a las que vamos a poder acceder con autenticación Bearer (token JWT).

MongoEngine es un **Document-Relational Mapper (DRM)** para Python que facilita la interacción con bases de datos NoSQL basadas en MongoDB. Su funcionamiento es similar al de los **Object-Relational Mappers (ORMs)** en bases de datos relacionales, como SQLAlchemy en Python o Hibernate en Java. De hecho, si se busca una analogía en el ecosistema de Java, MongoEngine cumple un papel equivalente al de **Spring Data JPA**, pero aplicado a una base de datos documental en lugar de relacional.

Al igual que **Spring Data JPA** permite definir entidades Java como clases con anotaciones que representan tablas y relaciones, **MongoEngine** usa clases de Python para modelar documentos y sus estructuras dentro de MongoDB. Por ejemplo, en Spring Data JPA, se usaría `@Entity` para definir una clase persistente en una base de datos relacional, mientras que en MongoEngine se define un modelo heredando de `Document` y se especifican los campos con tipos como `StringField`, `IntField`, o `ReferenceField`.

Otra similitud clave es la manera en que ambos frameworks abstraen la interacción con la base de datos. Mientras que Spring Data JPA proporciona repositorios (`JpaRepository`) para facilitar operaciones CRUD sin necesidad de escribir consultas SQL manualmente, MongoEngine ofrece métodos como `.save()`, `.objects()` y `.delete()`, que permiten interactuar con la base de datos sin necesidad de escribir queries en BSON o JSON. Esta capa de abstracción simplifica enormemente el desarrollo, permitiendo a los programadores centrarse en la lógica de negocio en lugar de en los detalles de almacenamiento y recuperación de datos.

Flask-Praetorian es un **framework de autenticación basado en JWT** para Flask que simplifica la gestión de usuarios, roles y protección de rutas en aplicaciones web. Si buscamos una analogía en el ecosistema de Java, Flask-Praetorian cumple un papel similar a **Spring Security**, que es la solución estándar para gestionar autenticación y autorización en aplicaciones Spring Boot.

Al igual que **Spring Security** permite definir un sistema de autenticación y autorización basado en tokens o sesiones, **Flask-Praetorian** proporciona una integración sencilla para manejar autenticación con **JWT (JSON Web Tokens)**. En Spring Security, un usuario se representa generalmente con una entidad que implementa `UserDetails`, mientras que en Flask-Praetorian se define una clase de usuario que cumple con ciertos métodos requeridos, como `lookup()`, `identify()`, e `is_valid()`.

En cuanto a la protección de rutas, Spring Security usa anotaciones como `@PreAuthorize("hasRole('ADMIN')")` para restringir el acceso según los roles del usuario. En Flask-Praetorian, esto se logra con decoradores como `@guard.auth_required` o `@guard.roles_required('admin')`, que permiten restringir endpoints a usuarios autenticados o con ciertos permisos.

Ambos frameworks también facilitan el almacenamiento seguro de contraseñas: Spring Security usa **BCrypt** para cifrar contraseñas por defecto, mientras que Flask-Praetorian también admite BCrypt y permite su integración de manera sencilla.

## Convirtiendo de MySQL a JSON

Imagina que queremos exportar las tuplas de la tabla usuario a documentos JSON. Para ello nos conectamos al contenedor de MYSQL con algo parecido a esto (donde el parámetro `ti` quiere decir terminal interactivo):

 ```sh
docker exec -ti  pilapistas_db_1 sh
mysql -u root -p
 ```

La contraseña es la que fijamos en el docker-compose [(recuerda el tema anterior)](https://gitlab.iesvirgendelcarmen.com/juangu/adt06-proyectoclasepistasdeportivas). Ahora con este comando podemos exportar los datos a JSON para **usuario**:

```sql
use deporte;
show tables;
describe usuario;
select JSON_OBJECT(
    'enabled' ,enabled ,
    'id', id,
    'username', username,
    'email', email,
    'password',password, 
    'tipo', tipo
) from usuario;
```

Lo que nos daría como salida:

```js
{"id": 2, "tipo": "OPERARIO", "email": "pepe@gmail.com", "enabled": "base64:type16:AQ==", "password": "$2a$10$zlD33q.JAxrRPsUGYGY7tedH/dQUn2MmlxQzjO7Y.oqK6rOjJdueq", "username": "pepe"}
{"id": 5, "tipo": "ADMIN", "email": "admin@correo.com", "enabled": "base64:type16:AQ==", "password": "$2a$10$krlxeZI8Xm.n1fNz7v81Y.yzsHtoMoCnDCsStEAPeGkE9BUOBkwn2", "username": "admin"}
{"id": 7, "tipo": "USUARIO", "email": "darkside@starwars.com", "enabled": "base64:type16:AQ==", "password": "$2a$10$.EJQbCFZtHW1pavBGmMkw.VxOn2or6AL2oPP.8RVvCSqXQA/zwUom", "username": "obijuan"} 
{"id": 13, "tipo": "ADMIN", "email": "gerencia@vdc.com", "enabled": "base64:type16:AQ==", "password": "$2a$10$hWkDEd0V0QgmiffgPcSkoe1.OMq5ew.wl7OFBMqii5XkfxtIwzZ92", "username": "gerente"}

```

**Ejercicio: Haz lo mismo para instalacion, horario y reserva**.

## Instalar dependencias necesarias

Primero, asegúrate que tienes las dependencias o librerías necesarias:

```sh
pip install flask mongoengine flask-praetorian flask-cors flask-bcrypt
```

Una vez más recuerda salvar esta configuración para poder clonar el repositorio y empezar de cero. 

Para guardar las dependencias hacemos:

```sh
pip freeze > requirements.txt
```

Para instalar y recuperar el entorno virtual (en Linux/Mac):

```sh
python -m venv  .
. ./venv/bin/activate
pip -r requirements.txt
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
    "db": "gestion",
    "host": "mongodb://root:78agsbjha7834aSDFjhd73@mongo:27017"
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
