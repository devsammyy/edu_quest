import React, { useState, createContext } from "react";
import { IUser } from "./model";
import {
  createUser,
  getUsers,
  updateUser as updateUserService,
  login as loginUser,
  getSingleUser,
} from "./service";

interface IUserState {
  loading: boolean;
  fetchingState: string;
  setFetchingState: (value: string) => void;
  setLoading: (loading: boolean) => void;
  users: IUser[];
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  registerUser: (user: IUser) => Promise<void>;
  getUserData: () => Promise<void>;
  updateUser: (user: Partial<IUser>) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  fetchSingleUser: (userId: string) => Promise<void>;
}

const UserContext = createContext<IUserState>({
  loading: false,
  fetchingState: "",
  setFetchingState(value) {},
  setLoading(loading: boolean) {},
  users: [],
  user: null,
  setUser(user: IUser | null) {},
  registerUser(user: IUser) {
    return Promise.resolve();
  },
  getUserData() {
    return Promise.resolve();
  },
  updateUser(user: Partial<IUser>) {
    return Promise.resolve();
  },
  login(username: string, password: string) {
    return Promise.resolve();
  },
  fetchSingleUser(userId: string) {
    return Promise.resolve();
  },
});

export const useUserState = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserState must be used within the UserContextProvider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [fetchingState, setFetchingState] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser | null>(null);

  const registerUser = async (values: IUser) => {
    setLoading(true);
    try {
      const newUser = await createUser(values);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setUser(newUser);
      setFetchingState(`Welcome aboard ${newUser.username}`);
    } catch (error: any) {
      console.error("Error registering user:", error);
      setFetchingState(`${error.message}`); // Set error message
      throw error; // Re-throw error for further handling if needed
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    setLoading(true);
    try {
      const userData = await getUsers();
      setUsers(userData);
      setUser(userData[0] || null);
    } catch (error: any) {
      console.error("Error getting users data:", error);
      setFetchingState(`${error.message}`); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedUser: Partial<IUser>) => {
    setLoading(true);
    try {
      const updatedUserData = await updateUserService(updatedUser);

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === updatedUserData.id ? updatedUserData : u
        )
      );
      setUser(updatedUserData);
      setFetchingState(`Data updated successfully`);
    } catch (error: any) {
      setFetchingState(`${error.message}`);
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const loggedIn = await loginUser(username, password);
      if (loggedIn) {
        setUser(loggedIn);
        setFetchingState("Login successful");
      } else {
        setFetchingState("Invalid credentials");
      }
    } catch (error: any) {
      console.error("Error logging in:", error);
      setFetchingState(`${error.message}`); // Set error message
      throw error; // Re-throw error for further handling if needed
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleUser = async (userId: string) => {
    setLoading(true);
    try {
      const user = await getSingleUser(userId);
      setUser(user);
      setFetchingState("User fetched successfully");
    } catch (error: any) {
      console.error("Error fetching user:", error);
      setFetchingState(`${error.message}`); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        fetchingState,
        setFetchingState,
        setLoading,
        users,
        user,
        setUser,
        registerUser,
        getUserData,
        updateUser,
        login,
        fetchSingleUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
