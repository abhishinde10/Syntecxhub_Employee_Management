const EmployeeList = ({ employees, fetchEmployees, setEditingEmployee, loading, error }) => {

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

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
    return (
      <div className="empty-state">
        <p>No employees found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="employee-list">
      <h2>Employee Directory</h2>
      <div className="grid-container">
        {employees.map((emp) => (
          <div key={emp._id} className="employee-card">
            <div className="card-header">
              <h3>{emp.name}</h3>
              <span className="role-badge">{emp.role}</span>
            </div>
            <div className="card-body">
              <p className="salary">
                <span className="label">Salary:</span> 
                ${emp.salary.toLocaleString()}
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
