import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignIn = () => {
  return (
    <Page>
      <SignInFrame>
        <PageHeader>Sign In</PageHeader>
        <button>
          <i class="fas fa-sign-in-alt" />
          Sign In
        </button>
        <button className="registerBtn">
          <i class="fas fa-edit" />
          Register
        </button>
        <SignInSection>
          <p>Username</p>
          <input type="text" placeholder="Username" maxLength="15" />
          <p>Password</p>
          <input type="password" placeholder="Password" />
        </SignInSection>
        <SignInButton>
          <button className="loginBtn">Login</button>
        </SignInButton>
        <AccountButton>
          <Link to="" className="register">
            <i class="fas fa-edit" />
            Register for a WRDS Account
          </Link>
          <Link to="">
            <i class="fas fa-question-circle red" />
            Forgot your password?
          </Link>
          <Link to="">
            <i class="fas fa-truck red" />
            Request Account Transfer
          </Link>
        </AccountButton>
      </SignInFrame>
      <NotificationFrame>
        <p>
          WRDS globally-accessed, efficient web-based service gives researchers
          access to accurate, vetted data and WRDS doctoral-level experts. 500+
          institutions in 35+ countries – supporting 75,000+ researchers. 600+
          datasets from more than 50 vendors across multiple disciplines are
          accessible to support users at all experience levels. WRDS
          democratizes data access so that all disciplines can easily search for
          concepts across the data repository.
        </p>
        <button>Top to Section</button>
      </NotificationFrame>
    </Page>
  );
};
export default SignIn;

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1140px;
  margin: 0 auto;
`;

const SignInFrame = styled.div`
  width: 360px;
  padding: 0 15px;

  button {
    padding: 8px 16px;
    color: #3f4033;
    background-color: #fff;
    border: 1px solid #eeedea;
    text-align: center;
    cursor: pointer;

    i {
      display: inline-block;
      margin-right: 3px;
    }
  }
  .registerBtn {
    background-color: #eeedea;
    &:hover {
      background-color: #fff;
    }
  }
`;

const PageHeader = styled.h1`
  margin-top: 15px;
  padding-bottom: 15px;
  font-size: 2.5rem;
  font-weight: bolder;
  line-height: 1.2;
`;

const SignInSection = styled.section`
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;

  p {
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    height: 38px;
    margin-bottom: 16px;
    padding: 6px 12px;
    border: 1px solid #ddd;
  }
`;

const SignInButton = styled.div`
  display: block;
  padding: 12px 16px;
  height: 76px;
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid #ddd;

  .loginBtn {
    float: right;
    padding: 0.7rem 1rem;
    font-size: 1.25rem;
    color: #fff;
    border-radius: 0;
    outline: none;
    background-color: #004785;

    &:hover {
      background-color: #00335f;
    }
  }
`;

const AccountButton = styled.ul`
  width: 100%;

  a {
    display: block;
    padding: 15px 40px 15px 20px;
    font-size: 18px;
    color: #004785;
    border-top: 1px solid #ddd;

    i {
      margin-right: 6px;
    }

    &:hover {
      background-color: #eeedea;
    }
  }

  .register {
    font-weight: bolder;
  }
`;

const NotificationFrame = styled.article`
  width: 750px;
  margin-top: 15px;
  padding: 0 15px;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 400;

  p {
    margin-bottom: 1rem;
  }

  button {
    float: right;
    padding: 0.3rem 0.5rem;
    font-size: 14px;
    color: #fff;
    background-color: #004785;
    border-style: none;
    outline: none;
    cursor: pointer;

    &:hover {
      background-color: #00335f;
    }
  }
`;
