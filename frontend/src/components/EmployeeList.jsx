import './EmployeeList.css';

const EmployeeList = ({ employees, fetchEmployees, setEditingEmployee, loading, error }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete employee');
      }

      fetchEmployees();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="loading-state">Loading employees...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (employees.length === 0) {
    return <p className="empty-state">No employees found</p>;
  }

  return (
    <div className="employee-list">
      <h2>Employee Directory</h2>
      <div className="grid-container">
        {employees.map((emp) => (
          <div key={emp._id} className="employee-card">
            <div className="card-header">
              <div className="avatar">{getInitials(emp.name)}</div>
              <div className="header-info">
                <h3>{emp.name}</h3>
                <span className="role-badge">{emp.role}</span>
              </div>
            </div>
            <div className="card-body">
              <p className="salary">
                <span className="label">Salary</span> 
                <span className="salary-amount">${emp.salary.toLocaleString()}</span>
              </p>
            </div>
            <div className="card-actions">
              <button 
                className="btn-edit" 
                onClick={() => setEditingEmployee(emp)}
              >
                Edit
              </button>
              <button 
                className="btn-delete" 
                onClick={() => handleDelete(emp._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
