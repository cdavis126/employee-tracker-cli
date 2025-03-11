-- Insert into departments table
INSERT INTO departments (department_name) VALUES
('Marketing'),
('Research & Development'),
('Legal'),
('Customer Support');

-- Insert into roles table
INSERT INTO roles (role_title, salary, department_id) VALUES
('Marketing Coordinator', 55000, 1),
('R&D Scientist', 95000, 2),
('Corporate Lawyer', 120000, 3),
('Customer Support Lead', 65000, 4);

-- Insert into employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Winston', 1, NULL),
('Robert', 'Chang', 2, 1),
('Samantha', 'Nguyen', 3, NULL),
('David', 'Lopez', 4, 3);
