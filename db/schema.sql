-- Create departments table
CREATE TABLE departments (  
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(30) UNIQUE NOT NULL  
);

-- Create roles table
CREATE TABLE roles ( 
  id SERIAL PRIMARY KEY,
  role_title VARCHAR(30) UNIQUE NOT NULL,  
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- Create employees table
CREATE TABLE employees (  
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
  FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);
