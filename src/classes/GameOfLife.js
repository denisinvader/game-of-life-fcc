class GameOfLife {
  constructor(size = 50, randomize = false) {
    this.size = size;
    this.matrix = new Array(size);
    for(let i = 0; i < this.matrix.length; i++) {
      this.matrix[i] = new Array(size);

      for (let j = 0; j < this.matrix[i].length; j++)
        this.matrix[i][j] = 0;
    }

    if (randomize)
      this.randomizeMatrix();
  }

  randomizeMatrix (percent = 40) {
    let count = Math.floor(Math.random() * this.size * this.size * (percent / 100));

    for (let i = 0; i < count; i++) {
      let index = {
        i: Math.floor(Math.random() * this.size),
        j: Math.floor(Math.random() * this.size)
      }

      this.matrix[index.i][index.j] = 1;
    }

    return this;
  }

  clearMatrix () {
    for (let i = 0; i < this.matrix.length; i++)
      for (let j = 0; j < this.matrix[i].length; j++)
        this.matrix[i][j] = 0;

    return this;
  }

  toggleLifeInCell (i, j) {
    this.matrix[i][j] = 1 - this.matrix[i][j];

    return this;
  }

  getNextGeneration () {
    const oldMatrix = JSON.parse(JSON.stringify(this.matrix));

    for (let i = 0; i < this.matrix.length; i++)
      for (let j = 0; j < this.matrix[i].length; j++) {
        const neighborsCount = this.getNeighborsCount(i, j, oldMatrix);

        if (this.matrix[i][j]) {
          if (neighborsCount < 2 || neighborsCount > 3)
            this.toggleLifeInCell(i, j);
        } else {
          if (neighborsCount === 3)
            this.toggleLifeInCell(i, j);
        }
      }

    return this;
  }

  getNeighborsCount (i, j, matrix) {
    return (
      // top left
      matrix[i > 0 ? i - 1 : matrix.length - 1][j > 0 ? j - 1 : matrix.length - 1] +
      // top
      matrix[i > 0 ? i - 1 : matrix.length - 1][j] +
      // top right
      matrix[i > 0 ? i - 1 : matrix.length - 1][j < matrix.length - 1 ? j + 1 : 0] +
      // right
      matrix[i][j < matrix.length - 1 ? j + 1 : 0] +
      // bottom right
      matrix[i < matrix.length - 1 ? i + 1 : 0][j < matrix.length - 1 ? j + 1 : 0] +
      // bottom
      matrix[i < matrix.length - 1 ? i + 1 : 0][j] +
      // bottom left
      matrix[i < matrix.length - 1 ? i + 1 : 0][j > 0 ? j - 1 : matrix.length - 1] +
      // left
      matrix[i][j > 0 ? j - 1 : matrix.length - 1]
    );
  }

  getMatrix () {
    return this.matrix;
  }
}

module.exports = GameOfLife;