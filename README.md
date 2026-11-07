# Examen Final - Programación II | Versión 2

Proyecto completo con backend Spring Boot, frontend React + TypeScript y base de datos MySQL.

## Carpetas
- `backend`: API REST con Spring Boot.
- `frontend`: interfaz de reportes y exportación PDF/Excel.
- `database`: script original `finalB_ferreteria.sql`.

## Base de datos
1. Importar `database/finalB_ferreteria.sql` en MySQL.
2. La base se llama `finalB`.
3. Definir la contraseña local en la variable `SPRING_DATASOURCE_PASSWORD` de la terminal que arranca Spring Boot.

## Ejecutar backend
```bash
cd backend
./mvnw spring-boot:run
```
En Windows: `mvnw.cmd spring-boot:run`.

## Ejecutar frontend
```bash
cd frontend
npm ci
npm run dev
```
Abrir `http://localhost:5173/reportes`.

## Reportes
- Artículos activos filtrados por nombre.
- Artículos con categoría.
- Facturas por cliente.
- Detalle de facturas con total general.
- Ventas por categoría con total general (Serie II).
- Exportación PDF y Excel.

En Postman, importa Ferreteria.postman_collection.json y envía las cinco peticiones con el backend corriendo.

