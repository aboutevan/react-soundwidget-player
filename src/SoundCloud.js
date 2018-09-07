import React, { Component } from 'react';
// import SC from 'soundcloud-widget';
import { loadSC } from './utils.js';
import Play from './Play';

export default class extends Component {
  constructor() {
    super();
    this.iframe = React.createRef();
    this.events = this.events.bind(this);


    this.state = {
      widget: null,
      duration: 0,
      position: 0,
      loaded: false,
      playing: false,
      volume: 0,
    };

  }
  componentDidMount() {

    loadSC().then(SC => {
      this.iframe.current.src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/483381339';
      const widget = SC.Widget(this.iframe.current);

      widget.bind(SC.Widget.Events.READY, () => {
        this.setState({
          widget: widget,
        });
        widget.getDuration(dur => this.setState({duration: dur}));
        widget.getPosition(dur => this.setState({position: dur}));
        widget.getVolume(vol => this.setState({volume: vol, loaded: true}));

        // t500x500: 500×500
        // large: 100×100 (default)
        // small: 32×32

        const lg = 't500x500';
        widget.getCurrentSound((x) => {
          const { artwork_url, title, user } = x;

          if (artwork_url) {
            const y = artwork_url.split('.');
            const word = y[y.length - 2].split('-').pop();
            const url = artwork_url.replace(word, lg)
          }
        })
      })

    });

  }

  events() {
    return {
      togglePlay: () => {
        this.state.widget.toggle();
      },
      seek: (num) => {
        this.state.widget.seekTo(this.state.duration * num)
      },
      setVolume: (num) => {
        this.state.widget.setVolume(num * 100);
      }
    }
  }


  render() {
    return <div style={{overflow: 'hidden'}}>
      <iframe style={{position: 'relative', left: '-0'}} src={''} ref={this.iframe} />
      {this.props.loader && !this.state.loaded &&
        this.props.loader()
      }
      {this.state.loaded && this.props.children(
          {...this.state, ...this.events()}
      )}
    </div>
  }
}
