import React, { Component } from 'react';
import PropTypes from 'prop-types';


const styles1 = {
  height: `20px`,
  background: `yellow`,
  // transition: `width 0.1s linear`
};

const styles2 = {
  position: `relative`,
  height: `10px`,
  width: `50%`,
  marginLeft: `50px`,
  background: `green`,
  borderRadius: `20px`,
  overflow: `hidden`,
  cursor: `pointer`,
};

export default class Progress extends Component {

  static propTypes = {
    progress: PropTypes.number,
    seek: PropTypes.func,
    duration: PropTypes.number
  };

  constructor(props){
    super(props);

    this.state = {
      dragging: false,
      xPos: 0,
      seekPos: 0,
    };

    this.outerRef = React.createRef();

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  getOuterWidth = () => this.outerRef.current.getBoundingClientRect().width;
  getOuterXOffset = () => this.outerRef.current.getBoundingClientRect().x;
  setSeekPos = (e) => (e.pageX - this.getOuterXOffset()) / this.getOuterWidth();

  handleMouseDown() {
    this.setState({
      dragging: true,
    });
  }

  handleMouseUp(e) {
    if (!this.state.dragging) {
      return;
    }

    this.setState({
      dragging: false,
      seekPos: this.setSeekPos(e),
    }, () => this.props.seek(this.state.seekPos));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      // console.log((this.props.progress.currentPosition / this.props.duration) * 100)
      this.setState({seekPos: (this.props.progress.currentPosition / this.props.duration)});
    }
  }

  render() {
    return (
        <div>
          <div
            ref={this.outerRef}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            style={{
              position: `relative`,
              ...styles2
            }}
          >
            <div ref={this.innerRef}
                    style={{
                      position: `absolute`,
                      left: 0,
                      width: `${this.state.seekPos * 100}%`,
                      ...styles1
                    }}
                    />
          </div>
        </div>
    );
  }
}
