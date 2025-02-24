
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


\pagebreak
