import React, { useContext, useEffect, useState, useRef } from "react";
import {
  FormContainer,
  StyledForm,
  SingleInputWrapper,
  StyledLabel,
  StyledInput,
  OrangeButton,
  WhiteButton,
  RadioLabel,
  RadioWrapper,
} from "../my-styled-components/GlobalStyles";
import AddInput from "./AddInput";
import styled from "styled-components";
import { useMainContext } from "../contexts/MainContext";
import { useNavigate } from "react-router-dom";

export default function FormGenerator() {
  const navigate = useNavigate();

  const { setShow, inputs, setInputs, setMyForms, myForms } = useMainContext();

  const [newForm, setNewForm] = useState<FormType>({
    id: myForms.length + 1,
    title: "",
    inputs: inputs,
    width: 750,
    height: 0,
  });

  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (inputs.length > 0) {
      setPositions((prev) => [
        ...prev,
        { x: 0, y: inputs.length > 1 ? 90 * inputs.length : 70 },
      ]);
    }
    setNewForm((prev) => ({
      ...prev,
      inputs: inputs,
      height: inputs.length * 90 + 70,
    }));
  }, [inputs]);

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  //const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, index: number) => {
    setDraggingIndex(index);
    setOffset({
      x: e.clientX - positions[index].x,
      y: e.clientY - positions[index].y,
    });
  };

  const formRef = useRef(null);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (draggingIndex !== null) {
      const formRect = formRef.current.getBoundingClientRect();
      const inputRect =
        inputRefs.current[draggingIndex].getBoundingClientRect();

      const inputWidth = inputRect ? inputRect.width : 0;
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      const boundX = Math.min(Math.max(newX, 0), formRect.width - inputWidth);

      const boundY = Math.min(
        Math.max(newY, 55),
        formRect.height - (inputRect?.height + 84)
      );

      setPositions((prev) =>
        prev.map((pos, index) =>
          index === draggingIndex ? { x: boundX, y: boundY } : pos
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  //   console.log(position);
  //   console.log(dragging);
  //   console.log(offset);
  //   console.log(inputs.length);

  const onSubmit = (e) => {
    e.preventDefault();
    positions.forEach((item, index) => {
      inputs[index].position = item;
    });

    setMyForms((prev) => {
      const updatedState = [...prev, newForm];
      localStorage.setItem("myForms", JSON.stringify(updatedState));
      return updatedState;
    });
    navigate(`/show-form/${newForm.id}`);
  };
  //  console.log(inputs);

  return (
    <>
      <AddInput />
      <FormContainer
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={(e) => {
          handleMouseMove(e);
        }}
      >
        <OrangeButton
          onClick={() => {
            setShow(true);
          }}
        >
          Add Input
        </OrangeButton>
        <StyledForm
          ref={formRef}
          //$numberOfInputs={inputs.length}
          $height={inputs.length > 0 ? 200 + inputs.length * 90 : 200}
          onSubmit={onSubmit}
        >
          <FormTitleInput
            type="text"
            placeholder="Form Title"
            onChange={(e) => {
              setNewForm((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
          {inputs?.map((item, index) =>
            item.type === "submit" ? (
              <SingleInputWrapper
                ref={(el) => (inputRefs.current[index] = el)}
                $draggable={true}
                onMouseDown={(event) => handleMouseDown(event, index)}
                key={Math.random()}
                top={
                  positions[index]
                    ? positions[index].y
                    : inputs.length > 0
                    ? 70 * (index + 1)
                    : 70
                }
                left={positions[index] ? positions[index].x : 0}
              >
                <OrangeButton>{item.text}</OrangeButton>
              </SingleInputWrapper>
            ) : item.type === "dropdown" ? (
              <SingleInputWrapper
                ref={(el) => (inputRefs.current[index] = el)}
                $draggable={true}
                onMouseDown={(event) => handleMouseDown(event, index)}
                key={Math.random()}
                top={
                  positions[index]
                    ? positions[index].y
                    : inputs.length > 0
                    ? 70 * (index + 1)
                    : 70
                }
                left={positions[index] ? positions[index].x : 0}
              >
                <select>
                  {item.options?.map((option) => (
                    <option value={option.value} key={Math.random()}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </SingleInputWrapper>
            ) : item.type === "radio" ? (
              <SingleInputWrapper
                ref={(el) => (inputRefs.current[index] = el)}
                $draggable={true}
                onMouseDown={(event) => handleMouseDown(event, index)}
                key={Math.random()}
                top={
                  positions[index]
                    ? positions[index].y
                    : inputs.length > 0
                    ? 70 * (index + 1)
                    : 70
                }
                left={positions[index] ? positions[index].x : 0}
              >
                {item.radioOptions?.map((option) => (
                  <RadioWrapper key={Math.random() * Math.random()}>
                    <RadioLabel htmlFor={option.value}>RadioLabel</RadioLabel>
                    <input
                      type="radio"
                      value={option.value}
                      id={option.value}
                    />
                  </RadioWrapper>
                ))}
              </SingleInputWrapper>
            ) : (
              <SingleInputWrapper
                ref={(el) => (inputRefs.current[index] = el)}
                $draggable={true}
                onMouseDown={(event) => handleMouseDown(event, index)}
                key={Math.random()}
                top={
                  positions[index]
                    ? positions[index].y
                    : inputs.length > 0
                    ? 70 * (index + 1)
                    : 70
                }
                left={positions[index] ? positions[index].x : 0}
              >
                <StyledLabel>{item.label}</StyledLabel>
                <StyledInput type={item.type} placeholder={item.placeholder} />
              </SingleInputWrapper>
            )
          )}
          <ButtonWrapper>
            <WhiteButton
              type="button"
              onClick={() => {
                setInputs([]);
              }}
            >
              Clear
            </WhiteButton>
            <OrangeButton type="submit">Save and Preview</OrangeButton>
          </ButtonWrapper>
        </StyledForm>
      </FormContainer>
    </>
  );
}

const FormTitleInput = styled.input`
  outline: none;
  border: none;
  text-align: center;
  color: #021526;
  font-size: 2.6rem;
  font-weight: bold;
  max-height: 3rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: flex-end;
  padding-top: 1.5rem;
  align-self: center;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
`;
