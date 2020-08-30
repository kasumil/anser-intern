import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { INPUT_LIST } from "../../../config";

function StepOne(props) {
  const date = new Date();
  const lastYear = date.getFullYear() - 1;
  const defalutYear = date.getFullYear() - 13;
  const [startDate, setStartDate] = useState(new Date(`${defalutYear}-01-01`));
  const [endDate, setEndDate] = useState(new Date(`${lastYear}-12-31`));
  const [mini, setMini] = useState(false);
  const [maxi, setMaxi] = useState(false);
  const [check, setCheck] = useState("");
  const [comp, setComp] = useState();

  useEffect(() => {
    fetch(INPUT_LIST)
      .then((res) => res.json())
      .then((res) => {
        setComp(res);
      });
  }, []);

  const valuedetector = (e) => {
    const { name, value } = e.target;
    setCheck({ [name]: value });
  };

  //자식에서 부모 컴포넌트로 값 보내기.
  const onFormSubmit = (e, value) => {
    props.onGetSubmit((startDate, endDate, check));
  };

  return (
    <>
      <div>
        <StepOnePart>
          <div>
            <BoldWrite>Step 1:</BoldWrite>
            <SpanTitle> Choose your date range.</SpanTitle>
          </div>
          <DateRangeWrap>
            <DateRangeRow>
              <DateRangeTitle>Date range</DateRangeTitle>
              <DateWrap>
                <div
                  onMouseEnter={() => setMini(true)}
                  onMouseLeave={() => setMini(false)}
                >
                  <DatePicker
                    className="datepickersize"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date("1925-12-31")}
                    maxDate={new Date(endDate)}
                    onSelect={() => onFormSubmit(startDate)}
                    dateFormat="yyyy-MM-dd"
                    dropdownMode="select"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    placeholderText=" Effective date"
                  />
                </div>
                <HiddenMiniDate mini={mini}>
                  Minimum allowed date: 1925-12-31
                </HiddenMiniDate>
                <SpanBox>to</SpanBox>
                <div
                  onMouseEnter={() => setMaxi(true)}
                  onMouseLeave={() => setMaxi(false)}
                >
                  <DatePicker
                    className="datepickersize"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    changeMonth="true"
                    changeYear="true"
                    minDate={new Date(startDate)}
                    maxDate={new Date(`${lastYear}-12-31`)}
                    onSelect={() => onFormSubmit(endDate)}
                    dateFormat="yyyy-MM-dd"
                    dropdownMode="select"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    placeholderText=" Expiration date"
                  />
                </div>
                <HiddenMaxiDate className="maxi" maxi={maxi}>
                  Maximum allowed date: {lastYear}-12-31
                </HiddenMaxiDate>
              </DateWrap>
            </DateRangeRow>
          </DateRangeWrap>
        </StepOnePart>
        <div>
          <MarginTop>
            <div>
              <Strongtitle>Step 2:</Strongtitle>
              <SpanContent> Apply your company codes.</SpanContent>
            </div>
            <div>
              <Unorderedlist>
                {comp &&
                  comp.Complist.map((el, index) => {
                    return (
                      <Inputlist key={index}>
                        <InputBtn
                          id={el.id}
                          name="comp"
                          type="radio"
                          value={el.value}
                          autocomplete="off"
                          checked={check && check.comp === el.value}
                          onChange={valuedetector}
                          onClick={() => onFormSubmit(comp)}
                        />
                        &nbsp;
                        <LabelName id="TICKER">{el.id}</LabelName>
                      </Inputlist>
                    );
                  })}
              </Unorderedlist>
            </div>
          </MarginTop>
        </div>
      </div>
    </>
  );
}

export default StepOne;

//Step One부분
const StepOnePart = styled.div`
  margin-top: 30px;
`;

const BoldWrite = styled.strong`
  font-size: 20px;
  font-weight: bold;
`;

const SpanTitle = styled.span`
  font-size: 20px;
`;

//데이트피커 부분
const DateRangeWrap = styled.div`
  margin: 0 -15px;
`;

const DateRangeRow = styled.div`
  width: 50%;
  position: relative;
  min-height: 1px;
  padding: 0 15px;
`;

const DateWrap = styled.div`
  display: flex;

  .datepickersize {
    height: 36px;
    padding: 8px 12px;
    font-size: 12px;
    line-height: 1.5;
    background-color: #fff;
    border: 1px solid #ccc;
  }
`;

const DateRangeTitle = styled.label`
  color: black;
  display: inline-block;
  margin-bottom: 0;
  padding-top: 9px;
  height: 32px;
  text-align: right;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const HiddenMiniDate = styled.div`
  display: ${(props) => (props.mini || props.maxi ? "flex" : "none")};
  position: absolute;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: black;
  width: 200px;
  height: 39px;
  top: -9px;
  left: -3.5px;
  margin-top: -3px;
  padding: 5px 0;
  opacity: 0.8;
  z-index: 1070;
  line-height: 1.4;
  font-size: 12px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const HiddenMaxiDate = styled(HiddenMiniDate)`
  left: 211px;
`;

const SpanBox = styled.span`
  color: #aaaaaa;
  background-color: #eeeeee;
  border: 1px solid #ccc;
  font-size: 14px;
  text-align: center;
  width: 9%;
  line-height: 18px;
  padding: 8px 12px;
  white-space: nowrap;
  vertical-align: middle;
`;

//파트 2부분
const MarginTop = styled.div`
  margin-top: 30px;
`;

const Strongtitle = styled.strong`
  font-size: 20px;
  font-weight: bold;
`;

const SpanContent = styled.span`
  font-size: 20px;
`;

const Unorderedlist = styled.ul`
  margin: 15px 0;
  padding-left: 0;
  list-style: none;
  display: flex;
`;

const Inputlist = styled.li`
  margin-right: 10px;
  padding: 0 5px;
  height: 29px;
  display: flex;
  align-items: center;
`;

const InputBtn = styled.input`
  margin: 0;
`;

const LabelName = styled.label`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
`;
