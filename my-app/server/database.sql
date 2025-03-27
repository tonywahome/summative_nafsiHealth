CREATE DATABASE healthcare_db;

USE healthcare_db;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('patient', 'practitioner', 'administrator') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    phone VARCHAR(20),
    address TEXT,
    medical_history TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE practitioners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    specialization VARCHAR(100),
    license_number VARCHAR(50),
    phone VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE administrators (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    department VARCHAR(100),
    phone VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id)
);