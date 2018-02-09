import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={()=>{this.props.onClick(i)}}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isXnext : true,
      currentMove : 0,
      history : [{
        squares: Array(9).fill(null)
      }]
    }
  }

  handleClick(i) {
    const squares = this.state.history[this.state.currentMove].squares.slice();
    const newHistory = this.state.history.slice();
    newHistory.splice(this.state.currentMove + 1, this.state.history.length, {squares : squares});
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isXnext ? 'X' : 'O';
    this.setState({
      //history: this.state.history.splice(this.state.currentMove + 1, 0, squares),
      history: newHistory.slice(),
      currentMove: this.state.currentMove + 1,
      isXnext: !this.state.isXnext
    })
  }

  jumpTo(i) {
    this.setState({
      currentMove : i,
      isXnext : (i % 2) === 0,
    })
  }

  render() {
    const moves = this.state.history.map((currMove, moveIdx)=>{
      const moveList = moveIdx ? "go to move " + moveIdx : "go to the begining of the game"
      return <li key={moveIdx}>
        <button onClick={()=>{this.jumpTo(moveIdx)}}>{moveList}</button>
        </li>
    })
    
    console.log("zzzzzzzz");
    console.log(this.state.history);
    console.log(this.state.currentMove);
    const winner = calculateWinner(this.state.history[this.state.currentMove].squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.isXnext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            onClick={(i) => this.handleClick(i)}
            squares={this.state.history[this.state.currentMove].squares}
            isXnext={this.state.isXnext}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

