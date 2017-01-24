const React = require('react');

require('./style.scss');

const GameControls = React.createClass({
  getInitialState () {
    return {
      playing: this.props.interval,
      currentSize: this.props.size,
      currentInterval: this.props.refreshTime
    };
  },

  componentWillReceiveProps (nextProps) {
    this.setState({
      playing: nextProps.interval,
      currentSize: nextProps.size,
      currentInterval: nextProps.refreshTime
    });
  },

  changeSize (e) {
    this.props.onChangeSize(parseInt(e.target.value))
  },

  changeTime (e) {
    this.props.onChangeTime(parseInt(e.target.value))
  },

  render () {
    return (
      <div className="game-of-life-controls">
        <fieldset className="game-of-life-controls__fieldset">
          <legend>Controls:</legend>
          <button className="game-of-life-controls__button"
                  onClick={this.props.onPlay}
                  disabled={this.state.playing}>Play</button>
          <button className="game-of-life-controls__button"
                  onClick={this.props.onPause}
                  disabled={!this.state.playing}>Pause</button>
          <button className="game-of-life-controls__button"
                  onClick={this.props.onClear}
                  disabled={this.state.playing}>Clear</button>
          <button className="game-of-life-controls__button"
                  onClick={this.props.onRandomize}
                  disabled={this.state.playing}>Random</button>
        </fieldset>
        <fieldset disabled={this.state.playing} className="game-of-life-controls__fieldset">
          <legend>Settings:</legend>
          <div className="game-of-life-controls__input-container">
            Board size:
            <select onChange={this.changeSize}
                    value={this.state.currentSize}
                    className="game-of-life-controls__input">
              <option value="30">30x30 cells</option>
              <option value="50">50x50 cells</option>
              <option value="70">70x70 cells</option>
            </select>
          </div>
          <div className="game-of-life-controls__input-container">
            Refresh every:
            <select onChange={this.changeTime}
                    value={this.state.currentInterval}
                    className="game-of-life-controls__input">
              <option value="100">100 ms</option>
              <option value="500">500 ms</option>
              <option value="1000">1000 ms</option>
            </select>
          </div>
        </fieldset>
      </div>
    );
  }
});

module.exports = GameControls;