export interface IQuestion {
  id: number;
  name: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: "easy" | "medium" | "hard";
}
export interface IAllQuestions {
  id: number;
  name: string;
  questions: IQuestion;
}
