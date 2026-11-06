# Kano YSD MVC Platform

This project implements the Kano State Ministry of Youth, Sports and Development product requirements using plain PHP, object-oriented MVC architecture, and no framework.

## Project structure

- `app/Controllers` – HTTP entry points for public and portal actions
- `app/Core` – request, router, view, and database bootstrapping
- `app/Models` – domain model data for organizations, content, and certificates
- `views/` – HTML templates for public pages and portal screens
- `public/` – document root with the front controller and static assets
- `routes.php` – application route map
- `bootstrap.php` – class loader for the custom MVC application

## Run locally

Using the built-in PHP web server:

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/Kano-YSD
php -S 127.0.0.1:8000 -t public
```

Then open:

- http://127.0.0.1:8000/
- http://127.0.0.1:8000/directory
- http://127.0.0.1:8000/verify
- http://127.0.0.1:8000/portal/dashboard

## Notes

- The app keeps the public-facing site and management portal in the same application structure.
- The base database layer is PDO-ready and supports SQLite by default for local development and MySQL configuration for production.
- This is a starter MVC foundation based on the PRD and is ready to be expanded with real models, authentication, middleware, validation, and persisted data.
