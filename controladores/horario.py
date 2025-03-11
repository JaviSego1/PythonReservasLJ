# flask packages
from flask import jsonify
from flask import Blueprint
from flask import request
import flask_praetorian
import bson


from modelos.Horarios import Horarios

HorarioBP = Blueprint('horarios', __name__, url_prefix='/api/horario')

# /api/horario

@HorarioBP.route('', methods=['GET'])
@flask_praetorian.auth_required
def get_all_horarios():
    try: 
        output = Horarios.objects().to_json()
        return (output)
    except:
        return jsonify('{"error": "Imposible procesar la petición"}'), 500

@HorarioBP.route('<horario_id>', methods=['GET'])
@flask_praetorian.auth_required
def get_one_horario(horario_id):
    try: 
        output = Horarios.objects(_id=horario_id)[0].to_json()
        return (output)
    except:
        return jsonify('{"error": "Imposible procesar la petición"}'), 404


@HorarioBP.route('', methods=['POST'])
@flask_praetorian.auth_required
def save_horarios():
    try: 
        data = request.get_json()
        res = Horarios(**data).save()
    except Exception as e:
        return jsonify('{"error": "Imposible crear el objeto"}'), 400
    return jsonify(res), 201

@HorarioBP.route('<horario_id>', methods=['PUT'])
@flask_praetorian.auth_required
def update_horarios(horario_id):
    try: 
        data = request.get_json()
        res = Horarios.objects(_id=horario_id).update()
    except Exception as e:
        return jsonify('{"error": "Imposible actualizar el objeto"}'), 400
    return jsonify(res), 201

@HorarioBP.route('<horario_id>', methods=['DELETE'])
@flask_praetorian.auth_required
def delete_horarios(horario_id):
    try: 
        data = request.get_json()
        res = Horarios.objects(_id=horario_id).delete()
    except Exception as e:
        return jsonify('{"error": "Imposible actualizar el objeto"}'), 400
    return jsonify(res), 201

