INSERT INTO departments(name) VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles(title, salary, department_id) VALUES
("Sales Lead", "100000", 1),
("Salesperson", "80000", 1),
("Lead Engineer", "150000", 2),
("Software Engineer", "120000", 2),
("Accountant", "125000", 3),
("Legal Team Lead", "250000", 4),
("Lawyer", "190000", 4);

INSERT INTO employees(first_name, last_name, role_id) VALUES
("John", "Doe", 1),
("Mike", "Chan", 2),
("Ashley", "Rodriguez", 3),
("Kevin", "Tupik", 4),
("Kunal", "Singh", 5),
("Malia", "Brown", 6),
("Sarah", "Lourd", 7);


UPDATE employees SET manager_id = 1 WHERE id = 2;
UPDATE employees SET manager_id = 3 WHERE id = 4;
UPDATE employees SET manager_id = 5 WHERE id = 6;
// The following line should be adjusted or removed based on your actual employee IDs
// UPDATE employees SET manager_id = 7 WHERE id = 8; // Remove or adjust this line

