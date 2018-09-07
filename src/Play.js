import React from 'react';

const Play = ({togglePlay, styles, children}) => {
  return (
        <button style={styles}
            className={'blue'} onClick={() => togglePlay()}>
          {!children &&
            <p>PLAY</p>
          }
          {children}
        </button>
  )
}

export default Play;