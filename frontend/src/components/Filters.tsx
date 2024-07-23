import React, { useState, ChangeEvent } from "react";
import styled from "@emotion/styled";

const FilterContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 20px;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const filters = [
  "Leadership",
  "Marketing and Sales",
  "Talent",
  "Business Strategy",
  "Fundraising",
];

interface FiltersProps {
  onFilterChange: (filters: string[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    let updatedFilters = [...selectedFilters];
    if (checked) {
      updatedFilters.push(name);
    } else {
      updatedFilters = updatedFilters.filter((filter) => filter !== name);
    }
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <FilterContainer>
      {filters.map((filter) => (
        <CheckboxLabel key={filter}>
          <input
            type="checkbox"
            name={filter}
            checked={selectedFilters.includes(filter)}
            onChange={handleCheckboxChange}
          />
          {filter}
        </CheckboxLabel>
      ))}
    </FilterContainer>
  );
};

export default Filters;
