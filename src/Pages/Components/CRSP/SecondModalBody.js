import React from "react";

export const FirstBody = (
  <>
    <p>
      여러분은 이 화면에서 원하는 <br/>회사의 식별자를 검색하실 수 있습니다.
      <br/>다수의 기업을 동시에 찾는 것은 물론이고,
      검색한 기업들을 여러분의 질의에 바로 연동시키는 것도 가능하며,
      그 목록을 저장하고 다운로드하실 수도 있습니다.<br/>
      다운로드받은 리스트는 텍스트파일 형식(*.txt)으로 저장됩니다.
    </p>
    <ol>
      <li>
        Start by entering a company name (or part of the name) into the search
        box above.
      </li>
      <li>
        After the results are displayed, make your selections and chose an
        identifier.
      </li>
      <li>Next, refine your list of codes or add more.</li>
      <li>
        Last, choose whether to insert your selections into your web query or to
        download them as a text file for later use.
      </li>
    </ol>
  </>
);

export const SecondBody = (
  <>
    <p>
      Do you know an identifier and nothing else? You can use search operators
      to look up the rest of the information for your search. Use the name of
      the identifier followed by a colon, then the code.
    </p>
    <p>
      For example, to find the company Apple Computing using its ticker symbol,
      one would enter the following information:
    </p>
    <p>
      <code>ticker:aapl</code>
    </p>
    <p>You can also search for multiple companies by using a comma:</p>
    <p>
      <code>ticker:aapl,fb,goog</code>
    </p>
    <p>You do not need to use spaces when searching by identifiers.</p>
  </>
);

export const ThirdBody = (
  <>
    <p>
      cusip_full:037833100,459200101,594918104
      <br />
      entity_name:APPLE
      <br />
      permco:20990
      <br />
      permno:12490
      <br />
      sic:6000,6021
      <br />
      ticker:IBM,MSFT,DELL
    </p>
  </>
);
