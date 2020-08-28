import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "../../Components/Nav/Nav";
import styled from "styled-components";

const AccountInfo = () => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    axios.get("/data/data.json").then((res) => setUserInfo(res.data.data));
  });

  const mailTo = () => {
    window.location.href = "mailto:bhua@merage.uci.edu";
  };
  return (
    <>
      <Nav />
      <AccountInfoFrame>
        <PageHeader>Your Account</PageHeader>
        <PageContent>
          <h2>{userInfo.user}</h2>
          <InfoTable>
            <tbody>
              <tr>
                <th>Username</th>
                <td>{userInfo.userName}</td>
              </tr>
              <tr>
                <th>School</th>
                <td>{userInfo.school}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{userInfo.email}</td>
              </tr>
              <tr>
                <th>Account Type</th>
                <td>{userInfo.accountType}</td>
              </tr>
              <tr>
                <th>Last Password Change</th>
                <td>{userInfo.passwordChange}</td>
              </tr>
              <tr>
                <th>Terms of Use Acceptance</th>
                <td>
                  {userInfo.terms}
                  <p>
                    You must review and accept the
                    <Link to="https://wrds-www.wharton.upenn.edu/users/your-account/#">
                      WRDS Terms of Use
                    </Link>
                    annually.
                  </p>
                </td>
              </tr>
            </tbody>
          </InfoTable>
        </PageContent>
        <PageContent>
          <h2>WRDS Representatives</h2>
          <InfoTable>
            <tbody>
              <tr>
                <th>{userInfo.repName}</th>
                <td>
                  <p onClick={mailTo}>{userInfo.repEmail}</p>
                </td>
              </tr>
            </tbody>
          </InfoTable>
        </PageContent>
      </AccountInfoFrame>
    </>
  );
};

export default AccountInfo;

const AccountInfoFrame = styled.div`
  width: 1140px;
  margin: 0 auto;
  font-weight: bolder;
`;

const PageHeader = styled.h1`
  margin: 15px 0;
  padding-bottom: 15px;
  font-size: 2.5rem;
  line-height: 1.2;
  border-bottom: 1px solid #ddd;
`;

const PageContent = styled.div`
  width: 100%;
  margin-bottom: 3rem;
  color: #212529;

  h2 {
    margin-bottom: 8px;
    font-size: 32px;
    font-weight: bolder;
  }
`;

const InfoTable = styled.table`
  width: 100%;
  text-align: left;
  font-size: 16px;
  border-top: 1px solid #ddd;

  th {
    width: 30%;
    padding: 0.75rem;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
  }

  td {
    width: 70%;
    padding: 0.75rem;
    font-weight: 500;
    line-height: 1.3;
    border-bottom: 1px solid #ddd;
    white-space: pre-line;

    p {
      margin: 0 2px;
      color: #004785;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  tbody tr:nth-child(2n) {
    background-color: #fff;
  }
  tbody tr:nth-child(2n + 1) {
    background-color: #eeedea;
  }
`;
