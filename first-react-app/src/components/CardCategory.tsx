import { Category } from "../enums/Category";

interface CardProps {
  category: string;
  amountSpent: number;
}

export const Card: React.FC<CardProps> = ({ category, amountSpent }) => {
  return (
    <div className="bg-bg_card shadow-md shadow-primary2  rounded-md p-4 text-text_dark">
      <span>{category}</span>
      <span> : </span>
      <span>{amountSpent}</span>
    </div>
  );
};
