import React from 'react';
import styled from '@emotion/styled';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 10px;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;


const SearchBar = () => {

  return (
    <SearchContainer>
      <Input type="text" placeholder="Search courses..." />
    </SearchContainer>
  );
};

export default SearchBar;
