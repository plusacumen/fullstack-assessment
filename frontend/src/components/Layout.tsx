import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
`;

const NavLink = styled(Link)`
  margin-right: 10px;
  text-decoration: none;
  color: #333;
  &:hover {
    text-decoration: underline;
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Nav>
        <NavLink to="/">Course Catalog</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </Nav>
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
