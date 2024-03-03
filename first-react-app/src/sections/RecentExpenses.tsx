import Table from "../components/Table";

const RecentExpenses = () => {
  return (
    <div>
      <h2 className="font-bold text-lg text-text_dark2">Recent Expenses</h2>
      <div className="flex flex-col m-4">
        <Table />
      </div>
    </div>
  );
};

export default RecentExpenses;
