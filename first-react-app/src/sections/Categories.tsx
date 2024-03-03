import { useEffect, useState } from "react";
import { Card } from "../components/CardCategory";
import { useExpenses } from "../contexts/ExpensesContext";
import { Category } from "../enums/Category";
import Chart from "../components/PieChart";

export interface ITotalCategorySpendings {
  name: string;
  amount: number;
}

const Categories = () => {
  const [expenses] = useExpenses();
  const [totalCategorySpendings, setTotalCategorySpendings] = useState<
    ITotalCategorySpendings[]
  >([]);

  useEffect(() => {
    const calculateTotalCategorySpending = () => {
      const categorySpendings: ITotalCategorySpendings[] = [];

      Object.values(Category).map((category) => {
        const allCategorySpendings = expenses.map((expense) => {
          if (expense.category === category) {
            return {
              name: category,
              amount: expense.amount,
            };
          } else {
            return {
              name: category,
              amount: 0,
            };
          }
        });

        const result = allCategorySpendings.reduce(
          (
            accumulator: ITotalCategorySpendings,
            currentValue: ITotalCategorySpendings
          ): ITotalCategorySpendings => {
            accumulator.name = category;
            accumulator.amount = accumulator.amount + currentValue.amount;
            return accumulator;
          },
          {
            name: "",
            amount: 0,
          }
        );
        categorySpendings.push(result);
      });
      setTotalCategorySpendings(categorySpendings);
    };
    calculateTotalCategorySpending();
  }, [expenses]);

  const colors = [
    "#bb7a63",
    "#ab6d57",
    "#d4a595",
    "#8f5946",
    "#f0ded8",
    "#e6d2c2",
    "#faf5f2",
    "#d6c0b1",
    "#482f28",
    "#2f191a",
  ];

  return (
    <div className="flex flex-col m-4">
      <h2 className="font-bold text-lg text-text_dark2">Categories</h2>
      <div className="flex justify-around ">
        <div className="grid grid-cols-3 gap-4 mt-4">
          {totalCategorySpendings.map(
            (category: ITotalCategorySpendings, index: number) => {
              return (
                <Card
                  key={index}
                  category={category.name}
                  amountSpent={category.amount}
                ></Card>
              );
            }
          )}
        </div>

        {totalCategorySpendings && (
          <div>
            <Chart data={totalCategorySpendings} colors={colors} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
