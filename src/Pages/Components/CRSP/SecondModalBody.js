import React from "react";

export const FirstBody = (
  <>
    <p>
      The Company Code Lookup Toll is designed to find all identifiers
      associated with a specific company. This tool can retrieve identifiers for
      multiple companies and then add the codes directly to your query. You can
      also use this toll to save and download codes for future queries.
      Downloaded codes are saved in the text (.txt) file format.
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
