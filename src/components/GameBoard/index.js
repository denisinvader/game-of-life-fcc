const React = require('react');

require('./style.scss');

const GameBoard = React.createClass({
  cellClickHandler (e, i, j) {
    this.props.onCellClick(e, i, j);
  },

  render () {
    const gameMatrix = this.props.matrix;

    let gameRows = [];
    for (let i = 0; i < gameMatrix.length; i++) {
      let cells = [];

      for (let j = 0; j < gameMatrix[i].length; j++)
        cells.push(
          <div  className={'game-of-life-board__cell' + (gameMatrix[i][j] ? ' game-of-life-board__cell_live' : '')}
                onMouseDown={e => this.cellClickHandler(e, i, j)}></div>
        );

      gameRows.push(
        <div className="game-of-life-board__row">{cells}</div>
      );
    }

    return (
      <div className="game-of-life-board" style={{width: `${10 * this.props.size}px`}}>
        {gameRows}
      </div>
    );
  }
});

module.exports = GameBoard;