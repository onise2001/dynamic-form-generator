import { useState } from "react";
import styled from "styled-components";
import {
  OrangeButton,
  RadioLabel,
  RadioWrapper,
  StyledInput,
  StyledLabel,
  WhiteButton,
} from "../my-styled-components/GlobalStyles";
import { useMainContext } from "../contexts/MainContext";

export default function AddInput() {
  const { show, setShow, setInputs } = useMainContext();
  const [newInput, setNewInput] = useState<InputType>({
    type: "",
    placeholder: "",
    label: "",
    options: [],
    radioOptions: [],
    text: "",
    position: null,
    validations: {
      min: "",
      max: "",
      minLength: "",
      maxLength: "",
      regex: "",
      required: false,
    },
  });

  const [newOption, setNewOption] = useState<{
    label: string;
    value: string;
  }>({
    label: "",
    value: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputs((prev) => [...prev, newInput]);
    setShow(false);
  };

  const onOptionAdd = () => {
    if (newInput.type === "dropdown") {
      setNewInput((prev) => ({
        ...prev,
        options: [...(prev.options || []), newOption],
      }));
    } else {
      setNewInput((prev) => ({
        ...prev,
        radioOptions: [...(prev.radioOptions || []), newOption],
      }));
    }

    setNewOption({
      label: "",
      value: "",
    });
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewOption((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <FormPopup $show={show}>
      <AddInputFormContainer>
        <AddInputForm onSubmit={(e) => onSubmit(e)}>
          <InputContainer>
            <StyledLabel>Type</StyledLabel>
            <select onChange={handleChange} name="type" defaultValue="text">
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="password">Password</option>
              <option value="email"> Email</option>
              <option value="dropdown">Dropdown</option>
              <option value="submit">Submit</option>
              <option value="radio">Radio</option>
            </select>
          </InputContainer>
          {newInput.type === "submit" ? (
            <InputContainer>
              <StyledLabel>Text</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Submit button text"
                value={newInput.text}
                onChange={(e) => {
                  handleChange(e);
                }}
                name="text"
              />
            </InputContainer>
          ) : newInput.type === "dropdown" || newInput.type === "radio" ? (
            <>
              <RadioWrapper>
                <RadioLabel>Required</RadioLabel>
                <input
                  type="checkbox"
                  checked={newInput.validations.required}
                  onChange={(e) => {
                    setNewInput((prev) => ({
                      ...prev,
                      validations: {
                        ...prev.validations,
                        required: e.target.checked,
                      },
                    }));
                  }}
                />
              </RadioWrapper>

              <InputContainer>
                <StyledLabel>Name</StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Name"
                  onChange={handleChange}
                  value={newInput.label}
                  name="label"
                />
              </InputContainer>
              <InputContainer>
                <StyledLabel>Value</StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Value"
                  onChange={handleOptionChange}
                  value={newOption.value}
                  name="value"
                />
              </InputContainer>
              <InputContainer>
                <StyledLabel>Label</StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Label"
                  onChange={handleOptionChange}
                  name="label"
                  value={newOption.label}
                />
              </InputContainer>
              <InputContainer>
                <OrangeButton onClick={onOptionAdd} type="button">
                  Add Option
                </OrangeButton>
              </InputContainer>
            </>
          ) : (
            <>
              <InputContainer>
                <StyledLabel>Placeholder</StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Placeholder"
                  onChange={handleChange}
                  name="placeholder"
                />
              </InputContainer>
              <InputContainer>
                <StyledLabel>Label</StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Label"
                  onChange={handleChange}
                  name="label"
                />
              </InputContainer>
              <RadioWrapper>
                <RadioLabel>Required</RadioLabel>
                <input
                  type="checkbox"
                  checked={newInput.validations.required}
                  onChange={(e) => {
                    setNewInput((prev) => ({
                      ...prev,
                      validations: {
                        ...prev.validations,
                        required: e.target.checked,
                      },
                    }));
                  }}
                />
              </RadioWrapper>
              {newInput.type === "number" ? (
                <>
                  <InputContainer>
                    <StyledLabel>Min</StyledLabel>
                    <StyledInput
                      type="number"
                      placeholder="Min"
                      onChange={(e) =>
                        setNewInput((prev) => ({
                          ...prev,
                          validations: {
                            ...prev.validations,
                            min: e.target.value,
                          },
                        }))
                      }
                      name="label"
                      value={newInput.validations.min}
                    />
                  </InputContainer>
                  <InputContainer>
                    <StyledLabel>Max</StyledLabel>
                    <StyledInput
                      type="number"
                      placeholder="Max"
                      onChange={(e) =>
                        setNewInput((prev) => ({
                          ...prev,
                          validations: {
                            ...prev.validations,
                            max: e.target.value,
                          },
                        }))
                      }
                      name="label"
                      value={newInput.validations.max}
                    />
                  </InputContainer>
                </>
              ) : (
                <>
                  <InputContainer>
                    <StyledLabel>Min Length</StyledLabel>
                    <StyledInput
                      type="number"
                      placeholder="Min Length"
                      onChange={(e) =>
                        setNewInput((prev) => ({
                          ...prev,
                          validations: {
                            ...prev.validations,
                            minLength: e.target.value,
                          },
                        }))
                      }
                      name="label"
                      value={newInput.validations.minLength}
                    />
                  </InputContainer>
                  <InputContainer>
                    <StyledLabel>Max Length</StyledLabel>
                    <StyledInput
                      type="number"
                      placeholder="Max Lenght"
                      onChange={(e) =>
                        setNewInput((prev) => ({
                          ...prev,
                          validations: {
                            ...prev.validations,
                            maxLength: e.target.value,
                          },
                        }))
                      }
                      name="label"
                      value={newInput.validations.maxLength}
                    />
                  </InputContainer>
                  <InputContainer>
                    <StyledLabel>Regex</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Regex"
                      onChange={(e) =>
                        setNewInput((prev) => ({
                          ...prev,
                          validations: {
                            ...prev.validations,
                            regex: e.target.value,
                          },
                        }))
                      }
                      name="label"
                      value={newInput.validations.regex}
                    />
                  </InputContainer>
                </>
              )}
            </>
          )}

          <WhiteButton
            type="button"
            onClick={() => {
              setShow(false);
              setNewInput({
                text: "",
                position: { x: 0, y: 0 },
                type: "",
                placeholder: "",
                label: "",
                options: [],
                validations: {
                  min: "",
                  max: "",
                  minLength: "",
                  maxLength: "",
                  regex: "",
                  required: false,
                },
                radioOptions: [],
              });
            }}
          >
            Cancel
          </WhiteButton>
          <OrangeButton type="submit">Add</OrangeButton>
        </AddInputForm>
      </AddInputFormContainer>
    </FormPopup>
  );
}

const FormPopup = styled.section<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  display: ${({ $show }) => ($show ? "block" : "none")};
  z-index: 100;
`;

const AddInputFormContainer = styled.div`
  padding: 2rem;
  background-color: #fff;
`;
const AddInputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
`;

// const Input = styled.input`
//   outline: none;
//   width: 38.4rem;
//   font-size: 1.4rem;
//   color: #021526;
//   padding: 1.15rem;
//   border-radius: 6px;
//   border: solid 1px #808a93;
// `;
