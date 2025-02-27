select JSON_OBJECT(
    'id', id,
    'username', username,
    'password', password,
    'email', email, 
    'enabled' ,(CASE WHEN enabled=1 THEN true ELSE false END) ,
    'tipo', tipo)
    from usuario;
    
select JSON_OBJECT(
    'id', id, 
    'nombre', nombre)
    from instalacion;  

select JSON_OBJECT(
    'hora_fin', h.hora_fin,
    'hora_inicio',h.hora_inicio, 
    'id',h.id,
    'instalacion', JSON_OBJECT(
        'id', h.instalacion_id, 'nombre', i.nombre)
    ) 
    from instalacion i, horario h 
    where i.id=h.instalacion_id;


SELECT i.nombre, h.hora_inicio, r.fecha, u.username, u.email
FROM reserva r
INNER JOIN horario h ON h.id = r.horario_id
INNER JOIN instalacion i ON i.id = h.instalacion_id
INNER JOIN usuario u ON u.id = r.usuario_id;


SELECT JSON_OBJECT(
    'horario', JSON_OBJECT(
        'hora_fin', h.hora_fin,
        'hora_inicio',h.hora_inicio, 
        'id',h.id,
        'instalacion', JSON_OBJECT(
            'id', h.instalacion_id, 'nombre', i.nombre) ),  
    'fecha', fecha,
    'usuario', JSON_OBJECT(
        'id', usuario_id,
        'username', username,
        'email', email, 
        'enabled' ,(CASE WHEN enabled=1 THEN true ELSE false END) ,
        'tipo', tipo))
FROM reserva r
INNER JOIN horario h ON h.id = r.horario_id
INNER JOIN instalacion i ON i.id = h.instalacion_id
INNER JOIN usuario u ON u.id = r.usuario_id;


