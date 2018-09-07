import React, { Component } from 'react';

const styles1 = {
  height: `20px`,
  width: `20px`,
  background: `yellow`,
  borderRadius: `50%`,
};

const styles2 = {
  position: `relative`,
  height: `20px`,
  width: `50%`,
  marginLeft: `50px`,
  background: `green`,
  borderRadius: `20px`,
};

export default class extends Component {

  constructor(props){
    super(props);

    this.state = {
      dragging: false,
      relativeXPos: 0,
      xPos: 98,
      seekPos: 0,
    };

    this.outerRef = React.createRef();
    this.innerRef = React.createRef();

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  getOuterWidth = () => this.outerRef.current.getBoundingClientRect().width;
  getOuterXOffset = () => this.outerRef.current.getBoundingClientRect().x;
  getInnerWidth = () => this.innerRef.current.getBoundingClientRect().width;
  setXPos = (e, relPos) =>
      ((e.pageX - relPos - this.getOuterXOffset()) / this.getOuterWidth()) * 100;
  setSeekPos = (e) => (e.pageX - this.getOuterXOffset()) / this.getOuterWidth();
  maxThreshold = () => this.state.xPos + this.getInnerWidth() / this.getOuterWidth() * 100;

  handleMouseDown(e) {
    const relPos = this.getInnerWidth() * 0.5;
    this.setState({
      dragging: true,
      relativeXPos: relPos,
      xPos: this.setXPos(e, relPos),
      seekPos: this.setSeekPos(e),
    });
  }

  handleMouseUp() {
    this.setState({
      dragging: false,
    }, () => this.props.setVolume(this.state.seekPos));
  }

  handleMouseMove(e) {
    if (!this.state.dragging)  {
      return;
    }
    const relPos = this.getInnerWidth() * 0.5;
    this.setState({
      xPos: this.setXPos(e, relPos),
      seekPos: this.setSeekPos(e)
    }, () => this.props.setVolume(this.state.seekPos));
  }

  componentDidUpdate() {
    if (this.state.dragging) {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    } else {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }

    if (this.maxThreshold() > 100) {
      this.setState({
        xPos: 100 - (this.getInnerWidth() / this.getOuterWidth() * 100)
      });
    }

    if (this.state.xPos < 0) {
      this.setState({
        xPos: 0,
      })
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
              position: 'relative',
              ...styles2
            }}
          >
            <div ref={this.innerRef}
                    style={{
                      position: 'absolute',
                      left: `calc(${this.state.xPos}% `,
                      ...styles1
                    }}
                    />
          </div>
        </div>
    )
  }
}
