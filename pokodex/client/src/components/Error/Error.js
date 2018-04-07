import React from 'react';


const Error = (props) => {
  const { name, message } = props;
  return(
    <div className="error">
      <p className="error__name">{name}</p>
      <p className="error__message">{message}</p>
    </div>
  );
}

export default Error;
