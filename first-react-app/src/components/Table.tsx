import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import plus from "../assets/plus.svg";
import trash from "../assets/trash-2.svg";
import { Category } from "../enums/Category";
import { expensesSchema } from "../schemas/expensesSchema";
import { useExpenses } from "../contexts/ExpensesContext";

export interface Expense {
  id: number;
  name: string;
  date: string;
  category: string;
  amount: number;
}

interface ExpenseFormData {
  name: string;
  date: string;
  category: string;
  amount: number;
}

const Table = () => {
  const [expenses, setExpenses] = useExpenses();
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: yupResolver<ExpenseFormData>(expensesSchema),
  });

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/expenses/${id}`)
      .then(() => {
        setExpenses((prevExpenses) =>
          prevExpenses?.filter((expense) => expense.id !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data: ExpenseFormData) => {
    axios
      .post("http://localhost:3000/expenses", data)
      .then((response) => {
        setExpenses((prevExpenses) => [...prevExpenses!, response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    setShowForm(false);
    reset();
  };

  return (
    <div className="flex justify-center my-6">
      <div className="table border-collapse w-full max-w-screen-xl text-left">
        <div className="table-header-group border-b border-primary text-text_dark2 font-bold">
          <div className="table-row">
            <span className="table-cell px-4 py-2 w-1/5">Expense Name</span>
            <span className="table-cell px-4 py-2 w-1/5">Date</span>
            <span className="table-cell px-4 py-2 w-1/5">Category</span>
            <span className="table-cell px-4 py-2 w-1/5">Amount</span>
            <span className="table-cell px-4 py-2 w-1/5">Delete</span>
          </div>
        </div>

        <div className="table-row-group text-text_dark">
          {expenses &&
            expenses.map((val: Expense) => {
              return (
                <div
                  key={val.id}
                  className="table-row border-b border-solid border-primary"
                >
                  <span className="table-cell px-4 py-2">{val.name}</span>
                  <span className="table-cell px-4 py-2">{val.date}</span>
                  <span className="table-cell px-4 py-2">{val.category}</span>
                  <span className="table-cell px-4 py-2">{val.amount}</span>
                  <span className="table-cell px-4 py-2 text-text_dark">
                    <button
                      className="cursor-pointer hover:scale-110 duration-5"
                      onClick={() => {
                        handleDelete(val.id);
                      }}
                    >
                      <img src={trash} alt="trash-icon" />
                    </button>
                  </span>
                </div>
              );
            })}

          {showForm ? (
            <form
              className="table-row border-b dark:border-nedival-200"
              onSubmit={handleSubmit(onSubmit)}
            >
              <span className="relative table-cell py-2 px-4">
                <input
                  className="border border-bg_card min-w-full px-2 bg-light3 placeholder-text_dark text-text_dark m-0 focus:border-primary outline-none"
                  type="text"
                  placeholder="Enter Expense Name"
                  {...register("name")}
                />
                <p className="absolute top-full text-err_color">
                  {errors.name?.message}
                </p>
              </span>

              <span className="relative table-cell py-2 px-4">
                <input
                  className="border border-bg_card min-w-full px-2 bg-light3 text-text_dark m-0 focus:border-primary outline-none"
                  type="date"
                  placeholder="Enter Date"
                  {...register("date")}
                />
                <p className="absolute top-full text-err_color">
                  {errors.date?.message}
                </p>
              </span>

              <span className="relative table-cell py-2 px-4">
                <select
                  {...register("category")}
                  className="bg-light3 border border-bg_card text-text_dark m-0 focus:border-primary outline-none after:bg-light"
                >
                  {Object.values(Category)!.map((category, index) => {
                    return (
                      <option
                        key={index}
                        value={category}
                        className="bg-light3"
                      >
                        {category}
                      </option>
                    );
                  })}
                </select>
                <p className="absolute top-full text-err_color">
                  {errors.category?.message}
                </p>
              </span>

              <span className="relative table-cell py-2 px-4">
                <input
                  className="border border-bg_card min-w-full px-2 bg-light3 placeholder-text_dark text-text_dark m-0 focus:border-primary outline-none"
                  type="text"
                  placeholder="Enter Amount"
                  {...register("amount")}
                />
                <p className="absolute top-full text-err_color">
                  {errors.amount?.message}
                </p>
              </span>

              <button
                className="table-cell m-1 lg:px-4 lg:py-2 bg-primary text-white rounded-md hover:bg-primary2 px-2 py-1"
                type="submit"
              >
                Add
              </button>

              <button
                className="table-cell m-1 lg:px-4 lg:py-2 bg-secondary text-white rounded-md hover:bg-bg_card px-2 py-1"
                type="submit"
                onClick={() => {
                  setShowForm(false);
                  reset();
                }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="table-row">
              <span className="table-cell px-4 py-2">
                <button
                  className="flex items-center cursor-pointer hover:scale-110 duration-5"
                  onClick={() => {
                    setShowForm(true);
                  }}
                >
                  <span className="text-text_dark mr-1">
                    <img src={plus} alt="plus-icon" />
                  </span>
                  
                  <p className="text-text_dark">New</p>
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
