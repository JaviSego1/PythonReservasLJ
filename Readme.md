# Mi primera aplicación Flask

Nuestra referencia es el [manual de Flask](https://flask.palletsprojects.com/es/stable).

Si no tenemos python instalado, lo instalamos:

```bash
apt install python3.12 python3.12-venv
```

En Windows sería similar pero con `winget`.

Empezamos  [la instalación](https://flask.palletsprojects.com/es/stable/installation/).

```bash
mkdir tuto-flask
cd tuto-flask
python -m venv venv
. ./venv/bin/activate
```

Creamos un archivo `.gitignore`, le añadimos la carpeta `venv`.

Inicializamos el repositorio:

```bash
git init
```

Añadimos Flask al proyecto:

```bash
pip install Flask
```

**Cada vez que añadimos una dependencia hay que ejecutar esto:**

```bash
pip freeze > requirements.txt
```

Creamos un archivo `hola.py` con este contenido:

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hola Mundo!</p>"
```

Me aseguro que el virtual environment está activo y ejecuto la APP en el puerto 8080:

```bash
. ./venv/bin/activate
flask --app hola run --port 8080
```

## Instalación de MongoDB

De la [imagen oficial de Mongo](https://hub.docker.com/_/mongo/), adaptamos el Docker Compose:

```yaml
services:

  mongo:
    image: mongo
    restart: "no"
    ports: 
      - 27017:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: 78agsbjha7834aSDFjhd73

  mongo-express:
    image: mongo-express
    restart: "no"
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root      
      ME_CONFIG_MONGODB_ADMINPASSWORD: 78agsbjha7834aSDFjhd73
      ME_CONFIG_MONGODB_URL: mongodb://root:78agsbjha7834aSDFjhd73@mongo:27017/
      ME_CONFIG_BASICAUTH: "false"
```

Para comprobar que ha funcionado, abrimos Mongo Express en local: [http://localhost:8081/](http://localhost:8081/).

