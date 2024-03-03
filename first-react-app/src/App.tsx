import Categories from "./sections/Categories";
import FinancialObjectives from "./sections/FinancialObjectives";
import RecentExpenses from "./sections/RecentExpenses";
import { ExpensesProvider } from "./contexts/ExpensesContext";

function App() {
  return (
    <div className="h-full w-screen bg-gradient-to-tl from-light via-transparent to-light2">
      <ExpensesProvider>
        <div className="p-12">
          <h1 className="font-bold text-3xl my-6 text-text_dark2 ">
            Expense Tracker
          </h1>

          <div className="text-sm">
            <FinancialObjectives />
            <RecentExpenses />
            <Categories />
          </div>
        </div>
      </ExpensesProvider>
    </div>
  );
}

export default App;
