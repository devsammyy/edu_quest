import { IQuestion } from "./model";
import { english, physics, chemistry, englisMispellet, edu, maths, edutech } from "./questions";

export const getSingleQuestionsByName = (
  name:
    | "english"
    | "physics"
    | "chemistry"
    | "mispelled"
    | "maths"
    | "edu"
    | "edutech"
) => {
  switch (name) {
    case "english":
      return english as IQuestion[];

    case "physics":
      return physics as IQuestion[];

    case "chemistry":
      return chemistry as IQuestion[];

    case "mispelled":
      return englisMispellet as IQuestion[];
    case "edu":
      return edu as IQuestion[];
    case "maths":
      return maths as IQuestion[];
    case "edutech":
      return edutech as IQuestion[];
    default:
      return [];
  }
};

export const getAllofQuestions = async () => {
  return [
    { id: 1, name: "Edutech", questions: edutech },
    { id: 2, name: "Edu", questions: edu },
    { id: 3, name: "English", questions: english },
    { id: 4, name: "Maths", questions: maths },
    { id: 5, name: "Physics", questions: physics },
    { id: 6, name: "Chemistry", questions: chemistry },
  ];
};

export const getSingleQuestionById = async (id: number) => {
  try {
    const questions = await getSingleQuestionsByName(name as any);
    const question: any =
      questions.find((questionName) => questionName.id === id) || null;
    return question as IQuestion;
  } catch (error) {
    throw new Error("Error retrieving question");
  }
};
