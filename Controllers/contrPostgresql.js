const pool=require("../database/postgresql/conexion");

const getUsers = (request, response) => {
    pool.query('SELECT * FROM empleado ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error)
            throw error;
        }
        console.log(results)
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM empleado WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createUser = (request, response) => {
    const { usuario, correo } = request.body;

    pool.query(
        'INSERT INTO empleado (usuario, correo) VALUES ($1, $2) RETURNING *',
        [usuario, correo],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`);
        }
    );
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { usuario, correo } = request.body;

    pool.query(
        'UPDATE empleado SET usuario = $1, correo = $2 WHERE id = $3',
        [usuario, correo, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    );
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM empleado WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
