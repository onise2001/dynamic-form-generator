interface Option {
  value: string;
  label: string;
}

interface ValidationType {
  min: string;
  max: string;
  minLength: string;
  maxLength: string;
  regex: string;
  required: boolean;
}

interface InputType {
  type: string;
  label: string;
  placeholder: string;
  options: Option[] | null;
  radioOptions: Option[];
  text: string;
  position: { x: number; y: number } | null;
  validations: ValidationType;
}

interface FormType {
  id: number;
  title: string;
  inputs: InputType[];
  width: number;
  height: number;
}

interface ContextType {
  inputs: InputType[];
  setInputs: React.Dispatch<React.SetStateAction<inputType[]>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  myForms: FormType[];
  setMyForms: React.Dispatch<React.SetStateAction<FormType[]>>;
}
