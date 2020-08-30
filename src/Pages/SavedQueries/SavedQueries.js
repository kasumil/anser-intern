import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// import { DELETE_QUERY_API } from "../../config";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";

const SavedQueries = () => {
  const [SavedQueries, setSavedQueries] = useState([]);
  const [sortingField, setSortingField] = useState("QueryRunDate");
  const [order, setOrder] = useState("ascending");

  useEffect(() => {
    axios.get("/data/savedqueries.json").then((res) => {
      setSavedQueries(res.data.data);
    });
  }, []);

  const sortingQueries = (field) => {
    SavedQueries.sort(function (a, b) {
      const splitA = Date.parse(a.QueryRunDate.split(" ").reverse().join(" "));
      const splitB = Date.parse(b.QueryRunDate.split(" ").reverse().join(" "));
      if (field === "QueryRunDate") {
        if (order === "ascending") {
          return splitA < splitB ? -1 : splitA > splitB ? 1 : 0;
        } else if (order === "descending") {
          return splitA < splitB ? 1 : splitA > splitB ? -1 : 0;
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

  // const deleteQuery = (id) => {
  //   axios({
  //     method: "post",
  //     url: DELETE_QUERY_API,
  //     data: JSON.stringify({ id: id }),
  //   });
  // };

  return (
    <>
      <Nav />
      <SavedQueriesFrame>
        <h1>Saved Queries</h1>
        <h3>You have {SavedQueries.length} saved queries.</h3>
        <QueriesTable>
          <thead>
            <tr>
              <th>
                <ThFrame
                  onClick={() => {
                    sortingQueries("QueryName");
                    setSortingField("QueryName");
                    handleOrder();
                  }}
                >
                  <span>Query Name</span>
                  {sortingField === "QueryName" ? (
                    ascending ? (
                      <i className="fas fa-sort-alpha-up"></i>
                    ) : (
                      <i className="fas fa-sort-alpha-down"></i>
                    )
                  ) : (
                    <i className="fas fa-sort" />
                  )}
                </ThFrame>
              </th>
              <th>
                <ThFrame
                  onClick={() => {
                    sortingQueries("DataSet");
                    setSortingField("DataSet");
                    handleOrder();
                  }}
                >
                  <span>Data Set</span>
                  {sortingField === "DataSet" ? (
                    ascending ? (
                      <i class="fas fa-sort-alpha-up"></i>
                    ) : (
                      <i class="fas fa-sort-alpha-down"></i>
                    )
                  ) : (
                    <i className="fas fa-sort" />
                  )}
                </ThFrame>
              </th>
              <th>
                <ThFrame
                  onClick={() => {
                    sortingQueries("QueryRunDate");
                    setSortingField("QueryRunDate");
                    handleOrder();
                  }}
                >
                  <span>Query Run Date</span>
                  {sortingField === "QueryRunDate" ? (
                    ascending ? (
                      <i className="fas fa-sort-alpha-up"></i>
                    ) : (
                      <i className="fas fa-sort-alpha-down"></i>
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
                <tr key={item.id}>
                  <td>{item.QueryName}</td>
                  <td>{item.DataSet}</td>
                  <td>{item.QueryRunDate}</td>
                  <td>
                    <Link to={"/CRSP"}>
                      <button>Rerun</button>
                    </Link>
                    <button onClick={() => {}}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </QueriesTable>
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
