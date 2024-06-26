import { ComponentProps, FC } from "react";
import { UserContextProvider } from "./modules/auth/context";
import { QuestionContextProvider } from "./modules/question/context";

export const combinedContext = (...components: FC[]): FC<any> => {
  return components.reduce(
    (AccumulatedComp: any, CurrentComp: any) => {
      return ({ children }: ComponentProps<FC<any>>): JSX.Element => {
        return (
          <AccumulatedComp>
            <CurrentComp>{children}</CurrentComp>
          </AccumulatedComp>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};

const providers = [UserContextProvider, QuestionContextProvider];

export const ContextProvider = combinedContext(...(providers as any));
