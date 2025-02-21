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
