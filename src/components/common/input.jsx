import React from "react";

const Input = ({ name, error, ...rest }) => {
  return (
    <React.Fragment>
      <input {...rest} name={name} id={name} />
      {error && <div>{error}</div>}
    </React.Fragment>
  );
};

export default Input;
