import React from 'react';

const Loader = (props) => {

  const { isLoading } = props;

  if(isLoading) {
    return (
      <div className="loader">
        <div className="loader__bounce">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }
}

export default Loader
