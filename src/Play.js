import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const buttonCss = {
  background: `none`,
  padding: 0,
  outline: `none`,
  border: `none`,
};

const Play = ({togglePlay, playing, styles, children}) => {
  return (
        <button style={{...buttonCss}}
          onClick={() => togglePlay()}
        >
          {!children && (playing && <div>pause</div>) || (!playing && <div>play</div>)}
          {children}
        </button>
  );
};

Play.propTypes = {
  togglePlay: PropTypes.func,
  styles: PropTypes.object,
  children: PropTypes.any
};

export default Play;