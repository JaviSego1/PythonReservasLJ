use deporte;

db.usuarios.insertMany([
{"id": 2, "roles": "OPERARIO", "email": "pepe@gmail.com", "is_active": true, "hashed_password": "$2a$10$zlD33q.JAxrRPsUGYGY7tedH/dQUn2MmlxQzjO7Y.oqK6rOjJdueq", "username": "pepe"},
{"id": 5, "roles": "ADMIN", "email": "admin@correo.com", "is_active": true, "hashed_password": "$2a$10$krlxeZI8Xm.n1fNz7v81Y.yzsHtoMoCnDCsStEAPeGkE9BUOBkwn2", "username": "admin"},
{"id": 7, "roles": "USUARIO", "email": "darkside@starwars.com", "is_active": true, "hashed_password": "$2a$10$.EJQbCFZtHW1pavBGmMkw.VxOn2or6AL2oPP.8RVvCSqXQA/zwUom", "username": "obijuan"},
{"id": 13, "roles": "ADMIN", "email": "gerencia@vdc.com", "is_active": true, "hashed_password": "$2a$10$hWkDEd0V0QgmiffgPcSkoe1.OMq5ew.wl7OFBMqii5XkfxtIwzZ92", "username": "gerente"}
]);

db.instalaciones.insertMany([
{"id": 7, "nombre": "tenis arriba"},
{"id": 8, "nombre": "tenis césped artificial"},
{"id": 9, "nombre": "fútbol"},
{"id": 10, "nombre": "baloncesto"},
{"id": 11, "nombre": "squash"},
{"id": 13, "nombre": "sauna mujeres"},
{"id": 14, "nombre": "pista de pádel"},
{"id": 16, "nombre": "sauna caballeros"}
]);

