import React from 'react';
import SoundCloud from './SoundCloud';
import Play from './Play';
import './styles.css';
import Progress from './Progress';
import Volume from './Volume';

const playButtonStyles = {
  background: `red`,
  padding: `40px`
};

const Example = () => {
  return (
      <div>
        <SoundCloud loader={() => <h1>loading</h1>}>
          {({
              togglePlay,
              seek,
              setVolume,
              progress,
              duration,
              playing,
            }) => (
              <div className="blue">
                <Play togglePlay={togglePlay}
                      playing={playing}
                      styles={playButtonStyles}
                />
                <Progress seek={seek} progress={progress} duration={duration} />
                <Volume setVolume={setVolume} />
              </div>
          )}
        </SoundCloud>
      </div>
  );
};

export default Example;
