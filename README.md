# 💻 Backend Project | HardTech - e-commerce 
This project has been created as a backend that generates an API for this [frontend](https://github.com/radikalex/e-commerce-React) to use. This project started from a fork of a [previous project](https://github.com/Fede-Arevalo/Proyecto-Backend).

## 🚧 Made a REST API for the following: 
- User registration using Bcrypt.
- User login + token + middleware.
- CRUD of the endpoints.
- "Many to Many" and other "One to Many" database relationships.
- Use of seeders.

## 👥 Pair Programming 
For collaboration in Pair Programming we use branches with GitHub, making commits in each evolution of the project.

## 🦾 Used technology 
- MySql2 with Sequelize and Express
- Multer
- Bcrypt + JWT
- Express Validator
- Cors
- Nodemon (Dev Dependency)
- Postman
- Workbench
- VsCode
- Git / GitHub

# 📋 Pre requirements

1 - In order to start the project first make a clone:

> git clone https://github.com/Fede-Arevalo/Proyecto-Backend.git

2 - Once the project is cloned, you must install the necessary modules with npm:
> npm install

3 - You should rename the "config-example.json" file to "config.json" 
> Then edit the "development" fields with your "name", "password", "db name" and "secret word".

4 - Create Database
> sequelize db:create

5 - Database Migration
> sequelize db:migrate

6 - Running the Seeder
> sequelize db:seed:all

7 - The project is ready to start
> npm start


Pair Programing by [Alex Jiménez](https://github.com/radikalex) & [Daniel Miguelez](https://github.com/DanielMiguelez).
