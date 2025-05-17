import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#FF4C4C', '#4CAF50']; // Red for debit, Green for credit

const ExpensePieChart = ({ totalCredit, totalDebit }) => {
  const data = [
    { name: 'Debit', value: totalDebit },
    { name: 'Credit', value: totalCredit },
  ];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ExpensePieChart;
