import { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/employees`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Employee Management System</h1>
      </header>
      
      <main className="main-content">
        <section className="form-section">
          <EmployeeForm 
            fetchEmployees={fetchEmployees} 
            editingEmployee={editingEmployee}
            setEditingEmployee={setEditingEmployee}
          />
        </section>
        
        <section className="list-section">
          <EmployeeList 
            employees={employees} 
            fetchEmployees={fetchEmployees}
            setEditingEmployee={setEditingEmployee}
            loading={loading}
            error={error}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
