import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
   playerTurn: 'X',
   valueOfSquare: [['', '', ''],
                   ['', '', ''],
                   ['', '', '']],
   message: ''
  };

  horizontalWin=()=>{
      for(let i = 0; i < 3; i++) {
          if(this.state.valueOfSquare[i][0] === this.state.playerTurn &&
              this.state.valueOfSquare[i][1] === this.state.playerTurn &&
              this.state.valueOfSquare[i][2] === this.state.playerTurn) {
              return true;
          }
      }
      return false;
  }

  verticalWin=()=>{
      for(let i = 0; i < 3; i++) {
          if(this.state.valueOfSquare[0][i] === this.state.playerTurn &&
              this.state.valueOfSquare[1][i] === this.state.playerTurn &&
              this.state.valueOfSquare[2][i] === this.state.playerTurn) {
              return true;
          }
      }
      return false;
  }

  diagonalWin=()=> {
      console.log(this.state.valueOfSquare);
      return (this.state.valueOfSquare[0][0] === this.state.playerTurn &&
          this.state.valueOfSquare[1][1] === this.state.playerTurn &&
          this.state.valueOfSquare[2][2] === this.state.playerTurn)
          ||
          (this.state.valueOfSquare[0][2] === this.state.playerTurn &&
              this.state.valueOfSquare[1][1] === this.state.playerTurn &&
              this.state.valueOfSquare[2][0] === this.state.playerTurn);
  }


  checkForWin=()=>{
      return this.horizontalWin() || this.verticalWin() || this.diagonalWin();
  }

  handleUserClick=(row, col)=>{
      const newArray = this.state.valueOfSquare;

      if(!newArray[row][col]) {
          newArray[row][col] = this.state.playerTurn;
          this.setState({valueOfSquare: newArray});

          this.checkForWin();

          if(this.checkForWin()) {
              this.setState({message: `Player ${this.state.playerTurn} won!`});
          }
          if (this.state.playerTurn === 'X') {
              this.setState({playerTurn: 'O'})
          } else {
              this.setState({playerTurn: 'X'})
          }
      } else {
         this.setState({message: 'Illegal move! Try again!'})
      }
  }


  render() {
      return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h4>Tic Tac Toe</h4>
          <div className="row">
              <div data-cell="0" onClick={() => this.handleUserClick(0, 0)}>{this.state.valueOfSquare[0][0]}</div>
              <div data-cell="1" onClick={() => this.handleUserClick(0, 1)}>{this.state.valueOfSquare[0][1]}</div>
              <div data-cell="2" onClick={() => this.handleUserClick(0, 2)}>{this.state.valueOfSquare[0][2]}</div>
          </div>
          <div className="row">
              <div data-cell="3" onClick={() => this.handleUserClick(1, 0)}>{this.state.valueOfSquare[1][0]}</div>
              <div data-cell="4" onClick={() => this.handleUserClick(1, 1)}>{this.state.valueOfSquare[1][1]}</div>
              <div data-cell="5" onClick={() => this.handleUserClick(1, 2)}>{this.state.valueOfSquare[1][2]}</div>
          </div>
          <div className="row">
              <div data-cell="6" onClick={() => this.handleUserClick(2, 0)}>{this.state.valueOfSquare[2][0]}</div>
              <div data-cell="7" onClick={() => this.handleUserClick(2, 1)}>{this.state.valueOfSquare[2][1]}</div>
              <div data-cell="8" onClick={() => this.handleUserClick(2, 2)}>{this.state.valueOfSquare[2][2]}</div>
          </div>
          <div style={{marginTop: 20, fontWeight: 'bold', color: 'red'}}>{this.state.message}</div>
      </div>;
  }
}

export default App;
