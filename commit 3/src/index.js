import React from 'react';
import ReactDOM from 'react-dom';

import './style.css'
//import App from './App';

/* function Quadrado(props) {
  return (
    <button className="quadrado" onClick={props.onClick}>
      {props.value}
    </button>
  );
} */

class Quadrado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return(
      <button 
        className="quadrado" onClick={() => {this.props.onClick()}}>
        {this.props.value}
      </button>
    );
  }
}

class Tabuleiro extends React.Component {
  
  constructor (props) {
    super (props);
    this.state = {
      quadrados: Array(9).fill(null),
      xIsNext: true,
      gameEnded: false,
    };
  }
  
  render (){
    console.log("render state: " + this.state.xIsNext)
    let status
    switch (calculateWinner (this.state.quadrados)) {
      case true:
        status = "Vencendor: " + (!this.state.xIsNext ? 'X' : 'O');
        if(this.state.gameEnded === false) {
          this.setState({gameEnded: true});
        }
        break;
      
      case 'velha':
        status = "Deu velha";
        if(this.state.gameEnded === false) {
          this.setState({gameEnded: true});
        }
        break;
    
      default:
        status = "Jogador: " + (this.state.xIsNext ? 'X' : 'O');
    }
    // if (calculateWinner (this.state.quadrados)) {
    //   status = "Vencendor: " + (!this.state.xIsNext ? 'X' : 'O');
    //   if(this.state.gameEnded === false) {
    //     this.setState({gameEnded: true});
    //   }
    // }
    // else if (calculateWinner(this.state.quadrados) === 'velha'){
    //   status = "Deu Velha";
    // }
    // else {
    //    status = "Jogador: " + (this.state.xIsNext ? 'X' : 'O');
    // }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderizarQuadrado(0)}
          {this.renderizarQuadrado(1)}
          {this.renderizarQuadrado(2)}
        </div>
        <div className="board-row">
          {this.renderizarQuadrado(3)}
          {this.renderizarQuadrado(4)}
          {this.renderizarQuadrado(5)}
        </div>
        <div className="board-row">
          {this.renderizarQuadrado(6)}
          {this.renderizarQuadrado(7)}
          {this.renderizarQuadrado(8)}
        </div>
        <div className="menu">
            <button id="button1" onClick={() => this.resetBoard()}>
              Restart
            </button>
            <button id="button2" onClick={() => this.randomPlay()}>
              Jogada Aleatoria
            </button>
        </div>
      </div>
    );
  }

    resetBoard() {
      const quadrados = this.state.quadrados.slice();
      quadrados.fill(null);
      this.setState({
        quadrados: quadrados, xIsNext: true, gameEnded: false
      });
    }

    randomPlay() {
      const quadrados = this.state.quadrados;
      const player = this.state.xIsNext;
      if(this.state.gameEnded === true) {
        return alert('O jogo terminou, clique em restart para jogar novamente!');
      }
      let i = checkNextPlay(quadrados, player);
      while(quadrados[i] !== null) {
        i = Math.floor(Math.random() * (9 - 0)) + 0;
      }
      if (i !== null) {
        return this.handleClick(i);
      }
      
    }
  
    handleClick (i) {
      const quadrados = this.state.quadrados.slice();
      if (quadrados[i]) {
       alert ("Posição ocupada");
       return; 
      }
      quadrados[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState ({
        quadrados: quadrados, xIsNext: !this.state.xIsNext
      });
  }
  
  renderizarQuadrado(i) {
    return (
      <Quadrado 
         value={this.state.quadrados[i]}
        onClick={
         () => this.handleClick(i)
        }
       />
    );
  }
}

class Jogo extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Tabuleiro quadrados={Array(9).fill().map((value, pos) => pos)} />
        </div>
        <div className="game-info">
          <ol>{"Movimentos"}</ol>
        </div>
      </div>   
    );
  }
}

// function resetBoard(squares) {
//   return squares.fill(null);
// }
function checkNextPlay(squares,player) {
  if (player === true) player = 'X';
  else player = 'O';
  console.log(player);
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    switch (true) {
      case (squares[a] !== player && squares[b] !== null && squares[a] === squares[b] && squares[c] === null):
      return c;
      case (squares[a] !== player && squares[c] !== null && squares[a] === squares[c] && squares[b] === null):
        return b;
      case (squares[b] !== player && squares[c] !== null && squares[b] === squares[c] && squares[a] === null):
        return a;
      default:
        break;
    }
  }
  return null;
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return true;
    }
  }
  if(squares.every((i) => {return i !== null})) {
    return 'velha';
  }
  return null;
}
//=======================================================//

ReactDOM.render(
  <Jogo />,
  document.getElementById("root")
);

/* ReactDOM.render(
  <Tabuleiro
    quadrados={Array(9).fill().map((value, pos) => pos)} 
  />,
  document.getElementById("root")
); */

/* ReactDOM.render(
  <Quadrado 
    onClick={() => {
      alert('quadrado clicado');
    }}
    value="X"
    />,
  document.getElementById("root")
); */





//ReactDOM.render(<App />, document.getElementById('root'));

