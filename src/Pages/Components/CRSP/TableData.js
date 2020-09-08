import React from "react";

const TableData = ({ idx, data, checked, handleEachCheck }) => {
  return (
    <tr>
      <td className="thCheck">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => handleEachCheck(idx)}
        />
      </td>
      <td className="companyName">{data.corp_code}</td>
      <td className="general">{data.corp_name}</td>
      <td className="general">{data.stock_code}</td>
      <td className="general">{data.firmcode}</td>
    </tr>
  );
};

export default TableData;
