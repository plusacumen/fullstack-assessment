import React from "react";
import styled from "@emotion/styled";
import { navigate } from "gatsby";

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

const CardTitle = styled.h4`
  margin: 0 0 10px 0;
`;

const CardCategory = styled.p`
  margin: 0 0 20px 0;
  color: #777;
`;

const EnrollButton = styled.button`
  background-color: #0073e6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

interface CourseCardProps {
  image: string;
  title: string;
  category: string;
  courseId: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  image,
  title,
  category,
  courseId,
}) => {
  const handleEnroll = async () => {
    const email = localStorage.getItem("email");
    if (email) {
      try {
        const response = await fetch("http://localhost:4000/api/v1/enroll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              email,
              first_name: "John",
              last_name: "Doe",
              course_id: courseId,
              course_name: title,
              provider: "myLMS",
              external_id: "12345",
            },
          }),
        });

        if (response.ok) {
          navigate("/dashboard");
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error("Error enrolling:", error);
        alert("An error occurred during enrollment.");
      }
    }
  };

  return (
    <Card>
      <CardImage src={image} alt={title} />
      <CardTitle>{title}</CardTitle>
      <CardCategory>{category}</CardCategory>
      <EnrollButton onClick={handleEnroll}>Enroll Now</EnrollButton>
    </Card>
  );
};

export default CourseCard;
