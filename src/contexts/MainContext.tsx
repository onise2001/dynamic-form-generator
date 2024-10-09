import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const context = createContext<ContextType>({
  inputs: [],
  setInputs: () => {},
  show: false,
  setShow: () => {},
  myForms: [],
  setMyForms: () => {},
});
export default function MainContext({ children }: { children: ReactNode }) {
  const [inputs, setInputs] = useState<InputType[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [myForms, setMyForms] = useState<FormType[]>([]);

  useEffect(() => {
    const storedForms = localStorage.getItem("myForms");
    if (storedForms) {
      const parsed = JSON.parse(storedForms);
      setMyForms(parsed);
    }
  }, []);
  return (
    <context.Provider
      value={{ inputs, setInputs, show, setShow, myForms, setMyForms }}
    >
      {children}
    </context.Provider>
  );
}

export const useMainContext = () => {
  const mainContext = useContext(context);
  return mainContext;
};
