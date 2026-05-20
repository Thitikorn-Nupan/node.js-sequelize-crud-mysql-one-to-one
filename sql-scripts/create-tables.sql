-- SQL Script to create Employee and Login tables (One-to-One relationship)
-- Database: MySQL
-- Created for Node.js CRUD One-to-One Concept

-- Create employees table
CREATE TABLE IF NOT EXISTS employees_4 (
    eid INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(255),
    age INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create login_employees table
CREATE TABLE IF NOT EXISTS login_employees_4 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    password VARCHAR(255),
    eid INT NOT NULL,
    FOREIGN KEY (eid) REFERENCES employees_4(eid) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE KEY unique_employee_login (eid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional)
-- INSERT INTO employees (fullname, age) VALUES ('John Doe', 30);
-- INSERT INTO login_employees (email, password, eid) VALUES ('john@example.com', 'password123', 1);

