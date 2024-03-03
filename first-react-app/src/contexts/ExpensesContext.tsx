import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Expense } from "../components/Table";

interface IExpensesContextProviderProps {
  children: React.ReactNode;
}

type IExpensesContext = [
  Expense[],
  React.Dispatch<React.SetStateAction<Expense[]>>
];

const ExpensesContext = createContext<IExpensesContext>([[], () => null]);

export const ExpensesProvider = ({
  children,
}: IExpensesContextProviderProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ExpensesContext.Provider value={[expenses, setExpenses]}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  return useContext(ExpensesContext);
};

export default IExpensesContext;
