import React from 'react';

class Pagination extends React.Component {

  state = {
    selectedValue: 10,
    isVisible: false
  }

  limits = [10,20,40,60];

  // handleKeyPress = (e) => {

  //   if(e.target.value.length <= 0) return;
  //   if(e.target.value.length > 3) return;
  //   if((/^(\s*|\d+)$/).test(e.target.value)) {
  //     this.props.changeLimit(e.target.value)
  //   }
  // }

  toggleVisiblity = () => {
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible
    }))
  }

  setLimit = (limit) => {
    this.setState(() => ({
      selectedValue: limit
    }), () => {
      this.toggleVisiblity();
      this.props.changeLimit(this.state.selectedValue);
    });
  }
  render() {
    const { isVisible } = this.state;
    return (
      <div className="pagination">

        <div className="dropdown">
          <p onClick={this.toggleVisiblity} className="dropdown__select">{this.state.selectedValue} <span className="dropdown__select--icon fas fa-chevron-down"></span></p>
          <div className={isVisible ? "dropdown__drop dropdown__drop--isVisible" : "dropdown__drop"}>
            {
              this.limits.map((limit,i) => (<p onClick={() => this.setLimit(limit)} className="dropdown__val" key={i}>{limit}</p>))
            }
          </div>
        </div>

        <div className="pagination__btn">
          <span onClick={this.props.prev} className="pagination__nav pagination__nav--left fas fa-chevron-left"></span>
          <span onClick={this.props.next} className="pagination__nav pagination__nav--right fas fa-chevron-right"></span>
        </div>
      </div>
    )
  }
}

export default Pagination;
