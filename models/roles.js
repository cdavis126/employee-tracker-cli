import dbPool from '../db/connections.js'; // updating file path

export const fetchRoles = async () => {  // grabbing all roles
  const result = await dbPool.query('SELECT * FROM role');
  return result.rows;
};

export const insertRole = async (title, salary, departmentId) => {  // adding a new role
  const result = await dbPool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
    [title, salary, departmentId]
  );
  return result.rows[0];
};

export const removeRole = async (roleId) => {  // removing a role functionality
  const result = await dbPool.query(
    'DELETE FROM role WHERE id = $1 RETURNING *',
    [roleId]
  );
  return result.rows[0];
};
