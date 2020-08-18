import React from "react";
import styled from "styled-components";

const PageHighlight = () => {
  return (
    <MainHighLights>
      <MainHighLightsRow>
        <figure>
          <i className="fas fa-5x fa-users" aria-hidden="true" />
          <p>
            WRDS globally-accessed, efficient web-based service gives
            researchers access to accurate, vetted data and WRDS doctoral-level
            experts.
          </p>
        </figure>
        <figure>
          <i className="fas fa-5x fa-university" aria-hidden="true" />
          <p>
            500+ institutions in 35+ countries – supporting 75,000+ researchers.
          </p>
        </figure>
        <figure>
          <i className="fas fa-5x fa-cubes" aria-hidden="true" />
          <p>
            600+ datasets from more than 50 vendors across multiple disciplines
            are accessible to support users at all experience levels.
          </p>
        </figure>
        <figure>
          <i className="fas fa-5x fa-search" aria-hidden="true"></i>
          <p>
            WRDS democratizes data access so that all disciplines can easily
            search for concepts across the data repository.
          </p>
        </figure>
      </MainHighLightsRow>
    </MainHighLights>
  );
};
export default PageHighlight;

const MainHighLights = styled.div`
  width: 100%;
  padding: 90px 0;
  background-image: linear-gradient(160deg, #2e55a4 60%, #06aafc 100%);

  h3 {
    margin-bottom: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    color: white;
    letter-spacing: 0.25rem;
  }
`;

const MainHighLightsRow = styled.div`
  display: flex;
  justify-content: space-around;
  width: 1140px;
  margin: 0 auto;

  figure {
    width: 25%;
    margin: 0 auto;
    padding: 0 10px;
    text-align: center;

    i {
      color: #06aafc;
      margin-bottom: 45px;
    }

    p {
      color: white;
      line-height: 1.5;
    }
  }
`;
