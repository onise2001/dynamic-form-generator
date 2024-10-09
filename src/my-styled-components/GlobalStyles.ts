import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    padding:0;
    margin:0;
    box-sizing:border-box;
    font-family:"Montserrat", sans-serif;
}
html{
  font-size:62.5%;
}
`;

export const FormContainer = styled.div`
  margin: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
  width: 100%;
  min-height: 100vh;
  background-color: #f3f3fe;
  padding: 3rem;
`;

export const StyledInput = styled.input`
  outline: none;
  width: 30rem;
  font-size: 1.4rem;
  color: #021526;
  padding: 1.15rem;
  border-radius: 6px;
  border: solid 1px #808a93;
`;

export const StyledLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  color: #021526;
`;

export const SingleInputWrapper = styled.div<{
  top: number | undefined;
  left: number | undefined;
  $draggable: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: ${({ $draggable }) => ($draggable ? "2rem" : "1rem")};
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  &:hover {
    cursor: ${({ $draggable }) => ($draggable ? "grab" : "default")};
    border: ${({ $draggable }) => ($draggable ? "2px blue solid" : "none")};
  }
`;

export const Title = styled.h2`
  font-size: 3.2rem;
  font-weight: 500;
  color: #021526;
`;

export const StyledForm = styled.form<{ $height: number }>`
  position: relative;
  width: 75rem;
  height: ${({ $height }) => $height}px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
`;

export const OrangeButton = styled.button`
  all: unset;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  padding: 1.4rem 1.6rem;
  background-color: #f93b1d;
  color: #fff;
  border-radius: 10px;

  cursor: pointer;
  &:hover {
    background-color: #df3014;
  }
`;

export const WhiteButton = styled.button`
  all: unset;
  border: solid 1px #f93b1d;
  border-radius: 10px;
  padding: 1.4rem 1.6rem;
  color: #f93b1d;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #f93b1d;
    color: #fff;
  }
`;

export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 0.75rem;
`;

export const RadioLabel = styled.label`
  font-size: 1.2rem;
`;

export default GlobalStyles;
