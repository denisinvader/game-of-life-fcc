const React = require('react');
const GameOfLife = require('../../classes/GameOfLife.js');
const GameBoard = require('../GameBoard/index');
const GameControls = require('../GameControls/index');

require('./style.scss');

const App = React.createClass({
  getInitialState () {
    let size = 50;
    let gameHandler = new GameOfLife(size, true);
    let refreshTime = 100;
    let interval = setInterval(this.nextTic, refreshTime);
    let generation = 0;

    return {
      size: size,
      gameHandler: gameHandler,
      interval: interval,
      refreshTime: refreshTime,
      generation: generation
    }
  },

  cellClickHandler (e, i, j) {
    this.setState({
      gameHandler: this.state.gameHandler.toggleLifeInCell(i, j)
    });

    e.target.classList.toggle('game-of-life-board__cell_live');
  },

  nextTic () {
    this.setState({
      gameHandler: this.state.gameHandler.getNextGeneration(),
      generation: this.state.generation + 1
    });
  },

  play () {
    if (this.state.interval)
      return;

    let newInterval = setInterval(this.nextTic, this.state.refreshTime);
    this.setState({ interval: newInterval });
  },

  pause () {
    if (!this.state.interval)
      return;

    clearInterval(this.state.interval);
    this.setState({ interval: null });
  },

  clear () {
    this.pause();
    this.setState({
      gameHandler: this.state.gameHandler.clearMatrix(),
      generation: 0
    });
  },

  randomize () {
    this.clear();
    this.setState({ gameHandler: this.state.gameHandler.randomizeMatrix() });
  },

  changeSize (newSize) {
    this.clear();
    this.setState({
      size: newSize,
      gameHandler: new GameOfLife(newSize, false)
    });
  },

  changeTime (newTime) {
    let newInterval = null;

    if (this.state.interval) {
      this.pause();
      newInterval = setInterval(this.nextTic, newTime);
    }

    this.setState({
      interval: newInterval,
      refreshTime: newTime
    });
  },

  render () {

    return (
      <div className="game-of-life">
        <div className="game-of-life__controls">
          <h1>Game of Life</h1>
          <GameControls onPlay={this.play}
                        onPause={this.pause}
                        onClear={this.clear}
                        onRandomize={this.randomize}
                        onChangeSize={this.changeSize}
                        onChangeTime={this.changeTime}
                        interval={this.state.interval}
                        size={this.state.size}
                        refreshTime={this.state.refreshTime} />
        </div>

        <div className="game-of-life__board">
          <div className="game-of-life__generation-counter">Generation: {this.state.generation}</div>
          <GameBoard  matrix={this.state.gameHandler.getMatrix()}
                      size={this.state.size}
                      onCellClick={this.cellClickHandler} />
        </div>
      </div>
    );
  }
});

module.exports = App;