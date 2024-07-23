import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import CourseCard from "../components/CourseCard";
import Layout from "../components/Layout";

const FilterSection = styled.div`
  flex: 1;
  margin: 20px 0;
`;

const CoursesSection = styled.div`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const courses = [
  {
    id: "1",
    title: "Leadership 101",
    category: "Leadership",
    image: "https://picsum.photos/300/200",
  },
  {
    id: "2",
    title: "Marketing Basics",
    category: "Marketing and Sales",
    image: "https://picsum.photos/300/200",
  },
  {
    id: "3",
    title: "Sales Techniques for Beginners",
    category: "Marketing and Sales",
    image: "https://picsum.photos/300/200",
  },
  {
    id: "4",
    title: "Talent Acquisition Strategies",
    category: "Talent",
    image: "https://picsum.photos/300/200",
  },
  {
    id: "5",
    title: "Advanced Business Strategy",
    category: "Business Strategy",
    image: "https://picsum.photos/300/200",
  },
  {
    id: "6",
    title: "Effective Fundraising Methods",
    category: "Fundraising",
    image: "https://picsum.photos/300/200",
  },
];

const CourseCatalog: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      const email = prompt("Enter your email this simulates the auth process:");
      if (email) {
        localStorage.setItem("email", email);
      }
    }
  });

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const filteredCourses = courses.filter(
    (course) =>
      (selectedFilters.length === 0 ||
        selectedFilters.includes(course.category))
  );

  return (
    <Layout>
      <Hero />
      <SearchBar />
      <>
        <FilterSection>
          <Filters onFilterChange={handleFilterChange} />
        </FilterSection>
        <CoursesSection>
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              category={course.category}
              image={course.image}
              courseId={course.id}
            />
          ))}
        </CoursesSection>
      </>
    </Layout>
  );
};

export default CourseCatalog;
