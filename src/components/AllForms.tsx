import { useMainContext } from "../contexts/MainContext";
import styled from "styled-components";
import { Title } from "../my-styled-components/GlobalStyles";
import { Link } from "react-router-dom";

export default function AllForms() {
  const { myForms } = useMainContext();
  return (
    <Section>
      <Title>My Forms</Title>

      {myForms.length > 0 ? (
        myForms.map((item) => (
          <Link
            key={item.id}
            to={`/show-form/${item.id}`}
            style={{ textDecoration: "none" }}
          >
            <FormTitle>{item.title}</FormTitle>
          </Link>
        ))
      ) : (
        <FormTitle>No Forms</FormTitle>
      )}
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  gap: 3rem;
  padding: 3rem;
`;

const FormTitle = styled.span`
  color: rgba(0, 0, 0, 0.75);
  font-size: 1.8rem;
  font-weight: 600;
  &:hover,
  &:active {
    color: blue;
  }
`;
