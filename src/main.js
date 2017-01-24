const React = require('react');
const ReactDOM = require('react-dom');

require('./styles.scss');

const Game = require('./components/Game/index');

ReactDOM.render(
  <Game />,
  document.getElementById('app')
);
