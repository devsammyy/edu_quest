export interface IQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  difficulty: "easy" | "medium" | "hard";
}
