import React, { Component } from 'react';
import SoundCloud from './SoundCloud';
import Play from './Play';
import './styles.css'
import Progress from './Progress';
import Volume from './Volume';

const styles = {
  background: 'red',
  padding: `40px`
};

const Example = (props) => {
  return (
      <div>
        <SoundCloud loader={() => <h1>loading</h1>}>
          {({
              widget,
              playing,
              togglePlay,
              seek,
              volume,
              setVolume,
              duration,
            }) => (
              <div className="blue">
                <Play togglePlay={togglePlay}
                      styles={styles}
                />
                <Progress seek={seek} />
                <Volume setVolume={setVolume} />
              </div>
          )}
        </SoundCloud>
      </div>
  )
}
export default Example

