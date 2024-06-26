import * as SecureStore from "expo-secure-store";
import { IQuestion } from "./model";
import { english, physics, chemistry, englisMispellet } from "./questions";

// Helper function to get all questions from SecureStore
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
