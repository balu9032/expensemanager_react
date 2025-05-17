import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddExpense from './components/AddExpense';
import ExpensesList from './components/ExpensesList';
import ExpensePieChart from './components/ExpensePieChart';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const BACKEND_BASE_URL = "http://192.168.29.73:8080/api/expenses";

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(BACKEND_BASE_URL);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpenseHandler = async (expense) => {
    try {
      await axios.post(BACKEND_BASE_URL, expense);
      fetchExpenses(); // refresh list
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const deleteExpenseHandler = async (id) => {
    try {
      await axios.delete(`${BACKEND_BASE_URL}/${id}`);
      fetchExpenses(); // refresh list
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const totalCredit = expenses
    .filter((e) => e.amountType === 'credit')
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalDebit = expenses
    .filter((e) => e.amountType === 'debit')
    .reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="ui container">
      <div className="ui clearing segment">
        <h2 className="ui left floated header">Expense Manager</h2>
        <button
          className="ui right floated blue button"
          onClick={() => setShowAddForm(true)}
        >
          + Add Expense
        </button>
      </div>

      <div className="ui segment" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <strong>Total Debit:</strong>{' '}
          <span style={{ color: 'red' }}>₹{totalDebit}</span>
          &nbsp;&nbsp;
          <strong>Total Credit:</strong>{' '}
          <span style={{ color: 'green' }}>₹{totalCredit}</span>
          <div>
          <strong>Balance:</strong>{' '}
          <span style={{ color: totalCredit-totalDebit>0 ? "green" : "red" }}>₹{totalCredit-totalDebit}</span>
        </div></div>
        <button className="ui right floated blue button" onClick={() => setShowChart(true)}>Show Chart</button>
      </div>

      <ExpensesList expenses={expenses} onDelete={deleteExpenseHandler} />

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddExpense
              addExpenseHandler={addExpenseHandler}
              onClose={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {showChart && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: 'center' }}>
            <h3>Credit vs Debit</h3>
            <ExpensePieChart totalCredit={totalCredit} totalDebit={totalDebit} />
            <button className="ui button red" onClick={() => setShowChart(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
