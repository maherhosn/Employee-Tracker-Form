-- Create the table schemas here

-- As the image illustrates, your schema should contain the following three tables:

DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

\c employee_tracker;

-- ===============================================
-- DEPARTMENT:
-- id: SERIAL PRIMARY KEY
-- name: VARCHAR(30) UNIQUE NOT NULL to hold department name
-- =====================================
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

-- =====================================
-- ROLE:
-- id: SERIAL PRIMARY KEY
-- title: VARCHAR(30) UNIQUE NOT NULL to hold role title
-- salary: DECIMAL NOT NULL to hold role salary
-- department_id: INTEGER NOT NULL to hold reference to department role belongs to
-- ==============================================
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id)  REFERENCES department(id)
);

-- ==============================================
-- EMPLOYEE
-- id: SERIAL PRIMARY KEY
-- first_name: VARCHAR(30) NOT NULL to hold employee first name
-- last_name: VARCHAR(30) NOT NULL to hold employee last name
-- role_id: INTEGER NOT NULL to hold reference to employee role
-- manager_id: INTEGER to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
-- ==============================================
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER REFERENCES employee(id) ON DELETE SET NULL,
  FOREIGN KEY (role_id)  REFERENCES role(id)
);