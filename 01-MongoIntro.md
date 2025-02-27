# Instalación de MongoDB

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


Dejamos propuesto como ejercicio crear en la carpeta del stack un fichero **`.env`** donde almacenar las credenciales y usar este archivo tanto para el contenedor como para los scripts de Python que haremos después. Aunque nosotros para que funcione el proyecto lo estamos incluyendo en el proyecto, **recuerda que es muy mala idea incluir cualquier tipo de credenciales en un repositorio de software**.

Mongo organiza los documentos en bases de datos, las bases de datos en colecciones y las colecciones tienen documentos. Para entender mejor cómo funciona te presentamos esta tabla de equivalencias:

MySQL | MongoDB
------|-------
Base de datos | Base de Datos
Tablas | Colecciones
Filas o tuplas | Documentos

Sin colecciones no puedo tener bases de datos en Mongo. Siempre, como mínimo estará la colección "delete_me".


## Conexión interactiva a MongoDB

Aunque por lo general no usaremos MongoDB en modo interactivo, vamos a ver algunos ejemplos de cómo interactuar con la shell de mongo (mongosh):

![Ejemplo de conexión en modo interactivo.](docs/mongodbinteractivo.png)

1. **Iniciar el shell interactivo:**
   Abre tu terminal y ejecuta los siguientes comandos:
   1. `docker exec -ti stack-mongo_mongo_1 /bin/bash`: para abrir una terminal interactiva en el contenedor de nuestro servicio **mongo**.
   2. `mongosh -u root -p`: para ingresar al shell interactivo de MongoDB, la contraseña es *83uddjfp0cmMD*, como fijamos en el docker-compose.
   3. `use('GestionAcademica')`: desde la shell de mongo, indicamos qué base de datos queremos usar de esta manera.

2. **Crear un documento (Create):**
   Para insertar un nuevo documento en una colección llamada `alumnos`, puedes utilizar el siguiente comando:

   ```javascript
   db.alumnos.insertOne({ nombre: "Juan Perez", edad: 20, carrera: "Ingeniería Informática" })
   ```

3. **Leer documentos (Read):**
   Para recuperar todos los documentos de la colección `alumnos`, puedes usar el comando `find()`:

   ```javascript
   db.alumnos.find()
   ```

   Esto mostrará todos los documentos que representan a los alumnos.

4. **Actualizar un documento (Update):**
   Para actualizar un documento, puedes utilizar el comando `updateOne()`. Supongamos que Juan Pérez cambió su carrera a "Ingeniería Eléctrica":

   ```javascript
   db.alumnos.updateOne({ nombre: "Juan Perez" }, { $set: { carrera: "Ingeniería Eléctrica" } })
   ```

   Esto actualiza el documento de Juan Pérez con la nueva información sobre su carrera.

5. **Eliminar un documento (Delete):**
   Para eliminar un documento, puedes utilizar el comando `deleteOne()`. Supongamos que Juan Pérez ya no es alumno:

   ```javascript
   db.alumnos.deleteOne({ nombre: "Juan Perez" })
   ```
   
   Esto eliminará el documento que representa a Juan Pérez de la colección.

Recuerda, para buscar un objeto en una colección usamos el método find. Así el formato para consultar la colección `profesor` sería:

```javascript
db.profesor.find( { "nombre":"Juan"}).pretty();
```

Pero ¿y si quiero buscar profesore con asignaturas con más de 5 horas (inclusive)?

```javascript
db.profesor.find({ 
    asignaturas: 
        {
            $elemMatch: {
                    horas: { $gt: 4}
            }
        }
});
```

Tienes más ejemplos sobre la sintaxis de consulta en la Web de MongoDB: <https://www.mongodb.com/docs/manual/tutorial/query-documents/>.

## Colección de ejemplo

Vamos a utilizar una colección ficticia llamada `estudiantes` que contiene información sobre estudiantes en una universidad. Aquí tienes algunos documentos de ejemplo en esta colección:

