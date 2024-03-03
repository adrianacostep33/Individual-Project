import { useEffect, useState } from "react";
import { Expense } from "../components/Table";
import { useExpenses } from "../contexts/ExpensesContext";

const FinancialObjectives = () => {
  const [income, setIncome] = useState(5000);
  const [savings, setSavings] = useState(1000);
  const [spendings, setSpending] = useState<number>(0);

  const [expenses, setExpenses] = useExpenses();

  const objectives = [
    { lable: "Income", name: "income", color: "bg-primary", value: income },
    {
      lable: "Saving Goals",
      name: "savings",
      color: "bg-primary2",
      value: savings,
    },
    {
      lable: "Spending Summary",
      name: "spendings",
      color: "bg-dark",
      value: spendings,
    },
  ];

  useEffect(() => {
    if (expenses) {
      const totalSpending = expenses.reduce(
        (accumulator: number, currentValue: Expense): number => {
          return accumulator + currentValue.amount;
        },
        0
      );
      setSpending(totalSpending);
    }
  }, [expenses]);

  return (
    <div>
      <h2 className="font-bold text-lg text-text_dark2">
        Financial Objectives
      </h2>
      <div className="flex gap-6 my-4">
        {objectives.map((objective, index) => {
          return (
            <div
              key={index}
              className={`border-solid border border-gray-200 rounded-md p-4 ${objective.color}`}
            >
              <span>{objective.lable} </span>
              <span> : </span>
              <span>{objective.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinancialObjectives;
