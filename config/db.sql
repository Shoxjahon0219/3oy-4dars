-- Active: 1755252368807@@127.0.0.1@3306@power_tools

CREATE TABLE admin (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    is_creator BOOLEAN NOT NULL
);

CREATE TABLE tool (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tool_price DECIMAL(8, 2) NOT NULL
);

CREATE TABLE shop (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner_id INT NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    district_id INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES user (id),
    FOREIGN KEY (district_id) REFERENCES district (id)
);

CREATE TABLE shop_tool (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    shop_id INT NOT NULL,
    tool_id INT NOT NULL,
    rent_price DECIMAL(8, 2) NOT NULL,
    FOREIGN KEY (tool_id) REFERENCES tool (id),
    FOREIGN KEY (shop_id) REFERENCES shop (id)
);

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    shop_tool_id INT NOT NULL,
    order_date DATE DEFAULT (CURRENT_DATE),
    period INT NOT NULL,
    total_price DECIMAL(8, 2) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES user (id),
    FOREIGN KEY (shop_tool_id) REFERENCES shop_tool (id)
);

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    role VARCHAR(255) CHECK (role IN ('client', 'owner')) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE district (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO district (name) VALUES
('Tashkent'),
('Samarkand'),
('Bukhara');

INSERT INTO user (name, phone_number, email, password, is_active, role, address) VALUES
('Davron Mamatov', '+998901112233', 'davron@example.com', 'pass123', TRUE, 'client', 'Tashkent, Chilonzor'),
('Shakhzod Karimov', '+998902223344', 'shakhzod@example.com', 'pass456', TRUE, 'owner', 'Samarkand, Registan'),
('Malika Rustamova', '+998903334455', 'malika@example.com', 'pass789', FALSE, 'client', 'Bukhara, Center');

INSERT INTO admin (full_name, email, password, phone_number, is_active, is_creator) VALUES
('Admin One', 'admin1@example.com', 'adminpass1', '+998911111111', TRUE, TRUE),
('Admin Two', 'admin2@example.com', 'adminpass2', '+998922222222', TRUE, FALSE),
('Admin Three', 'admin3@example.com', 'adminpass3', '+998933333333', FALSE, FALSE);

INSERT INTO tool (name, brand, description, tool_price) VALUES
('Hammer', 'Bosch', 'Heavy duty hammer', 50.00),
('Electric Drill', 'Makita', 'Cordless drill 18V', 300.00),
('Wrench Set', 'DeWalt', 'Full set of wrenches', 120.00);

INSERT INTO shop (name, owner_id, phone_number, district_id, address, location) VALUES
('ToolRent Tashkent', 2, '+998944445555', 1, 'Chilonzor-5, Tashkent', '41.311081,69.240562'),
('Samarkand Tools', 2, '+998966667777', 2, 'Registan Square, Samarkand', '39.6542,66.9597'),
('Bukhara Rent', 2, '+998988889999', 3, 'Old Town, Bukhara', '39.7747,64.4286');

INSERT INTO shop_tool (shop_id, tool_id, rent_price) VALUES
(1, 1, 5.00),
(1, 2, 15.00),
(2, 3, 10.00),
(3, 1, 6.00);

INSERT INTO orders (client_id, shop_tool_id, order_date, period, total_price) VALUES
(1, 1, '2025-08-20', 5, 25.00),
(3, 2, '2025-08-21', 10, 150.00),
(1, 3, '2025-08-22', 7, 70.00),
(3, 4, '2025-08-23', 3, 18.00);

SHOW TABLES

SELECT * FROM user

desc user

ALTER TABLE