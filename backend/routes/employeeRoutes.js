import express from 'express';
import Employee from '../models/Employee.js';

const router = express.Router();

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching employees' });
  }
});

// @desc    Add new employee
// @route   POST /api/employees
// @access  Public
router.post('/', async (req, res) => {
  const { name, role, salary } = req.body;

  if (!name || !role || salary === undefined) {
    return res.status(400).json({ message: 'Please provide name, role, and salary' });
  }

  if (isNaN(salary) || Number(salary) < 0) {
    return res.status(400).json({ message: 'Salary must be a valid positive number' });
  }

  try {
    const employee = await Employee.create({
      name,
      role,
      salary: Number(salary),
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Public
router.put('/:id', async (req, res) => {
  const { name, role, salary } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (salary !== undefined && (isNaN(salary) || Number(salary) < 0)) {
      return res.status(400).json({ message: 'Salary must be a valid positive number' });
    }

    employee.name = name || employee.name;
    employee.role = role || employee.role;
    employee.salary = salary !== undefined ? Number(salary) : employee.salary;

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    // Check if error is due to invalid MongoDB ID
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Employee not found (Invalid ID format)' });
    }
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.deleteOne();
    res.json({ message: 'Employee removed successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Employee not found (Invalid ID format)' });
    }
    res.status(500).json({ message: 'Server Error deleting employee' });
  }
});

export default router;
