import { IAllQuestions, IQuestion } from "./model";
import { english, physics, chemistry, englisMispellet } from "./questions";

export const getSingleQuestionsByName = async (
  name: "english" | "physics" | "chemistry" | "mispelled"
) => {
  try {
    switch (name) {
      case "english":
        return english as IQuestion[];
        break;
      case "physics":
        return physics as IQuestion[];
        break;
      case "chemistry":
        return chemistry as IQuestion[];
        break;
      case "mispelled":
        return englisMispellet as IQuestion[];
      default:
        return [];
        break;
    }
  } catch (error) {
    throw new Error("Error retrieving questions");
  }
};

export const getAllofQuestions = async () => {
  return [
    { id: 1, name: "English", questions: english },
    { id: 2, name: "Physics", questions: physics },
    { id: 3, name: "Chemistry", questions: chemistry },
    { id: 4, name: "Mispelled", questions: englisMispellet },
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
