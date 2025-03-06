# flask packages
from flask import jsonify
from flask import Blueprint
import flask_praetorian

from modelos.Instalaciones import Instalaciones

Instalacion = Blueprint('instalaciones', __name__, url_prefix='/api/instalacion')

# /api/instalacion
@Instalacion.route('/', methods=['GET'])
@flask_praetorian.auth_required
def get_all_instalacions():
    output = Instalaciones.objects().to_json()
    return jsonify(output)

