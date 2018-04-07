import React from 'react';

const Pagination = (props) => {
  const handleKeyPress = (e) => {

    if(e.target.value.length <= 0) return;
    if(e.target.value.length > 3) return;
    if((/^(\s*|\d+)$/).test(e.target.value)) {
      props.changeLimit(e.target.value)
    }
  }

  return (
    <div className="pagination">
      <form className="pagination__form">
        <input onKeyUp={handleKeyPress} type="text" className="pagination__input" />
      </form>
      <div className="pagination__btn">
        <span onClick={props.prev}className="pagination__nav pagination__nav--left lnr lnr-chevron-left"></span>
        <span onClick={props.next} className="pagination__nav pagination__nav--right lnr lnr-chevron-right"></span>
      </div>
    </div>
  )
}

export default Pagination;
