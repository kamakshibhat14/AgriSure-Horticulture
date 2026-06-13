CREATE DATABASE horticulture_db;
USE horticulture_db;
SHOW TABLES;
CREATE TABLE farmer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    mobile VARCHAR(15) UNIQUE,
    aadhaar VARCHAR(20) UNIQUE,
    village VARCHAR(100),
    crop_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE subsidy (
    id INT PRIMARY KEY AUTO_INCREMENT,
    farmer_id INT,
    scheme_name VARCHAR(100),
    amount DECIMAL(10,2),
    sanctioned_date DATE,
    status VARCHAR(50),
    FOREIGN KEY (farmer_id) REFERENCES farmer(id)
);
INSERT INTO farmer (name, mobile, aadhaar, village, crop_type) VALUES
('Ramesh', '9876543210', '111122223333', 'Village A', 'Tomato'),
('Suresh', '9876543211', '111122223334', 'Village B', 'Potato'),
('Mahesh', '9876543212', '111122223335', 'Village C', 'Chilli');
INSERT INTO subsidy (farmer_id, scheme_name, amount, sanctioned_date, status) VALUES
(1, 'Drip Irrigation Scheme', 50000, '2018-06-15', 'PAID'),
(2, 'Greenhouse Scheme', 75000, '2022-08-20', 'PAID'),
(3, 'Fertilizer Subsidy', 30000, '2019-04-10', 'PAID');
SHOW TABLES;
