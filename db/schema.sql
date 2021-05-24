DROP DATABASE IF EXISTS pokemon_db;
CREATE DATABASE pokemon_db;

USE pokemon_db;

CREATE TABLE users(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30),
    lastname VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(30),
    name VARCHAR(30)
)

CREATE TABLE pokemon(
    userid INTEGER NOT NULL,
    pokemon VARCHAR(30),

    PRIMARY KEY(userid, pokemon)
    FOREIGN KEY (userid)
    REFERENCES users(id)
)