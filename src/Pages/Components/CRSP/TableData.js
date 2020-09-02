import React, { useState } from "react";

const TableData = ({
  data,
  allCheck,
  checkedData,
  setCheckedData,
  identifier,
}) => {
  const [eachCheck, setEachCheck] = useState(false);

  const handleEachCheck = (data) => {
    setEachCheck(!eachCheck);
    setCheckedData([...new Set([...checkedData, data])]);
  };

  return (
    <tr>
      <td className="thCheck">
        <input
          type="checkbox"
          checked={allCheck || eachCheck}
          onChange={() => handleEachCheck(data[identifier])}
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
