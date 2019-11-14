import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  YellowBox,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import io from 'socket.io-client';

import {
  newTurn,
  updateWinningPlayer,
  changeBoard,
  gameOver,
} from '../../actions/game';

const pieceX = require('../../assets/piece_X.png');
const pieceO = require('../../assets/piece_O.png');

class Square extends Component {
  constructor(props) {
    super(props);

    this.rowIndex = this.props.rowIndex;
    this.colIndex = this.props.colIndex;
    this.numberToColor = this.numberToColor.bind(this);
    this.completeTurn = this.completeTurn.bind(this);
    this.onPressSquare = this.onPressSquare.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.computerPlayTurn = this.computerPlayTurn.bind(this);

    this.socket = io('http://localhost:3005');
    this.socket.on('socketUpdateGameReducer', data => {
      console.log('socketUpdateWinningPlayer: ', data);

      const {newBoard} = data;
      this.completeTurn(newBoard);
    });

    this.socket.emit(
      'create',
      this.props.game.roomCode + this.rowIndex + this.colIndex,
    );
  }

  componentDidMount() {
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    ]);
    this.interval = setInterval(() => this.computerPlayTurn(), 5000);
  }

  onPressSquare() {
    // Return if that square is taken
    // TODO: Add some kind of feedback (i.e. jiggle square) when clicking a taken square
    if (this.props.colorValue !== 10 || this.props.game.winningPlayerIndex)
      return;

    // NOTE: Could maybe be cleaner if switched matrix to {} instead of []
    const newBoard = this.updateBoard(this.rowIndex, this.colIndex);

    if (this.props.game.mode === 0 && this.props.game.playerTurn === 0) {
      // Single Player
      // TODO: add in Computer for single player logic
      this.completeTurn(newBoard);
    } else if (this.props.game.mode === 1) {
      // Two player local
      this.completeTurn(newBoard);
    } else if (this.props.game.mode === 2) {
      // Two player networked
      if (this.props.game.networkId !== this.props.game.playerTurn) return;

      const data = {
        newBoard,
        roomCode: this.props.game.roomCode + this.rowIndex + this.colIndex,
      };
      this.socket.emit('socketUpdateGameReducer', data);
    }
  }

  updateBoard(rowIndex, colIndex) {
    const oldBoard = this.props.game.matrix;
    const newBoard = Object.assign([...oldBoard], {
      [rowIndex]: Object.assign([...oldBoard[rowIndex]], {
        [colIndex]: this.props.game.playerTurn,
      }),
    });

    return newBoard;
  }

  computerPlayTurn() {
    const board = this.props.game.matrix;

    if (this.props.game.mode === 0 && this.props.game.playerTurn === 1) {
      let squareValue;
      let newBoard;

      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          squareValue = board[x][y];

          if (
            squareValue === 10 &&
            x === this.rowIndex &&
            y === this.colIndex
          ) {
            newBoard = this.updateBoard(x, y);
            this.completeTurn(newBoard);
          }
        }
      }
    }
  }

  completeTurn(newBoard) {
    this.props.actions.changeBoard(newBoard);
    this.props.actions.newTurn(this.props.game.playerTurn);
    this.props.actions.updateWinningPlayer(newBoard);
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
    const middleColumn = {
      borderLeftWidth: 5,
      borderRightWidth: 5,
    };

    const middleRow = {
      borderTopWidth: 5,
      borderBottomWidth: 5,
    };

    let borderStyle;
    if (this.rowIndex === 1 && this.colIndex === 1) {
      borderStyle = {...middleRow, ...middleColumn};
    } else if (this.rowIndex === 1) {
      borderStyle = middleRow;
    } else if (this.colIndex === 1) {
      borderStyle = middleColumn;
    }

    return (
      <TouchableWithoutFeedback onPress={this.onPressSquare}>
        <View style={[styles.col, borderStyle]}>{this.numberToColor()}</View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  col: {
    borderColor: '#ffffff',
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
