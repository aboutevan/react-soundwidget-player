import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {loadSC} from './utils.js';

export default class SoundCloud extends Component {
  static propTypes = {
    loader: PropTypes.func,
    children: PropTypes.func,
  };

  constructor() {
    super();
    this.iframe = React.createRef();
    this.events = this.events.bind(this);

    this.state = {
      widget: null,
      duration: 0,
      position: 0,
      progress: 0,
      loaded: false,
      playing: false,
      volume: 0,
    };

  }

  componentDidMount() {

    loadSC().then(SC => {
      this.iframe.current.src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/483381339`;
      const widget = SC.Widget(this.iframe.current);

      widget.bind(SC.Widget.Events.READY, () => {
        this.setState({
          widget: widget,
        });
        widget.getDuration(dur => this.setState({duration: dur}));
        // widget.getPosition(dur => this.setState({position: dur}));
        widget.getVolume(vol => this.setState({volume: vol, loaded: true}));


        widget.bind(SC.Widget.Events.PLAY, (e) => {
          this.setState({
            playing: true,
          })
        });

        widget.bind(SC.Widget.Events.PAUSE, (e) => {
          this.setState({
            playing: false,
          })
        });

        widget.bind(SC.Widget.Events.PLAY_PROGRESS, (x) => {
          this.setState({
            progress: x,
          });
        });

        // t500x500: 500×500
        // large: 100×100 (default)
        // small: 32×32

        const lg = `t500x500`;
        widget.getCurrentSound((x) => {
          const {artwork_url, title, user} = x;

          if (artwork_url) {
            const y = artwork_url.split(`.`);
            const word = y[y.length - 2].split(`-`).pop();
            const url = artwork_url.replace(word, lg);
          }
        });
      });

    });

  }

  events() {
    return {
      togglePlay: () => {
        this.state.widget.toggle();
      },
      seek: (num) => {
        this.state.widget.seekTo(this.state.duration * num);
      },
      setVolume: (num) => {
        this.state.widget.setVolume(num * 100);
      },
    };
  }

  render() {
    return (
        <div style={{overflow: `hidden`}}>
          <iframe style={{position: `relative`, left: `-0`}}
                  src={``}
                  ref={this.iframe}
          />
          {this.props.loader && !this.state.loaded &&
          this.props.loader()
          }
          {this.state.loaded && this.props.children(
              {...this.state, ...this.events()},
          )}
        </div>
    );
  }
}
