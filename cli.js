import inquirer from 'inquirer';
import {
  fetchDepartments, insertDepartment, removeDepartment, getDepartmentBudget
} from './models/departments.js';
import { fetchRoles, insertRole, removeRole } from './models/roles.js';
import {
  fetchEmployees, insertEmployee, updateEmployeeRole, updateEmployeeManager, fetchEmployeesByManager, fetchEmployeesByDepartment, removeEmployee
} from './models/employees.js';

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View Employees by Manager',
        'View Employees by Department',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'View Total Utilized Budget by Department',
        'Exit'
      ]
    }
  ]);

  switch (action) {
    case 'View All Departments':
      console.table(await fetchDepartments());
      break;
    case 'View All Roles':
      console.table(await fetchRoles());
      break;
    case 'View All Employees':
      console.table(await fetchEmployees());
      break;
    case 'Add Department':
      const { departmentName } = await inquirer.prompt([
        { type: 'input', name: 'departmentName', message: 'What is the name of the department?' }
      ]);
      await insertDepartment(departmentName);
      console.log(`Added ${departmentName} to the database`);
      break;
    case 'Add Role':
      const { roleTitle, roleSalary, roleDeptId } = await inquirer.prompt([
        { type: 'input', name: 'roleTitle', message: 'What is the name of the role?' },
        { type: 'input', name: 'roleSalary', message: 'What is the salary of the role?' },
        { type: 'input', name: 'roleDeptId', message: 'Which department does the role belong to?' }
      ]);
      await insertRole(roleTitle, roleSalary, roleDeptId);
      console.log(`Added ${roleTitle} to the database`);
      break;
    case 'Add Employee':
      const { firstName, lastName, empRoleId, empManagerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'What is the employee\'s first name?' },
        { type: 'input', name: 'lastName', message: 'What is the employee\'s last name?' },
        { type: 'input', name: 'empRoleId', message: 'What is the employee\'s role ID?' },
        { type: 'input', name: 'empManagerId', message: 'What is the employee\'s manager ID?' }
      ]);
      await insertEmployee(firstName, lastName, empRoleId, empManagerId);
      console.log(`Added ${firstName} ${lastName} to the database`);
      break;
    case 'Update Employee Role':
      const { empId, newRoleId } = await inquirer.prompt([
        { type: 'input', name: 'empId', message: 'What is the employee\'s ID?' },
        { type: 'input', name: 'newRoleId', message: 'What is the new role ID?' }
      ]);
      await updateEmployeeRole(empId, newRoleId);
      console.log(`Updated employee's role`);
      break;
    case 'Update Employee Manager':
      const { empIdMgr, newManagerId } = await inquirer.prompt([
        { type: 'input', name: 'empIdMgr', message: 'What is the employee\'s ID?' },
        { type: 'input', name: 'newManagerId', message: 'What is the new manager\'s ID?' }
      ]);
      await updateEmployeeManager(empIdMgr, newManagerId);
      console.log(`Updated employee's manager`);
      break;
    case 'View Employees by Manager':
      const { managerId } = await inquirer.prompt([
        { type: 'input', name: 'managerId', message: 'What is the manager\'s ID?' }
      ]);
      console.table(await fetchEmployeesByManager(managerId));
      break;
    case 'View Employees by Department':
      const { departmentId } = await inquirer.prompt([
        { type: 'input', name: 'departmentId', message: 'What is the department\'s ID?' }
      ]);
      console.table(await fetchEmployeesByDepartment(departmentId));
      break;
    case 'Delete Department':
      const { deptIdToDelete } = await inquirer.prompt([
        { type: 'input', name: 'deptIdToDelete', message: 'What is the department\'s ID to delete?' }
      ]);
      await removeDepartment(deptIdToDelete);
      console.log(`Deleted department with ID ${deptIdToDelete}`);
      break;
    case 'Delete Role':
      const { roleIdToDelete } = await inquirer.prompt([
        { type: 'input', name: 'roleIdToDelete', message: 'What is the role\'s ID to delete?' }
      ]);
      await removeRole(roleIdToDelete);
      console.log(`Deleted role with ID ${roleIdToDelete}`);
      break;
    case 'Delete Employee':
      const { empIdToDelete } = await inquirer.prompt([
        { type: 'input', name: 'empIdToDelete', message: 'What is the employee\'s ID to delete?' }
      ]);
      await removeEmployee(empIdToDelete);
      console.log(`Deleted employee with ID ${empIdToDelete}`);
      break;
    case 'View Total Utilized Budget by Department':
      const { deptIdForBudget } = await inquirer.prompt([
        { type: 'input', name: 'deptIdForBudget', message: 'What is the department\'s ID to view its total budget?' }
      ]);
      console.log(`Total budget for department ID ${deptIdForBudget}: ${await getDepartmentBudget(deptIdForBudget)}`);
      break;
    case 'Exit':
      console.log('Exiting application');
      process.exit();
  }

  mainMenu();
};

mainMenu();
