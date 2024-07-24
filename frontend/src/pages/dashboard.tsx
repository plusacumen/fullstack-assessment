import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Layout from "../components/Layout";

interface Course {
  course_id: string;
  course_name: string;
  category: string;
  image: string;
}

const DashboardContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const CourseGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CourseCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px;
  padding: 10px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const CourseTitle = styled.h2`
  font-size: 1.5em;
  margin: 10px 0;
`;

const CourseCategory = styled.p`
  color: #555;
`;

const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email){
          throw new Error("There is no email found in localstorage");
        }
        const response = await fetch(
          `http://localhost:4000/api/v1/enrolled-courses?email=${encodeURIComponent(email)}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok: ${response.statusText}");
        }
        const data: Course[] = await response.json();
        console.log(data);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Layout>
      <Title>My Enrolled Courses</Title>
      <CourseGrid>
        {courses.map((course) => (
          <CourseCard key={course.course_id}>
            <CourseImage
              src="https://picsum.photos/300/200"
              alt={course.course_name}
            />
            <CourseTitle>{course.course_name}</CourseTitle>
            <CourseCategory>{course.category}</CourseCategory>
          </CourseCard>
        ))}
      </CourseGrid>
    </Layout>
  );
};

export default Dashboard;