```javascript
db.estudiantes.insertMany([
  { nombre: "Ana García", edad: 22, carrera: "Biología", semestre: 5, promedio: 8.5 },
  { nombre: "Carlos López", edad: 21, carrera: "Ingeniería Civil", semestre: 4, promedio: 7.2 },
  { nombre: "María Torres", edad: 20, carrera: "Psicología", semestre: 3, promedio: 9.0 },
  { nombre: "Juan Rodríguez", edad: 23, carrera: "Historia", semestre: 6, promedio: 7.8 },
  { nombre: "Elena Pérez", edad: 19, carrera: "Matemáticas", semestre: 2, promedio: 9.5 }
])
```

Ahora, puedes realizar diversas consultas utilizando el método `find()` de MongoDB. Aquí tienes algunos ejemplos:

1. **Recuperar todos los estudiantes:**
   ```javascript
   db.estudiantes.find({})
   ```

2. **Filtrar estudiantes por carrera:**
   ```javascript
   db.estudiantes.find({ carrera: "Biología" })
   ```

3. **Estudiantes mayores de 21 años:**
   ```javascript
   db.estudiantes.find({ edad: { $gt: 21 } })
   ```

4. **Estudiantes con promedio mayor o igual a 8.0:**
   ```javascript
   db.estudiantes.find({ promedio: { $gte: 8.0 } })
   ```

5. **Estudiantes de Psicología en el tercer semestre:**
   ```javascript
   db.estudiantes.find({ carrera: "Psicología", semestre: 3 })
   ```

6. **Ordenar estudiantes por promedio en orden descendente:**
   ```javascript
   db.estudiantes.find().sort({ promedio: -1 })
   ```

7. **Limitar la cantidad de resultados a 3:**
   ```javascript
   db.estudiantes.find().limit(3)
   ```

