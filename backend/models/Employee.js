import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide an employee name'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please provide an employee role'],
      trim: true,
    },
    salary: {
      type: Number,
      required: [true, 'Please provide an employee salary'],
      min: [0, 'Salary must be a positive number'],
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
