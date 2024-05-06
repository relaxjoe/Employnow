// Import required modules
const connection = require("./config/connection");
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
require('dotenv').config();
const consoleTable = require('console.table');
const chalk = require('chalk');

// Async function to establish a connection to the database
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        console.log('Connected to the database successfully.');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

// Main menu prompt
async function promptUser(connection) {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    switch (choice) {
        case 'View all departments':
            await viewDepartments(connection);
            break;
        case 'View all roles':
            await viewRoles(connection);
            break;
        case 'View all employees':
            await viewEmployees(connection);
            break;
        case 'Add a department':
            await addDepartment(connection);
            break;
        case 'Add a role':
            await addRole(connection);
            break;
        case 'Add an employee':
            await addEmployee(connection);
            break;
        case 'Update an employee role':
            await updateEmployeeRole(connection);
            break;
        case 'Exit':
            console.log('Goodbye!');
            return; // This ensures a graceful shutdown without calling process.exit()
    }

    // Re-prompt after action completion
    await promptUser(connection);
}

// View all departments
async function viewDepartments(connection) {
    try {
        const [rows] = await connection.execute('SELECT * FROM departments');
        console.table(rows);
    } catch (error) {
        console.error('Error fetching departments:', error.message);
    }
}

// View all roles
async function viewRoles(connection) {
    try {
        const [rows] = await connection.execute('SELECT * FROM roles');
        console.table(rows);
    } catch (error) {
        console.error('Error fetching roles:', error.message);
    }
}

// View all employees
async function viewEmployees(connection) {
    try {
        const [rows] = await connection.execute('SELECT * FROM employees');
        console.table(rows);
    } catch (error) {
        console.error('Error fetching employees:', error.message);
    }
}

// Add a department
async function addDepartment(connection) {
    const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?',
    });

    try {
        await connection.execute('INSERT INTO department (name) VALUES (?)', [departmentName]);
        console.log(`Added ${departmentName} to the database`);
    } catch (error) {
        console.error('Error adding department:', error.message);
    }
}

// Add a role
async function addRole(connection) {
    const { title, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department ID?',
        }
    ]);

    try {
        await connection.execute('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
        console.log(`Added ${title} role to the database`);
    } catch (error) {
        console.error('Error adding role:', error.message);
    }
}

// Add an employee
async function addEmployee(connection) {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?',
        },
       
            {
              type: 'input',
              name: 'lastName',
              message: 'What is the last name of the employee?',
          },
          {
              type: 'input',
              name: 'roleId',
              message: 'What is the role ID?',
          },
          {
              type: 'input',
              name: 'managerId',
              message: 'What is the manager ID (leave blank if none)?',
              default: null // Allows for a null value if no manager is specified
          }
      ]);
  
      try {
          await connection.execute('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
          console.log(`Added ${firstName} ${lastName} to the database`);
      } catch (error) {
          console.error('Error adding employee:', error.message);
      }
  }
  
  // Update an employee role
  async function updateEmployeeRole(connection) {
      const { employeeId, newRoleId } = await inquirer.prompt([
          {
              type: 'input',
              name: 'employeeId',
              message: 'What is the ID of the employee?',
          },
          {
              type: 'input',
              name: 'newRoleId',
              message: 'What is the new role ID?',
          }
      ]);
  
      try {
          await connection.execute('UPDATE employees SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
          console.log(`Updated employee's role in the database`);
      } catch (error) {
          console.error('Error updating employee role:', error.message);
      }
  }
  
  // Main function to start the application
  async function main() {
      try {
          const connection = await connectToDatabase();
          await promptUser(connection);
          await connection.end(); // Ensure the connection is closed gracefully at the end
      } catch (error) {
          console.error('Application encountered an error:', error.message);
      }
  }
  
  // Execute the main function
  main().catch(console.error);
  