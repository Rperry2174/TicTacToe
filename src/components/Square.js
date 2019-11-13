import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native'

import { connect } from 'react-redux';
import {
  newTurn,
  updateWinningPlayer,
  changeBoard,
  gameOver
} from '../actions/game';
import { bindActionCreators } from 'redux';
import SocketIOClient from 'socket.io-client';
import io from 'socket.io-client';


class Square extends Component {

  constructor(props) {
    super(props);

    this.rowIndex = this.props.rowIndex;
    this.colIndex = this.props.colIndex;

    this.socket = io('http://localhost:3005');

    // Listens to socketUpdateGameReducer and display the data recieved
    this.socket.on('socketUpdateGameReducer', (data) => {
      console.log("socketUpdateWinningPlayer: ", data)

      let { newBoard, newPlayerTurn } = data;
      this.props.actions.changeBoard(newBoard);
      this.props.actions.newTurn(this.props.game.playerTurn);
      this.props.actions.updateWinningPlayer(newBoard);
    });

    this.socket.emit('create', this.props.game.roomCode + this.rowIndex + this.colIndex);


    // this.socket.emit('create', 'room1');
    // this.socket.on('connectToRoom', function(data) {
    //   console.log(" [ CLIENT ] is connected to room: ", data);
    // });
  }

  numberToColor = () => {

    let o = <Image
      style={{width: '100%', height: '100%'}}
      source={require('../assets/piece_O.png')}
    />;

    let x = <Image
      style={{width: '100%', height: '100%'}}
      source={require('../assets/piece_X.png')}
    />

    if (this.props.colorValue == 0) {
      return x
    } else if (this.props.colorValue == 1) {
      return o
    } else {
      // Error handling
    }
  }

  _onPressSquare = () => {
    // Return if that square is taken
    // TODO: Add some kind of feedback (i.e. jiggle square) when clicking a taken square
    if (this.props.colorValue != 10 || this.props.game.winningPlayerIndex) return;

    // NOTE: Could maybe be cleaner if switched matrix to {} instead of []
    let oldBoard = this.props.game.matrix;
    let newBoard = Object.assign([...oldBoard], {
      [this.props.rowIndex]: Object.assign([...oldBoard[this.props.rowIndex]], {
        [this.props.colIndex]: this.props.game.playerTurn
      })
    })

    data = {
      newBoard: newBoard,
      newPlayerTurn: this.props.game.playerTurn,
      roomCode: this.props.game.roomCode + this.rowIndex + this.colIndex,
    }
    this.socket.emit('socketUpdateGameReducer', data);

    // this.props.actions.changeBoard(newBoard);
    // this.props.actions.newTurn(this.props.game.playerTurn);
    // this.props.actions.updateWinningPlayer(newBoard);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this._onPressSquare}
        >
        <View
          style={styles.col}
        >
          { this.numberToColor() }
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
  actions: bindActionCreators({
    changeBoard,
    newTurn,
    updateWinningPlayer,
    gameOver
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Square)
