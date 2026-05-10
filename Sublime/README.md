# Sublime - Sistema Integrado

Este proyecto incluye un backend Python (Flask) que usa la base de datos de `BD` para iniciar sesión y registrar usuarios.

## Pasos para ejecutar

1. Abrir terminal en `Sublime`.
2. Ejecutar `pip install -r requirements.txt`.
3. Ejecutar `python server.py`.
4. Abrir `http://localhost:3000/login/index.html`.

## Cuenta de prueba

- Correo: `admin@sublime.com`
- Contraseña: `admin123`

## Qué se integró

- `login/index.html` y `login/script.js` usan `POST /api/login` y `POST /api/register`.
- `admin-panel/index.html` verifica sesión, permite cerrar sesión y carga datos reales.
- `server.py` usa `BD/base.db` cuando existe y expone endpoints para el dashboard, inventario, clientes, facturas y ventas.
- Si `BD/base.db` no existe, el servidor construye una base de datos local en `data/sublime.db` desde `BD/roles.sql` y `BD/usuarios.sql`.