db.horarios.insertMany([
{"id": 1, "hora_fin": "09:00:00.000000", "hora_inicio": "08:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 2, "hora_fin": "10:00:00.000000", "hora_inicio": "09:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 3, "hora_fin": "11:00:00.000000", "hora_inicio": "10:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 4, "hora_fin": "12:00:00.000000", "hora_inicio": "11:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 5, "hora_fin": "13:00:00.000000", "hora_inicio": "12:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 6, "hora_fin": "14:00:00.000000", "hora_inicio": "13:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 7, "hora_fin": "15:00:00.000000", "hora_inicio": "14:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 8, "hora_fin": "16:00:00.000000", "hora_inicio": "15:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 9, "hora_fin": "17:00:00.000000", "hora_inicio": "16:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 10, "hora_fin": "18:00:00.000000", "hora_inicio": "17:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 11, "hora_fin": "19:00:00.000000", "hora_inicio": "18:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 12, "hora_fin": "20:00:00.000000", "hora_inicio": "19:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 13, "hora_fin": "21:00:00.000000", "hora_inicio": "20:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 14, "hora_fin": "22:00:00.000000", "hora_inicio": "21:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 15, "hora_fin": "23:00:00.000000", "hora_inicio": "22:00:00.000000", "instalacion": {"id": 7, "nombre": "tenis arriba"}},
{"id": 16, "hora_fin": "09:00:00.000000", "hora_inicio": "08:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 17, "hora_fin": "10:00:00.000000", "hora_inicio": "09:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 18, "hora_fin": "11:00:00.000000", "hora_inicio": "10:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 19, "hora_fin": "12:00:00.000000", "hora_inicio": "11:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 20, "hora_fin": "13:00:00.000000", "hora_inicio": "12:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 21, "hora_fin": "14:00:00.000000", "hora_inicio": "13:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 22, "hora_fin": "15:00:00.000000", "hora_inicio": "14:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 23, "hora_fin": "16:00:00.000000", "hora_inicio": "15:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 24, "hora_fin": "17:00:00.000000", "hora_inicio": "16:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 25, "hora_fin": "18:00:00.000000", "hora_inicio": "17:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 26, "hora_fin": "19:00:00.000000", "hora_inicio": "18:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 27, "hora_fin": "20:00:00.000000", "hora_inicio": "19:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 28, "hora_fin": "21:00:00.000000", "hora_inicio": "20:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 29, "hora_fin": "22:00:00.000000", "hora_inicio": "21:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 30, "hora_fin": "23:00:00.000000", "hora_inicio": "22:00:00.000000", "instalacion": {"id": 8, "nombre": "tenis césped artificial"}},
{"id": 31, "hora_fin": "09:30:00.000000", "hora_inicio": "08:00:00.000000", "instalacion": {"id": 9, "nombre": "fútbol"}},
{"id": 32, "hora_fin": "11:00:00.000000", "hora_inicio": "09:30:00.000000", "instalacion": {"id": 9, "nombre": "fútbol"}},
{"id": 33, "hora_fin": "12:30:00.000000", "hora_inicio": "11:00:00.000000", "instalacion": {"id": 9, "nombre": "fútbol"}},
{"id": 34, "hora_fin": "14:00:00.000000", "hora_inicio": "12:30:00.000000", "instalacion": {"id": 9, "nombre": "fútbol"}},
{"id": 35, "hora_fin": "15:30:00.000000", "hora_inicio": "14:00:00.000000", "instalacion": {"id": 9, "nombre": "fútbol"}},
{"id": 36, "hora_fin": "17:00:00.000000", "hora_inicio": "15:30:00.000000", "instalacion": {"id": 9, "nombre": "fútbol"}},
{"id": 37, "hora_fin": "18:30:00.000000", "hora_inicio": "17:00:00.000000", "instalacion": {"id": 9, "nombre": "fútbol"}},
{"id": 38, "hora_fin": "20:00:00.000000", "hora_inicio": "18:30:00.000000", "instalacion": {"id": 9, "nombre": "fútbol"}},
{"id": 39, "hora_fin": "21:30:00.000000", "hora_inicio": "20:00:00.000000", "instalacion": {"id": 9, "nombre": "fútbol"}},
{"id": 40, "hora_fin": "23:00:00.000000", "hora_inicio": "21:30:00.000000", "instalacion": {"id": 9, "nombre": "fútbol"}},
{"id": 41, "hora_fin": "00:30:00.000000", "hora_inicio": "23:00:00.000000", "instalacion": {"id": 9, "nombre": "fútbol"}},
{"id": 42, "hora_fin": "09:00:00.000000", "hora_inicio": "08:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 43, "hora_fin": "10:00:00.000000", "hora_inicio": "09:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 44, "hora_fin": "11:00:00.000000", "hora_inicio": "10:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 45, "hora_fin": "12:00:00.000000", "hora_inicio": "11:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 46, "hora_fin": "13:00:00.000000", "hora_inicio": "12:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 47, "hora_fin": "14:00:00.000000", "hora_inicio": "13:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 48, "hora_fin": "15:00:00.000000", "hora_inicio": "14:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 49, "hora_fin": "16:00:00.000000", "hora_inicio": "15:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 50, "hora_fin": "17:00:00.000000", "hora_inicio": "16:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 51, "hora_fin": "18:00:00.000000", "hora_inicio": "17:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 52, "hora_fin": "19:00:00.000000", "hora_inicio": "18:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 53, "hora_fin": "20:00:00.000000", "hora_inicio": "19:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 54, "hora_fin": "21:00:00.000000", "hora_inicio": "20:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 55, "hora_fin": "22:00:00.000000", "hora_inicio": "21:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 56, "hora_fin": "23:00:00.000000", "hora_inicio": "22:00:00.000000", "instalacion": {"id": 10, "nombre": "baloncesto"}},
{"id": 57, "hora_fin": "08:45:00.000000", "hora_inicio": "08:00:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 58, "hora_fin": "09:30:00.000000", "hora_inicio": "08:45:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 59, "hora_fin": "10:15:00.000000", "hora_inicio": "09:30:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 60, "hora_fin": "11:00:00.000000", "hora_inicio": "10:15:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 61, "hora_fin": "11:45:00.000000", "hora_inicio": "11:00:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 62, "hora_fin": "12:30:00.000000", "hora_inicio": "11:45:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 63, "hora_fin": "13:15:00.000000", "hora_inicio": "12:30:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 64, "hora_fin": "14:00:00.000000", "hora_inicio": "13:15:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 65, "hora_fin": "14:45:00.000000", "hora_inicio": "14:00:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 66, "hora_fin": "15:30:00.000000", "hora_inicio": "14:45:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 67, "hora_fin": "16:15:00.000000", "hora_inicio": "15:30:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 68, "hora_fin": "17:00:00.000000", "hora_inicio": "16:15:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 69, "hora_fin": "17:45:00.000000", "hora_inicio": "17:00:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 70, "hora_fin": "18:30:00.000000", "hora_inicio": "17:45:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 71, "hora_fin": "19:15:00.000000", "hora_inicio": "18:30:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 72, "hora_fin": "20:00:00.000000", "hora_inicio": "19:15:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 73, "hora_fin": "20:45:00.000000", "hora_inicio": "20:00:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 74, "hora_fin": "21:30:00.000000", "hora_inicio": "20:45:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 75, "hora_fin": "22:15:00.000000", "hora_inicio": "21:30:00.000000", "instalacion": {"id": 11, "nombre": "squash"}},
{"id": 103, "hora_fin": "09:30:00.000000", "hora_inicio": "09:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 104, "hora_fin": "10:00:00.000000", "hora_inicio": "09:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 105, "hora_fin": "10:30:00.000000", "hora_inicio": "10:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 106, "hora_fin": "11:00:00.000000", "hora_inicio": "10:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 107, "hora_fin": "11:30:00.000000", "hora_inicio": "11:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 108, "hora_fin": "12:00:00.000000", "hora_inicio": "11:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 109, "hora_fin": "12:30:00.000000", "hora_inicio": "12:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 110, "hora_fin": "13:00:00.000000", "hora_inicio": "12:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 111, "hora_fin": "13:30:00.000000", "hora_inicio": "13:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 112, "hora_fin": "14:00:00.000000", "hora_inicio": "13:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 113, "hora_fin": "14:30:00.000000", "hora_inicio": "14:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 114, "hora_fin": "15:00:00.000000", "hora_inicio": "14:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 115, "hora_fin": "15:30:00.000000", "hora_inicio": "15:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 116, "hora_fin": "16:00:00.000000", "hora_inicio": "15:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 117, "hora_fin": "16:30:00.000000", "hora_inicio": "16:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 118, "hora_fin": "17:00:00.000000", "hora_inicio": "16:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 119, "hora_fin": "17:30:00.000000", "hora_inicio": "17:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 120, "hora_fin": "18:00:00.000000", "hora_inicio": "17:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 121, "hora_fin": "18:30:00.000000", "hora_inicio": "18:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 122, "hora_fin": "19:00:00.000000", "hora_inicio": "18:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 123, "hora_fin": "19:30:00.000000", "hora_inicio": "19:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 124, "hora_fin": "20:00:00.000000", "hora_inicio": "19:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 125, "hora_fin": "20:30:00.000000", "hora_inicio": "20:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 126, "hora_fin": "21:00:00.000000", "hora_inicio": "20:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 127, "hora_fin": "21:30:00.000000", "hora_inicio": "21:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 128, "hora_fin": "22:00:00.000000", "hora_inicio": "21:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 129, "hora_fin": "22:30:00.000000", "hora_inicio": "22:00:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}},
{"id": 130, "hora_fin": "09:30:00.000000", "hora_inicio": "08:00:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}},
{"id": 131, "hora_fin": "11:00:00.000000", "hora_inicio": "09:30:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}},
{"id": 132, "hora_fin": "12:30:00.000000", "hora_inicio": "11:00:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}},
{"id": 133, "hora_fin": "14:00:00.000000", "hora_inicio": "12:30:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}},
{"id": 134, "hora_fin": "15:30:00.000000", "hora_inicio": "14:00:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}},
{"id": 135, "hora_fin": "17:00:00.000000", "hora_inicio": "15:30:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}},
{"id": 136, "hora_fin": "18:30:00.000000", "hora_inicio": "17:00:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}},
{"id": 137, "hora_fin": "20:00:00.000000", "hora_inicio": "18:30:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}},
{"id": 138, "hora_fin": "21:30:00.000000", "hora_inicio": "20:00:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}},
{"id": 139, "hora_fin": "23:00:00.000000", "hora_inicio": "21:30:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}},
{"id": 140, "hora_fin": "00:30:00.000000", "hora_inicio": "23:00:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}}])


db.reservas.insertMany([{"fecha": "2019-10-12", "horario": {"id": 130, "hora_fin": "09:30:00.000000", "hora_inicio": "08:00:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}}, "usuario": {"id": 2, "roles": "OPERARIO", "email": "pepe@gmail.com", "is_active": true, "username": "pepe"}},
{"fecha": "2019-10-13", "horario": {"id": 130, "hora_fin": "09:30:00.000000", "hora_inicio": "08:00:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}}, "usuario": {"id": 2, "roles": "OPERARIO", "email": "pepe@gmail.com", "is_active": true, "username": "pepe"}},
{"fecha": "2019-11-11", "horario": {"id": 120, "hora_fin": "18:00:00.000000", "hora_inicio": "17:30:00.000000", "instalacion": {"id": 13, "nombre": "sauna mujeres"}}, "usuario": {"id": 7, "roles": "USUARIO", "email": "darkside@starwars.com", "is_active": true, "username": "obijuan"}},
{"fecha": "2019-11-21", "horario": {"id": 130, "hora_fin": "09:30:00.000000", "hora_inicio": "08:00:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}}, "usuario": {"id": 7, "roles": "USUARIO", "email": "darkside@starwars.com", "is_active": true, "username": "obijuan"}},
{"fecha": "2025-02-11", "horario": {"id": 130, "hora_fin": "09:30:00.000000", "hora_inicio": "08:00:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}}, "usuario": {"id": 5, "roles": "ADMIN", "email": "admin@correo.com", "is_active": true, "username": "admin"}},
{"fecha": "2025-02-12", "horario": {"id": 131, "hora_fin": "11:00:00.000000", "hora_inicio": "09:30:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}}, "usuario": {"id": 5, "roles": "ADMIN", "email": "admin@correo.com", "is_active": true, "username": "admin"}},
{"fecha": "2025-02-13", "horario": {"id": 132, "hora_fin": "12:30:00.000000", "hora_inicio": "11:00:00.000000", "instalacion": {"id": 14, "nombre": "pista de pádel"}}, "usuario": {"id": 5, "roles": "ADMIN", "email": "admin@correo.com", "is_active": true, "username": "admin"}}]);


/**
 * Esta función, actualiza las instalaciones de los horarios para que
 * contengan el "_id" que es el verdadero ID que hay que usar.
 * TO-DO: Optimizar con $lookup
 */
db.horarios.find().forEach(
    function(horario){
       horario.instalacion=db.instalaciones.findOne(
            {"id":horario.instalacion.id});
       db.horarios.updateOne(
            { id: horario.id }, 
            { $set: { instalacion: horario.instalacion } });
    });
        
/**
 * Esta función actualiza las reservas con los horarios correctos (el
 * ID de horario está ahora correcto) y los usuarios.
 * TO-DO: Optimizar con $lookup
 */

db.reservas.find().forEach(
    (reserva) => {
        // si ya hicimos la actualización anterior sólo horario
        // si no, también habría que hacer instalación.
        reserva.horario = db.horarios.findOne(
            {"id": reserva.horario.id});
        reserva.usuario = db.usuarios.findOne(
                {"id": reserva.usuario.id});
        db.reservas.updateOne(
                { _id: reserva._id }, 
                { $set: { 
                    usuario: reserva.usuario, 
                    horario: reserva.horario } });
    });

/**
 * Como no necesitamos más los "ID" heredados de MySQL, los quitamos
 */
db.instalaciones.updateMany({}, {$unset: {id:1}});

/**
 * Hacemos lo mismo pero para las reservas y sus objetos embebidos.
 * Esto sería mejor haberlo hecho antes pero entonces no hacemos
 * este nuevo ejercicio de buscar y actualizar.
 */
db.reservas.updateMany(
    {}, 
    { $unset: { 
        'horario.id': 1, 
        'horario.instalacion.id':1,
        'usuario.id':1} });

/**
 * Consulta para eliminar el atributo ID del usuario
 */
db.usuarios.updateMany({}, {$unset: {id:1}});


/**
 * Consulta para eliminar el atributo ID de las instalaciones de los horarios
 */
db.horarios.updateMany(
    {}, 
    { $unset: {         
        'instalacion.id':1
    }});