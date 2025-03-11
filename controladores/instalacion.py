# flask packages
from flask import jsonify
from flask import Blueprint
from flask import request
import flask_praetorian
import bson


from modelos.Instalaciones import Instalaciones

InstalacionBP = Blueprint('instalaciones', __name__, url_prefix='/api/instalacion')

# /api/instalacion

@InstalacionBP.route('', methods=['GET'])
@flask_praetorian.auth_required
def get_all_instalacions():
    try: 
        output = Instalaciones.objects().to_json()
        return (output)
    except:
        return '{"error": "Imposible procesar la petición"}', 500

@InstalacionBP.route('<instalacion_id>', methods=['GET'])
@flask_praetorian.auth_required
def get_one_instalacion(instalacion_id):
    try: 
        output = Instalaciones.objects(_id=instalacion_id).first().to_json()
        return (output)
    except:
        return '{"error": "Imposible procesar la petición"}', 404


@InstalacionBP.route('', methods=['POST'])
@flask_praetorian.auth_required
def save_instalacions():
    try: 
        data = request.get_json()
        res = Instalaciones(**data).save()
    except Exception as e:
        return '{"error": "Imposible crear el objeto"}', 400
    return jsonify(data), 201

@InstalacionBP.route('<instalacion_id>', methods=['PUT'])
@flask_praetorian.auth_required
def update_instalacions(instalacion_id):
    try: 
        data = request.get_json()
        res = Instalaciones.objects(_id=instalacion_id).update(**data)
    except Exception as e:
        return '{"error": "Imposible actualizar el objeto"}', 400
    return jsonify(data), 201

@InstalacionBP.route('<instalacion_id>', methods=['DELETE'])
@flask_praetorian.auth_required
def delete_instalacions(instalacion_id):
    try:         
        res = Instalaciones.objects(_id=instalacion_id).delete()
    except Exception as e:
        return '{"error": "Imposible actualizar el objeto"}', 400
    return '{"eliminados": '+str(res)+'}', 201

