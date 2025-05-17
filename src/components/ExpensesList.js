import React from "react";

const ExpensesList = (props) => {
    console.log(props);
    const renderExpensesList = props.expenses.map((expense) => {
        const handleDelete = async () => {
            if (window.confirm("Are you sure you want to delete this expense?")) {
                try {
                    const response = await fetch(`http://192.168.29.73:8080/api/expenses/${expense.id}`, {
                        method: "DELETE",
                    });
                    if (!response.ok) {
                        throw new Error("Failed to delete expense");
                    }
                    props.onDelete(expense.id); // update state in parent after successful delete
                } catch (error) {
                    console.error("Error deleting expense:", error);
                    alert("Error deleting expense. Please try again.");
                }
            }
        };

        return (
            <div className="item" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
            }}>

                <div style={{ flex: "1" }} >
                    <div className="header">{expense.desc}</div>
                    <div style={{
                        color: expense.amountType === "credit" ? "green" : "red",
                        fontWeight: "bold",
                    }}>{expense.amount}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <i
                        className="trash alternate outline icon"
                        style={{
                            cursor: 'pointer',
                            fontSize: '1.3rem',
                            color: 'red',
                        }}
                        onClick={handleDelete}
                    />
                </div>
            </div>
        );
    });
    return (
        <div className="ui celled list">
            {renderExpensesList}
        </div>
    );
}

export default ExpensesList;
