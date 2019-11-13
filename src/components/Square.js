import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Image} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import io from 'socket.io-client';

import {
  newTurn,
  updateWinningPlayer,
  changeBoard,
  gameOver,
} from '../actions/game';

const pieceX = require('../assets/piece_X.png');
const pieceO = require('../assets/piece_O.png');

class Square extends Component {
  constructor(props) {
    super(props);

    this.rowIndex = this.props.rowIndex;
    this.colIndex = this.props.colIndex;
    this.numberToColor = this.numberToColor.bind(this);
    this.onPressSquare = this.onPressSquare.bind(this);

    this.socket = io('http://localhost:3005');
    this.socket.on('socketUpdateGameReducer', data => {
      console.log('socketUpdateWinningPlayer: ', data);

      const {newBoard} = data;
      this.props.actions.changeBoard(newBoard);
      this.props.actions.newTurn(this.props.game.playerTurn);
      this.props.actions.updateWinningPlayer(newBoard);
    });

    this.socket.emit(
      'create',
      this.props.game.roomCode + this.rowIndex + this.colIndex,
    );
  }

  onPressSquare() {
    // Return if that square is taken
    // TODO: Add some kind of feedback (i.e. jiggle square) when clicking a taken square
    if (this.props.colorValue !== 10 || this.props.game.winningPlayerIndex)
      return;

    // NOTE: Could maybe be cleaner if switched matrix to {} instead of []
    const oldBoard = this.props.game.matrix;
    const newBoard = Object.assign([...oldBoard], {
      [this.props.rowIndex]: Object.assign([...oldBoard[this.props.rowIndex]], {
        [this.props.colIndex]: this.props.game.playerTurn,
      }),
    });

    const data = {
      newBoard,
      roomCode: this.props.game.roomCode + this.rowIndex + this.colIndex,
    };
    this.socket.emit('socketUpdateGameReducer', data);
  }

  numberToColor() {
    const o = <Image style={styles.full} source={pieceO} />;
    const x = <Image style={styles.full} source={pieceX} />;

    if (this.props.colorValue === 0) {
      return x;
    } else if (this.props.colorValue === 1) {
      return o;
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPressSquare}>
        <View style={styles.col}>{this.numberToColor()}</View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  col: {
    borderColor: '#000000',
    borderWidth: 5,
    flex: 1,
    height: 100,
    padding: 10,
  },
  green: {
    backgroundColor: '#00ff00',
  },
  red: {
    backgroundColor: '#ff0000',
  },
  white: {
    backgroundColor: '#ffffff',
  },
  full: {
    height: '100%',
    width: '100%',
  },
});

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      changeBoard,
      newTurn,
      updateWinningPlayer,
      gameOver,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Square);
