import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import GameModeSelection from './GameModeSelection'

import { connect } from 'react-redux';
import { editPlayer, editRoomCode } from '../actions/game';
import { bindActionCreators } from 'redux';
import { PIECE_OPTIONS } from '../constants'

class NetworkInput extends Component {

  constructor(props) {
    super(props);
  }

  onChangeRoomCode = (roomCode) => {
    console.log("changing roomcode: ", roomCode);
    this.props.actions.editRoomCode(roomCode);
  }

  onChangePlayerName = (playerIndex, playerName) => {
    this.props.actions.editPlayer(playerIndex, playerName);
  }

  makePlayerInputBoxes = () => {
    if(this.props.game.roomCode.length == "") {
      return;
    }

    let  { players } = this.props.game;
    let xColor = "#00ef05";
    let oColor = "#ed0303";
    let colors = [xColor, oColor];

    const inputBoxes = players.map((player, i) => {

      return (
        <View
          key={i}
        >
          <Text
            style={[styles.inputLabel, {color: colors[i]}]}>
            { PIECE_OPTIONS[i] } Player {i + 1}
          </Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={ text => this.onChangePlayerName(i, text) }
            value= { players[i] }
          />
        </View>
      )
    })

    return(
      inputBoxes
    )
  }

  render() {
    return (
      <View style={styles.vertical}>
        <Text
          style={[styles.inputLabel, {color: "white"}]}>
          Room code:
        </Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={ text => this.onChangeRoomCode(text) }
          value= { this.props.game.roomCode }
        />
        { this.makePlayerInputBoxes() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10
  },
  inputBox: {
     height: 30,
     borderColor: 'gray',
     borderWidth: 1,
     fontFamily: "squeakychalksound",
     color: '#ffffff',
     fontSize: 20,
     paddingLeft: 10
  },
  inputLabel: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: "squeakychalksound"
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: '600',
    color: '#000000',
  },
})

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({editPlayer, editRoomCode}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkInput)
