import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testinominals = ({ slideData }) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    customPaging: () => (
      <div>
        <span>ㅡ</span>
      </div>
    ),
  };
  return (
    <MainHighLights>
      <h3>TESTIMONIALS</h3>
      <Slider {...settings}>
        {slideData.map((item, idx) => {
          return (
            <li key={idx}>
              <p className="paragraph">{item.paragraph}</p>
              <p className="attribution">{item.attribution}</p>
              <p className="caption">{item.caption}</p>
            </li>
          );
        })}
      </Slider>
    </MainHighLights>
  );
};
export default Testinominals;

const MainHighLights = styled.div`
  width: 100vw;
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

  li {
    text-align: center;
    color: white;
    line-height: 1.5;
    border-style: none;
    outline: none;

    .paragraph {
      width: 80%;
      margin: 0 auto 2rem;
      font-size: 20px;
      font-family: "Georgia";
    }

    .attribution {
      font-size: 18px;
      font-weight: bold;
    }

    .caption {
      margin-bottom: 40px;
      font-size: 12px;
      font-weight: 200;
    }
  }
`;
