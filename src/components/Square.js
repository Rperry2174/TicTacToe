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
import { newTurn, updateWinningPlayer } from '../actions/game';
import { bindActionCreators } from 'redux';

class Square extends Component {

  constructor(props) {
    super(props);

    this.rowIndex = this.props.rowIndex;
    this.colIndex = this.props.colIndex;
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

  _onPressSquare = () => {
    // Return if that square is taken
    // TODO: Add some kind of feedback (i.e. jiggle square) when clicking a taken square
    if (this.props.colorValue != -10 || this.props.game.winningPlayerIndex) return;

    // NOTE: Could maybe be cleaner if switched matrix to {} instead of []
    let oldBoard = this.props.board.matrix;
    let newBoard = Object.assign([...oldBoard], {
      [this.props.rowIndex]: Object.assign([...oldBoard[this.props.rowIndex]], {
        [this.props.colIndex]: this.props.game.playerTurn
      })
    })

    this.props.actions.changeBoard(newBoard);
    this.props.actions.newTurn(this.props.game.playerTurn);
    this.props.actions.updateWinningPlayer(newBoard);
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
  actions: bindActionCreators({changeBoard, newTurn, updateWinningPlayer}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Square)
