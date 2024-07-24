import React, { ChangeEvent, useState } from 'react';
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

interface FiltersProps {
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar: React.FC<FiltersProps> = ({ onSearchChange }) => {
  const [ searchTerm, setSearchTerm ] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <SearchContainer>
      <Input 
        type="text" 
        placeholder="Search courses..." 
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </SearchContainer>
  );
};




export default SearchBar;
