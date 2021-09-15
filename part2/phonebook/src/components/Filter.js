import React from "react";

const Filter = ({ inputValue, inputChange }) => {
    return (
        <div>
          <span>filter shown with </span>
          <input value={inputValue} onChange={inputChange} />
        </div>
    )
}

export default Filter;