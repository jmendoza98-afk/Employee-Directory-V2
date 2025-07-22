import express from "express";
const app = express();
export default app;

import employees from "#db/employees";

const express = require('express');
const employeesRouter = require('./routes/employees'); // Import the employee router.

const app = express();
const PORT = process.env.PORT || 3000;

// Enable middleware to parse JSON request bodies.
app.use(express.json());

// Mount the employee router for all /employees routes.
app.use('/employees', employeesRouter);

// Catch-all error handling middleware.
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging.
    res.status(500).json({ message: 'Something went wrong!' }); // Send 500 status and generic error message.
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// routes/employees.js
const express = require('express');
const router = express.Router(); // Create a new router object.

const employees = []; // In-memory employee data store.

// POST /employees - Add a new employee.
router.post('/', (req, res) => {
    const { name } = req.body; // Extract name from request body.

    if (!name) {
        return res.status(400).json({ message: 'Name is required!' }); // Send 400 if name is missing.
    }

    const newEmployee = { id: employees.length + 1, name }; // Generate unique ID using array index.
    employees.push(newEmployee);

    res.status(201).json(newEmployee); // Send 201 with the new employee.
});

// GET /employees (for demonstration, showing how other routes would be defined)
router.get('/', (req, res) => {
    res.json(employees);
});

module.exports = router;