Estos son solo ejemplos básicos de consultas utilizando el método `find()` en MongoDB. La sintaxis puede variar según las necesidades específicas de tu aplicación, y MongoDB ofrece una amplia variedad de operadores y opciones para realizar consultas más avanzadas. Puedes consultar la documentación oficial de MongoDB para obtener más detalles sobre la sintaxis y los operadores de consulta: [MongoDB Query Documents](https://docs.mongodb.com/manual/tutorial/query-documents/).

\pagebreak


# Segundo ejemplo completo con MongoDB

Para abrir una terminal interactiva con el contenedor, lo podemos hacer desde el plugin correspondiente del IDE, desde las propias utilidades de Docker Desktop o bien desde terminal así:

```bash
docker exec -ti [nombre_contenedor_mongostack] /bin/bash
```

Ahora entramos en la shell de Mongo con:

```bash
mongosh -u root
```

Cuando nos pida la contraseña recuerda usar la que has puesto en el archivo `docker-compose.yml`.

A continuación vamos a revisar nuestro caso de reservas de pistas deportivas. Verás ejemplos de operaciones CRUD (Crear, Leer, Actualizar y Borrar) y algunas consultas útiles.

Nuestra base de datos sigue este esquema:

![Diagrama PlantUML](out/docs/diagrama/diagrama.png)

## 1. Modelo de Datos del Ejemplo

Para nuestro ejemplo, tenemos las siguientes entidades:

- **Instalaciones**: Datos de las pistas o instalaciones deportivas.
- **Horarios**: Disponibilidad de cada instalación. Cada horario lleva _embebida_ la información de la instalación (para tener un snapshot de la instalación cuando se crea el horario).
- **Usuarios**: Información de los usuarios que realizan reservas.
- **Reservas**: Cada reserva incluye:
  - La fecha de reserva.
  - Una referencia al usuario (no embebemos el usuario, sino que solo guardamos su `_id`).
  - El horario embebido, con la información del día, hora y la instalación.



## 2. Ejemplos de Operaciones CRUD

### 2.1. Seleccionar la Base de Datos

```js
use reservas_db;
```

### 2.2. Crear (Insertar Documentos)

#### Insertar una Instalación

Insertar una instalación nueva:

```js
db.instalaciones.insertOne({
  nombre: "Pista de Tenis",
  direccion: "Calle A 123",
  ciudad: "Madrid"
});
```

#### Insertar un Horario con la Instalación Embebida

Supongamos que ya tenemos la instalación insertada y conocemos su `_id` (por ejemplo, `ObjectId("60f1b2c3d4e5f67890123456")`):

```js
db.horarios.insertOne({
  dia: "2025-03-10",
  hora_inicio: "10:00",
  hora_fin: "11:00",
  instalacion: {
    _id: ObjectId("60f1b2c3d4e5f67890123456"),
    nombre: "Pista de Tenis",
    direccion: "Calle A 123"
  }
});
```

#### Insertar un Usuario

Insertar un Usuario:

```js
db.usuarios.insertOne({
  nombre: "Ana García",
  email: "ana.garcia@example.com"
});
```

#### Insertar una Reserva

Imaginemos que:

* El usuario insertado tiene `_id`: `ObjectId("60f1b2c3d4e5f67890123457")`
* El horario (con la instalación embebida) se usó para crear la reserva.

```js
db.reservas.insertOne({
  fecha_reserva: "2025-03-01",
  usuario_id: ObjectId("60f1b2c3d4e5f67890123457"),
  horario: {
    dia: "2025-03-10",
    hora_inicio: "10:00",
    hora_fin: "11:00",
    instalacion: {
      _id: ObjectId("60f1b2c3d4e5f67890123456"),
      nombre: "Pista de Tenis",
      direccion: "Calle A 123"
    }
  }
});
```



### 2.3. Leer (Consultas)

#### Consultar Todas las Instalaciones

Listar todas las Instalaciones

```js
db.instalaciones.find().pretty();
```

#### Buscar Horarios para un Día Específico

Buscar Horarios para un día específico:

```js
db.horarios.find({ dia: "2025-03-10" }).pretty();
```

#### Buscar Reservas de un Usuario Específico

Reservas de un Usuario específico (por ID):

```js
db.reservas.find({ usuario_id: ObjectId("60f1b2c3d4e5f67890123457") }).pretty();
```

#### Buscar Reservas para una Instalación

Reservas para una Instalación (usando **dot notation** en el horario):

```js
db.reservas.find({ "horario.instalacion.nombre": "Pista de Tenis" }).pretty();
```


### 2.4. Actualizar

#### Actualizar la Dirección de una Instalación

Actualizar la Dirección de una Instalación:

```js
db.instalaciones.updateOne(
  { _id: ObjectId("60f1b2c3d4e5f67890123456") },
  { $set: { direccion: "Calle Nueva 456" } }
);
```

> *Nota:* Si la dirección de la instalación cambia y se desea que las modificaciones se reflejen en los horarios o reservas, habría que actualizar esos documentos por separado. Esto es una de las consideraciones al embedir datos.

#### Actualizar el Horario Embebido en una Reserva

Por ejemplo, modificar la hora de inicio y fin de un horario dentro de una reserva:

```js
db.reservas.updateOne(
  { _id: ObjectId("60f1b2c3d4e5f67890123458") },
  { $set: { "horario.hora_inicio": "11:00", "horario.hora_fin": "12:00" } }
);
```



### 2.5. Borrar

#### Eliminar un Usuario

Eliminar un Usuario por ID:

```js
db.usuarios.deleteOne({ _id: ObjectId("60f1b2c3d4e5f67890123457") });
```

#### Eliminar una Reserva

Eliminar una reserva por ID:

```js
db.reservas.deleteOne({ _id: ObjectId("60f1b2c3d4e5f67890123458") });
```



## Objetos Embebidos vs. Objetos Anidados

### Objetos Embebidos

- **Definición:** Son documentos completos que se insertan directamente dentro de otro documento.  
- **Ventajas:**
  - **Lectura Rápida y Sencilla:** Al estar en un mismo documento, se evitan costosas operaciones de "join".
  - **Atomicidad:** Las operaciones de escritura en el documento completo son atómicas.
- **Desventajas:**
  - **Duplicación de Datos:** Si el objeto embebido es usado en varios documentos, se duplica la información.
  - **Actualizaciones Complejas:** Si la información embebida necesita actualizarse de forma global, se debe actualizar en cada documento donde aparezca.
- **Ejemplo en Nuestro Caso:**  
  En la colección `horarios` se embebe la información de la instalación. Esto es útil si el horario necesita conservar un snapshot de la instalación en el momento de creación, sin preocuparse por cambios futuros en la instalación.

\pagebreak


# Preparando la base de datos de nuestra aplicación

Hemos heredado una base de datos MySQL de un anterior proyecto que tenemos que adaptar al presente con MongoDB. Este ejercicio es muy interesante pues vamos a revisar desde cómo hacer la exportación de datos hasta cómo insertarlos y prepararlos para la nueva aplicación en MongoDB.

Nuestra base de datos en MySQL tiene el siguiente esquema:

![Esquema de la Base de Datos de Instalaciones Deportivas](./docs/esquemaBBDDDeporte.png)

Lo ideal sería no hacerlo de manera manual, sino desde un script de Pyhton que automatice esta tarea. De momento lo haremos manualmente para familiarizarnos con comandos útiles de la Mongo Shell para ir aprendiendo el lenguaje de consulta de Mongo.

## Exportar a JSON desde MySQL

MySQL permite exportar datos a JSON directamente gracias a la instrucción `SELECT JSON_OBJECT`: 

```sql
-- sintaxis básica: SELECT JSON_OBJECT([key1, value1, key2, value2, ...])
-- ejemplo de clave-valor sin usar tablas
SELECT 
  JSON_OBJECT(
    'name', 'John', 'age', 30
  ) result;
```

Esto dará como resultado lo siguiente:

```data
+-----------------------------+
| result                      |
+-----------------------------+
| {"age": 30, "name": "John"} |
+-----------------------------+
1 row in set (0.00 sec)
```

## Datos de la tabla instalaciones

Sea la tabla que almacena las instalaciones con esta estructura:

```sql
CREATE TABLE instalacion (
  id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre varchar(80) NOT NULL UNIQUE
);
```

Si conectamos a la base de datos MySQL y abrimos un terminal interactivo o bien desde `Adminer` ejecutamos esta sentencia SQL para extraer la información en formato JSON:

```sql
select JSON_OBJECT(
    'id', id, 
    'nombre', nombre)
    from instalacion;  
```

Esto da como resultado esto:

```data
{"id": 7, "nombre": "tenis arriba"}
{"id": 8, "nombre": "tenis césped artificial"}
{"id": 9, "nombre": "fútbol"}
{"id": 10, "nombre": "baloncesto"}
{"id": 11, "nombre": "squash"}
{"id": 13, "nombre": "sauna mujeres"}
{"id": 14, "nombre": "pista de pádel"}
{"id": 16, "nombre": "sauna caballeros"}
```

Para poder insertarlo en Mongo, tendremos que añadir una coma al final de cada línea y meterlo dentro de un array para hacer un `insertMany`:

```js
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
```

## Datos de la tabla horarios

Sea la tabla que almacena los horarios con esta estructura:

```sql
CREATE TABLE horario (
  hora_fin time(6) DEFAULT NULL,
  hora_inicio time(6) DEFAULT NULL,
  id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
  instalacion_id bigint DEFAULT NULL,
  FOREIGN KEY (instalacion_id) REFERENCES instalacion (id)
);
```

La consulta para extraer la información de esta tabla en JSON sería: 

```js
select JSON_OBJECT(
    'hora_fin', h.hora_fin,
    'hora_inicio',h.hora_inicio, 
    'id',h.id,
    'instalacion', JSON_OBJECT(
        'id', h.instalacion_id, 'nombre', i.nombre)
    ) 
    from instalacion i, horario h 
    where i.id=h.instalacion_id;
```

Para poder insertarlo en Mongo, tendremos que añadir una coma al final de cada línea de la salida de ese comando y meterlo dentro de un array para hacer un `insertMany`:

```js
db.instalaciones.insertMany([
...
]);
```

## Datos de la tabla usuarios

Sea la tabla que almacena los usuarios con esta estructura:

```sql
CREATE TABLE usuario (
  enabled bit(1) NOT NULL,
  id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(20) NOT NULL UNIQUE,
  email varchar(80) NOT NULL UNIQUE,
  password varchar(80) NOT NULL,
  tipo enum('ADMIN','OPERARIO','USUARIO') DEFAULT NULL
);
```

Para poder insertarlo en Mongo, tendremos que añadir una coma al final de cada línea de la salida de ese comando y meterlo dentro de un array para hacer un `insertMany`:

```js
db.instalaciones.insertMany([
...
]);
```

La consulta para extraer la información de esta tabla en JSON sería: 

```js
select JSON_OBJECT(
    'id', id,
    'username', username,
    'password', password,
    'email', email, 
    'enabled' ,(CASE WHEN enabled=1 THEN true ELSE false END) ,
    'tipo', tipo)
    from usuario;
```

Hemos tenido que usar el `CASE` porque el tipo "bit" no existe en Mongo (en un documento JSON), pero sí el Booleano, y así lo convertimos para evitar problemas.

Para poder insertarlo en Mongo, tendremos que añadir una coma al final de cada línea de la salida de ese comando y meterlo dentro de un array para hacer un `insertMany`:

```js
db.instalaciones.insertMany([
...
]);
```

## Datos de la tabla reservas

Sea la tabla que almacena las reservas con esta estructura:

```sql
CREATE TABLE reserva (
  fecha date DEFAULT NULL,
  horario_id bigint DEFAULT NULL,
  id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usuario_id bigint DEFAULT NULL,  
  FOREIGN KEY (horario_id) REFERENCES horario (id),
  FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);
```

La consulta para extraer la información de esta tabla en JSON sería: 

```js
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
```

Para poder insertarlo en Mongo, tendremos que añadir una coma al final de cada línea de la salida de ese comando y meterlo dentro de un array para hacer un `insertMany`:

```js
db.instalaciones.insertMany([
...
]);
```

## Arreglando los ID

En Mongo, los documentos se identifican de manera única con su ID que es un atributo del propio sistema cuya clave es `_id`. 

Ya no vamos a necesitar más los **id** heredados del **AUTOINCREMENT** de MySQL, por lo que usaremos **_id** a partir de ahora en la lógica de nuestra aplicación. 

Por esta razón necesitamos hacer algunas modificaciones a la base de datos para corregir el **id** antiguo por el moderno.

Ejemplo de cómo modificar las instalaciones de los horarios para que  contengan el "_id" que es el verdadero ID que hay que usar:

```js
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
```

> TO-DO: Optimizar con $lookup

Ejemplo de cómo actualizar las reservas con los horarios correctos (el ID de horario está ahora correcto) y los usuarios:

```js
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
```

Ejemplo de cómo elimnar los atributos **id** innecesarios ya, de MySQL en la colección instalaciones:

```js
/**
 * Como no necesitamos más los "ID" heredados de MySQL, los quitamos
 */
db.instalaciones.updateMany({}, {$unset: {id:1}});
```

Ejemplo de cómo elimnar los atributos **id** innecesarios ya, de MySQL en la colección reservas y sus objetos embebidos:

```js
/**
 * Hacemos lo mismo pero para las reservas y sus objetos embebidos.
 * Esto sería mejor haberlo hecho antes pero entonces no hacemos
 * este nuevo ejercicio de buscar y actualizar.
 */
db.reservas.updateMany(
    {}, 
    { $unset: { 
        'id': 1,
        'horario.id': 1, 
        'horario.instalacion.id':1,
        'usuario.id':1} });
```

Ejemplo de cómo elimnar los atributos **id** innecesarios ya, de MySQL en la colección usuarios:

```js
/**
 * Consulta para eliminar el atributo ID del usuario
 */
db.usuarios.updateMany({}, {$unset: {id:1}});
```

