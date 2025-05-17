import React from "react";

class AddExpense extends React.Component {
    state = {
        desc: "",
        amount: "",
        amountType: "debit",
    };

    add = async (e) => {
        e.preventDefault();
        if (this.state.desc === "" || this.state.amount === "") {
            alert("All fields are mandatory");
            return;
        }

        // Send data to Spring Boot backend
        try {
            const response = await fetch("http://192.168.29.73:8080/api/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state),
            });

            if (!response.ok) {
                throw new Error("Failed to save expense");
            }

            const savedExpense = await response.json();
            this.props.addExpenseHandler(savedExpense);
        } catch (error) {
            console.error("Error saving expense:", error);
            alert("Error saving expense. Please try again.");
            return;
        }

        // Clear form after successful submit
        this.setState({ desc: "", amount: "", amountType: "debit" });
    };

    render() {
        return (
            <div className="ui main">
                <h2>Add Expense</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Expense Description</label>
                        <input type="text" name="expense description" placeholder="Expense Description" value={this.state.desc} onChange={(e) => this.setState({ desc: e.target.value })}></input>
                    </div>
                    <div className="field">
                        <label>Expense Amount</label>
                        <input type="text" name="expense amount" placeholder="Expense Amount" value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value })}></input>
                    </div>
                    <div className="field">
                        <label>Amount Type</label>
                        <select
                            value={this.state.amountType}
                            onChange={(e) => this.setState({ amountType: e.target.value })}
                            className="ui dropdown"
                        >
                            <option value="debit">Debit</option>
                            <option value="credit">Credit</option>
                        </select>
                    </div>
                    <button className="ui submit button blue">Add</button>
                    <button
                        type="button"
                        className="ui button"
                        style={{ marginLeft: "10px" }}
                        onClick={this.props.onClose}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        );
    }
}

export default AddExpense;
