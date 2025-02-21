from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Esto funciona</p>"

@app.route("/saluda/<nombre>")
def hola_carabola(nombre):
    return "<p>Hola "+nombre+", encantando de conocerte.</p>"

@app.route("/telefono/<int:numero>")
def telefono(numero):
    return f'<p>Me has dado el teléfono {numero} </p>'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form['username']
        return f'<p>Bienvenido {usuario}</p>'
    else:
        return '<p>Sin identificar</p>'