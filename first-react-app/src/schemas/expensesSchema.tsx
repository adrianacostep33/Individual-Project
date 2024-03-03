import * as yup from "yup";

export const expensesSchema = yup
  .object({
    name: yup.string().required("Name is required."),
    date: yup.string().required("Date is required."),
    category: yup.string().required("Category is required."),
    amount: yup
      .number()
      .required("Amount is required.")
      .positive("Amount must be a positive number.")
      .typeError("Amount must be a valid number."),
  })
  .required();
