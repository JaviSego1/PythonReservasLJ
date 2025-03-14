from flask import Blueprint
from flask import jsonify, request
import flask_praetorian
from bson import ObjectId
from datetime import datetime
from modelos.Horarios import Horarios
from modelos.Instalaciones import Instalaciones

HorarioBP = Blueprint('horarios', __name__, url_prefix='/api/horario')

@HorarioBP.route('', methods=['GET'])
@flask_praetorian.auth_required
def get_all_horarios():
    try: 
        output = Horarios.objects().to_json()
        return output, 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Imposible procesar la petición"}), 500

@HorarioBP.route('<horario_id>', methods=['GET'])
@flask_praetorian.auth_required
def get_one_horario(horario_id):
    try: 
        horario = Horarios.objects(_id=ObjectId(horario_id)).first()
        if not horario:
            return jsonify({"error": "Horario no encontrado"}), 404
        return horario.to_json(), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Imposible procesar la petición"}), 404

@HorarioBP.route('', methods=['POST'])
@flask_praetorian.auth_required
def save_horarios():
    try: 
        data = request.get_json()

        if not all(key in data for key in ['hora_inicio', 'hora_fin', 'instalacion']):
            return jsonify({"error": "Faltan campos obligatorios"}), 400

        try:
            data['hora_inicio'] = datetime.fromisoformat(data['hora_inicio'])
            data['hora_fin'] = datetime.fromisoformat(data['hora_fin'])
        except ValueError:
            return jsonify({"error": "Formato de fecha inválido"}), 400

        if not Instalaciones.objects(_id=ObjectId(data['instalacion']['_id'])).first():
            return jsonify({"error": "Instalación no encontrada"}), 404

        horario = Horarios(
            hora_inicio=data['hora_inicio'],
            hora_fin=data['hora_fin'],
            instalacion=ObjectId(data['instalacion']['_id'])
        )
        horario.save()

        return horario.to_json(), 201
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

@HorarioBP.route('<horario_id>', methods=['PUT'])
@flask_praetorian.auth_required
def update_horarios(horario_id):
    try: 
        data = request.get_json()

        horario = Horarios.objects(_id=ObjectId(horario_id)).first()
        if not horario:
            return jsonify({"error": "Horario no encontrado"}), 404

        if 'hora_inicio' in data:
            try:
                horario.hora_inicio = datetime.fromisoformat(data['hora_inicio'])
            except ValueError:
                return jsonify({"error": "Formato de fecha inválido para hora_inicio"}), 400

        if 'hora_fin' in data:
            try:
                horario.hora_fin = datetime.fromisoformat(data['hora_fin'])
            except ValueError:
                return jsonify({"error": "Formato de fecha inválido para hora_fin"}), 400

        if 'instalacion' in data:
            if not Instalaciones.objects(_id=ObjectId(data['instalacion']['_id'])).first():
                return jsonify({"error": "Instalación no encontrada"}), 404
            horario.instalacion = ObjectId(data['instalacion']['_id'])

        horario.save()
        return horario.to_json(), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

@HorarioBP.route('<horario_id>', methods=['DELETE'])
@flask_praetorian.auth_required
def delete_horarios(horario_id):
    try: 
        res = Horarios.objects(_id=horario_id).delete()
        return jsonify({"eliminados": res}), 200  # Cambiar código de estado a 200
    except Exception as e:
        return jsonify({"error": "Imposible eliminar el objeto"}), 400