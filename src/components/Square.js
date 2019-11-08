import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { connect } from 'react-redux';
import { changeBoard } from '../actions/board';
import { newTurn } from '../actions/game';
import { bindActionCreators } from 'redux';

class Square extends Component {

  constructor(props) {
    super(props);

    this.rowIndex = this.props.rowIndex;
    this.colIndex = this.props.colIndex;

    // TODO: Find a cleaner way to do this
    // For now, if player 1 (index 0) wins then the sum of their squares will be 0
    //          if player 2 (index 1) wins the nthe sum of their squares will be 3
    this.WINNING_SUMS = [0, 3]
  }

  numberToColor = () => {
    if (this.props.colorValue == 10) {
      return "white";
    } else if (this.props.colorValue == 0) {
      return "green"
    } else if (this.props.colorValue == 1) {
      return "red"
    } else {
      // Error handling
    }
  }

  checkForWin = (matrix) => {
    let rowSums = {
      0: 0,
      1: 0,
      2: 0
    }

    let columnSums = {
      0: 0,
      1: 0,
      2: 0
    }

    let diagonalSums = {
      topLeftToBottomRight: 0,
      topRightToBottomLeft: 0
    }

    for(let row = 0; row < 3; row++){
      //check full row
      for(let col = 0; col < 3; col++){
        let currentVal = matrix[row][col]
        columnSums[col] += currentVal
        rowSums[row] += currentVal

        if(row == col) {
          diagonalSums.topLeftToBottomRight += currentVal;
        }

        if (row + col == 2) {
          diagonalSums.topRightToBottomLeft += currentVal;
        }
      }
    }

    let winningPlayerValues = [];
    [rowSums, columnSums, diagonalSums].forEach((direction) => {
      console.log("direction: ", direction);
      Object.values(direction).forEach((values) => {
        winningPlayerValues.push(values)
      })
    })

    let winningPlayerIndex
    for(let i = 0; i < winningPlayerValues.length; i++) {
      winningPlayerIndex = this.WINNING_SUMS.indexOf(winningPlayerValues[i])
      if(winningPlayerIndex >= 0) {
        break;
      }
    }

    console.log("WINNING PLAYER: ", winningPlayerIndex);
    return winningPlayerIndex;
  }

  _onPressSquare = () => {
    // Return if that square is taken
    // TODO: Add some kind of feedback (i.e. jiggle square) when clicking a taken square
    if (this.props.colorValue != -10) return;

    // NOTE: Could maybe be cleaner if switched matrix to {} instead of []
    let oldBoard = this.props.board.matrix;
    let newBoard = Object.assign([...oldBoard], {
      [this.props.rowIndex]: Object.assign([...oldBoard[this.props.rowIndex]], {
        [this.props.colIndex]: this.props.game.playerTurn
      })
    })

    this.props.actions.changeBoard(newBoard);
    this.props.actions.newTurn(this.props.game.playerTurn);
    this.checkForWin(newBoard);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this._onPressSquare}
        >
        <View
          style={[styles.col, styles[this.numberToColor()]]}
        >
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  col: {
    flex:1,
    borderColor: '#000000',
    borderWidth: 5,
    padding: 10,
    height: 100,
  },
  green: {
    backgroundColor: '#00ff00'
  },
  red: {
    backgroundColor: '#ff0000'
  },
  white: {
    backgroundColor: '#ffffff'
  }
})

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeBoard, newTurn}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Square)
