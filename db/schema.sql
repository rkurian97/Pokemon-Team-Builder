DROP DATABASE IF EXISTS pokemon_db;
CREATE DATABASE pokemon_db;

USE pokemon_db;

CREATE TABLE users(
    id INTEGER NOT NULL,
    email VARCHAR(30),
    password VARCHAR(30),
    name VARCHAR(30)
)

C