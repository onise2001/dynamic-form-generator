import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <Nav>
        <List>
          <Link to="/add-form" style={{ textDecoration: "none" }}>
            <ListItem>Add Form</ListItem>
          </Link>
          <Link to="/all-forms" style={{ textDecoration: "none" }}>
            <ListItem>All Forms</ListItem>
          </Link>
        </List>
      </Nav>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  padding: 1.5rem;
  width: 100%;
  background-color: #f93b1d;
`;

const Nav = styled.nav``;

const List = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ListItem = styled.li`
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
`;
