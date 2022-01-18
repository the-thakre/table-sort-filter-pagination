import React from "react";

const Search = (props) => {
  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Search....  "
        style={{ margin: "10px auto", width: "40%" }}
        onChange={(e) => {
          props.setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
