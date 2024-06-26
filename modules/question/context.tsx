import React, { useState, createContext } from "react";
import { IQuestion } from "./model";
import { getSingleQuestionsByName, getSingleQuestionById } from "./service";

interface IQuestionState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  question: IQuestion | null;
  setQuestion: (question: IQuestion | null) => void;
  getQuestion: (id: number) => Promise<void>;
  questions: IQuestion[];
  setQuestions: (questions: IQuestion[]) => void;
  getQuestions: (name: string) => Promise<void>;
}

const QuestionContext = createContext<IQuestionState>({
  loading: false,
  setLoading: (loading: boolean) => {},
  question: null,
  setQuestion: (value) => {},
  questions: [],
  setQuestions: (value) => {},

  getQuestion: (filter) => {
    return Promise.resolve();
  },

  getQuestions: () => Promise.resolve(),
});

export const useQuestionState = () => {
  const context = React.useContext(QuestionContext);
  if (!context) {
    throw new Error("useUserState must be used within the UserContextProvider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const QuestionContextProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [question, setQuestion] = useState<IQuestion | null>(null);

  const getQuestions = async (name: string) => {
    setLoading(true);
    try {
      const questions = await getSingleQuestionsByName(name as any);
      setQuestions(questions);
    } catch (error: any) {
      console.error("Error registering user:", error);
      throw error; // Re-throw error for further handling if needed
    } finally {
      setLoading(false);
    }
  };

  const getQuestion = async (id: number) => {
    setLoading(true);
    try {
      const userData = await getSingleQuestionById(id);
      setQuestion(userData);
    } catch (error: any) {
      console.error("Error getting users data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <QuestionContext.Provider
      value={{
        loading,
        getQuestion,
        getQuestions,
        setQuestions,
        setQuestion,
        setLoading,
        question,
        questions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
