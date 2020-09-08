import React from "react";
import styled from "styled-components";

const SmallTableData = ({ data, checked, setChecked }) => {
  const checkItem = (item) => {
    checked.includes(item)
      ? setChecked(checked.filter((el) => el !== item))
      : setChecked([...checked, item]);
  };

  return (
    <TableRow>
      <td>
        <input
          type="checkbox"
          checked={checked.includes(data.corp_code)}
          onChange={() => checkItem(data.corp_code)}
        />
      </td>
      <td>{data.corp_code}</td>
      <td>{data.corp_name}</td>
      <td>{data.stock_code}</td>
      <td>{data.firmcode}</td>
    </TableRow>
  );
};

export default SmallTableData;

const TableRow = styled.tr`
  font-size: 16px;
  font-weight: 400;

  td {
    padding: 3px;
    width: 25%;
    border: 1px solid #888;
  }
`;
