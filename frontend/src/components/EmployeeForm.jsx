import { useState, useEffect } from 'react';
import './EmployeeForm.css'; // Optional: if you want specific component styles, or we can use App.css

const EmployeeForm = ({ fetchEmployees, editingEmployee, setEditingEmployee }) => {
  const [formData, setFormData] = useState({ name: '', role: '', salary: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name,
        role: editingEmployee.role,
        salary: editingEmployee.salary,
      });
    } else {
      setFormData({ name: '', role: '', salary: '' });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name || !formData.role || formData.salary === '') {
      return setError('All fields are required');
    }

    if (isNaN(formData.salary) || Number(formData.salary) < 0) {
      return setError('Salary must be a positive number');
    }

    setLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const url = editingEmployee 
      ? `${apiUrl}/api/employees/${editingEmployee._id}` 
      : `${apiUrl}/api/employees`;

    const method = editingEmployee ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          role: formData.role,
          salary: Number(formData.salary),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setFormData({ name: '', role: '', salary: '' });
      setEditingEmployee(null); // Reset edit mode
      fetchEmployees(); // Refresh list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Job Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Software Engineer"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary ($)</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. 75000"
            min="0"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (editingEmployee ? 'Update Employee' : 'Add Employee')}
          </button>
          {editingEmployee && (
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => {
                setEditingEmployee(null);
                setFormData({ name: '', role: '', salary: '' });
                setError(null);
              }}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
