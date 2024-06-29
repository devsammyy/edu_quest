import * as SecureStore from "expo-secure-store";
import { IUser } from "./model";

// Helper function to get all users from SecureStore
export const getUsers = async (): Promise<IUser[]> => {
  try {
    const usersData = await SecureStore.getItemAsync("users_data");

    if (usersData) {
      return JSON.parse(usersData) as IUser[];
    }
    return [];
  } catch (error) {
    throw new Error("Error retrieving users");
  }
};

// Function to get a single user by ID
export const getSingleUser = async (userId: string): Promise<IUser | null> => {
  try {
    const users = await getUsers();
    const user = users.find((user) => user.id === userId) || null;
    return user;
  } catch (error) {
    throw new Error("Error retrieving user");
  }
};

export const createUser = async (
  userData: Omit<IUser, "id">
): Promise<IUser> => {
  try {
    const { username, email, matricNo } = userData;
    const users = await getUsers();

    // Check if email, username, or matricNo already exists
    const existingUser = users.find(
      (user) =>
        user.username === username ||
        user.email === email ||
        user.matricNo === matricNo
    );

    if (existingUser) {
      throw new Error("User with that credential(s) already exist");
    }

    const newUserId = Date.now().toString(); // Generate unique ID
    const newUser: IUser = { ...userData, id: newUserId };

    const updatedUsers = [...users, newUser];

    await SecureStore.setItemAsync("users_data", JSON.stringify(updatedUsers));

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Function to update an existing user
export const updateUser = async (
  updatedUser: Partial<IUser>
): Promise<IUser> => {
  try {
    const users = await getUsers();

    const index = users.findIndex((user) => user.email === updatedUser.email);

    if (index === -1) {
      throw new Error("User not found");
    }

    const updatedUsers = [...users];
    updatedUsers[index] = { ...updatedUsers[index], ...updatedUser };

    await SecureStore.setItemAsync("users_data", JSON.stringify(updatedUsers));

    return updatedUsers[index];
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error");
  }
};

// Function to handle user login
export const login = async (
  username: string,
  password: string
): Promise<IUser> => {
  try {
    const users = await getUsers();

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const loggedInUser = { ...user };

    await SecureStore.setItemAsync(
      "logged_in_user",
      JSON.stringify(loggedInUser)
    );

    return loggedInUser;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
