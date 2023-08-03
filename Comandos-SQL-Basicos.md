# Comandos básicos para trabajar con PostgreSQL en psql shell

Si estás utilizando PostgreSQL como tu base de datos, los comandos básicos para manejarte en el PostgreSQL shell (también conocido como psql) son similares a los comandos que mencioné anteriormente. A continuación, te presento los comandos básicos que te ayudarán a trabajar con PostgreSQL en el psql shell:

## Conexión a la base de datos

Para conectarte a una base de datos en PostgreSQL, utiliza el siguiente comando y proporciona el nombre de usuario y el nombre de la base de datos si es necesario:
   ```sql
psql -U nombre_usuario -d nombre_base_de_datos
   ```

## Ver bases de datos disponibles

Una vez conectado, puedes ver las bases de datos disponibles utilizando el siguiente comando:
   ```sql
\l
   ```

## Seleccionar una base de datos

Para seleccionar una base de datos específica con la que deseas trabajar, utiliza el siguiente comando:
   ```sql
\c nombre_base_de_datos
   ```
NOTA: este comando sirve para conectarse a cualquier base de datos, sin importar que ahora estés conectado a otra base de datos

## Ver tablas en la base de datos

Después de seleccionar una base de datos, puedes ver las tablas dentro de esa base de datos con el siguiente comando:
   ```sql
\dt
   ```

## Ejecutar una consulta SQL

Para realizar una consulta SQL y recuperar datos de una tabla, puedes usar la cláusula SELECT. Por ejemplo:
   ```sql
SELECT * FROM nombre_tabla;
   ```

## Insertar datos en una tabla

Para insertar datos en una tabla, utiliza la cláusula INSERT INTO. Por ejemplo:
   ```sql
INSERT INTO nombre_tabla (columna1, columna2, columna3) VALUES (valor1, valor2, valor3);
   ```

## Actualizar datos en una tabla

Para actualizar datos existentes en una tabla, utiliza la cláusula UPDATE. Por ejemplo:
   ```sql
UPDATE nombre_tabla SET columna1 = valor1, columna2 = valor2 WHERE condicion;
   ```

## Eliminar datos de una tabla

Para eliminar datos de una tabla, utiliza la cláusula DELETE. Por ejemplo:
   ```sql
DELETE FROM nombre_tabla WHERE condicion;
   ```

## Salir del psql shell

Para salir del psql shell y volver a la línea de comandos, puedes utilizar el siguiente comando:
   ```sql
\q
   ```
## OTROS COMANDOS
   ```sql
CREATE DATABASE nombre_base_de_datos;
   ```


