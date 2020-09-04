import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../config";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";

const SavedQueries = () => {
  const [SavedQueries, setSavedQueries] = useState([]);
  const [sortingField, setSortingField] = useState("QueryRunDate");
  const [order, setOrder] = useState("ascending");

  const loadQueryList = () => {
    axios({
      method: "POST",
      url: `${API}query/`,
      data: {
        access_token: sessionStorage.getItem("access_token"),
      },
    }).then((res) => {
      Object.keys(res.data.data).length !== 0 &&
        setSavedQueries([...res.data.data]);
    });
  };

  useEffect(() => {
    loadQueryList();
  }, []);

  const sortingQueries = (field) => {
    SavedQueries.sort(function (a, b) {
      const compareA = a.created_at;
      const compareB = b.created_at;
      if (field === "created_at") {
        if (order === "ascending") {
          return compareA < compareB ? -1 : compareA > compareB ? 1 : 0;
        } else if (order === "descending") {
          return compareA < compareB ? 1 : compareA > compareB ? -1 : 0;
        }
      } else {
        if (order === "ascending") {
          return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        } else if (order === "descending") {
          return a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0;
        }
      }
    });
  };

  const handleOrder = () => {
    order === "descending" ? setOrder("ascending") : setOrder("descending");
  };

  const ascending = order === "ascending";

  const deleteQuery = (item) => {
    axios({
      method: "DELETE",
      url: `${API}query/`,
      data: {
        access_token: sessionStorage.getItem("access_token"),
        query_name: item,
      },
    }).then(() => loadQueryList());
  };

  return (
    <>
      <Nav />

      <SavedQueriesFrame>
        <h1>Saved Queries</h1>
        <h3>You have {SavedQueries.length} saved queries.</h3>
        {SavedQueries.length === 0 ? (
          <NoQuery>
            <i className="far fa-folder-open fa-2x" />
            <h1>저장된 쿼리가 없습니다.</h1>
          </NoQuery>
        ) : (
          <QueriesTable>
            <thead>
              <tr>
                <th>
                  <ThFrame
                    onClick={() => {
                      sortingQueries("query_name");
                      setSortingField("query_name");
                      handleOrder();
                    }}
                  >
                    <span>Query Name</span>
                    {sortingField === "query_name" ? (
                      ascending ? (
                        <i className="fas fa-sort-alpha-up" />
                      ) : (
                        <i className="fas fa-sort-alpha-down" />
                      )
                    ) : (
                      <i className="fas fa-sort" />
                    )}
                  </ThFrame>
                </th>
                <th>
                  <ThFrame
                    onClick={() => {
                      sortingQueries("data_set");
                      setSortingField("data_set");
                      handleOrder();
                    }}
                  >
                    <span>Data Set</span>
                    {sortingField === "data_set" ? (
                      ascending ? (
                        <i className="fas fa-sort-alpha-up" />
                      ) : (
                        <i className="fas fa-sort-alpha-down" />
                      )
                    ) : (
                      <i className="fas fa-sort" />
                    )}
                  </ThFrame>
                </th>
                <th>
                  <ThFrame
                    onClick={() => {
                      sortingQueries("created_at");
                      setSortingField("created_at");
                      handleOrder();
                    }}
                  >
                    <span>Query Run Date</span>
                    {sortingField === "created_at" ? (
                      ascending ? (
                        <i className="fas fa-sort-alpha-up" />
                      ) : (
                        <i className="fas fa-sort-alpha-down" />
                      )
                    ) : (
                      <i className="fas fa-sort" />
                    )}
                  </ThFrame>
                </th>
                <th>
                  <ThFrame>Functions</ThFrame>
                </th>
              </tr>
            </thead>
            <tbody>
              {SavedQueries.map((item) => {
                return (
                  <tr key={item.query_name}>
                    <td>{item.query_name}</td>
                    <td>{item.data_set}</td>
                    <td>{item.created_at.substring(0, 10)}</td>
                    <td>
                      <Link to={"/CRSP"}>
                        <button>Rerun</button>
                      </Link>
                      <button
                        onClick={() => {
                          deleteQuery(item.query_name);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </QueriesTable>
        )}
      </SavedQueriesFrame>

      <Footer />
    </>
  );
};

export default SavedQueries;

const SavedQueriesFrame = styled.div`
  width: 80%;
  margin: 0 auto;

  h1 {
    margin-top: 30px;
    color: #222;
    font-size: 32px;
    font-weight: 600;
  }

  h3 {
    color: #888;
  }
`;

const NoQuery = styled.section`
  position: relative;
  margin: 20px auto 40px;
  padding: 80px;
  width: 100%;
  color: #888;
  border: 1px solid #888;
  border-radius: 10px;

  i {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin-bottom: 30px;
  }

  h1 {
    color: #888;
    font-size: 24px;
    font-weight: 400;
    line-height: 2;
    text-align: center;
  }
`;

const QueriesTable = styled.table`
  margin: 20px auto 40px;
  width: 100%;

  thead {
    tr {
      color: white;
      background-color: #002c77;

      th {
        border: 1px solid #ddd;
        cursor: pointer;

        &:hover {
          background-color: #003ba1;
        }
      }
    }
  }

  tbody {
    tr {
      &:hover {
        background-color: #f7f7f7;
      }

      td {
        padding: 5px 20px;
        border-bottom: 1px solid #cdced1;
        font-size: 14px;

        button {
          margin-right: 5px;
          padding: 1px 10px;
          font-size: 14px;
          color: white;
          background-color: #093073;
          border-radius: 5px;
          border: 1px solid #093073;
          outline: none;
          cursor: pointer;

          &:hover {
            color: #093073;
            background-color: white;
          }
        }
      }
    }
  }
`;

const ThFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  i {
    opacity: 0.7;
    width: 5px;
  }
`;
