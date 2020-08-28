import React from "react";
import styled from "styled-components";
import ContactMap from "./ContactMap";

const ContactUs = () => {
  return (
    <ContactUsFrame>
      <ContactUsRow>
        <ContactInfo>
          <h2>Contact Us</h2>
          <p className="contactType">Wharton Research Data Services</p>
          <p>3819 Chestnut Street – Suite 300</p>
          <p>Philadelphia, PA 19104</p>
          <p className="contactType">Email</p>
          <p>wrds@wharton.upenn.edu</p>
          <p className="contactType">Phone</p>
          <p>877.GET.WRDS (877.438.9737)</p>
          <p className="contactType">Fax</p>
          <p>215.573.6073</p>
        </ContactInfo>
        <ContactMap />
      </ContactUsRow>
    </ContactUsFrame>
  );
};
export default ContactUs;

const ContactUsFrame = styled.div`
  opacity: 0.8;
  width: 100%;
  height: 590px;
  margin-top: 80px;
  background: url("Images/contact.jpg") no-repeat;
  background-size: cover;
`;

const ContactUsRow = styled.div`
  width: 1140px;
  display: flex;
  margin: 0 auto;
  padding: 100px 0;
`;

const ContactInfo = styled.section`
  margin-right: 40px;
  color: white;
  font-size: 20px;
  text-align: center;

  h2 {
    font-size: 36px;
    font-weight: 800;
  }

  .contactType {
    font-weight: 900;
    margin: 10px 0;
  }

  p {
    line-height: 1.2;
  }
`;
