import dbPool from '../db/connections.js'; 

export const fetchAllDepartments = async () => {  // making sure all deots are fetched
  const result = await dbPool.query('SELECT * FROM department');
  return result.rows;
};

export const createDepartment = async (deptName) => {  // working on creating a new department
  const result = await dbPool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [deptName]);
  return result.rows[0];
};

export const removeDepartment = async (deptId) => {  // removing a department
  const result = await dbPool.query('DELETE FROM department WHERE id = $1 RETURNING *', [deptId]);
  return result.rows[0];
};

export const calculateDepartmentBudget = async (deptId) => {  // dept budget
  const result = await dbPool.query(
    'SELECT SUM(role.salary) as total_budget FROM employee JOIN role ON employee.role_id = role.id WHERE role.department_id = $1',
    [deptId]
  );
  return result.rows[0].total_budget;
};
