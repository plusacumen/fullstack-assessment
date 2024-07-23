import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const HeroSection = styled.section`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 3rem;
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroTitle = styled.h1`
  position: absolute;
  z-index: 2;
`;

const HeroImage = styled(GatsbyImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Hero: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "hero.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `);

  const image = getImage(data.file.childImageSharp.gatsbyImageData);

  return (
    <HeroSection>
      <HeroTitle>Course Catalog</HeroTitle>
      {image && <HeroImage image={image} alt="Hero Image" />}
    </HeroSection>
  );
};

export default Hero;
