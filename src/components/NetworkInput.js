import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native'

import GameModeSelection from './GameModeSelection'

import { connect } from 'react-redux';
import { editPlayer, editRoomCode, addPlayer, assignNetworkId } from '../actions/game';
import { bindActionCreators } from 'redux';
import { PIECE_OPTIONS } from '../constants'

import SocketIOClient from 'socket.io-client';
import io from 'socket.io-client';

class NetworkInput extends Component {

  constructor(props) {
    super(props);

    this.socket = io('http://localhost:3005');

    this.socket.on('addPlayerToLobby', (players) => {
      console.log("[ CLIENT ] addPlayerToLobby  :  ", players)
      this.props.actions.addPlayer()
      //FIXME: should be a better way to do this
      this.socket.emit('syncLobby', this.props.game.players);
    });

    this.socket.on('syncLobby', (players) => {
      console.log("[ CLIENT ] syncLobby  :  ", players)
      if(this.props.game.networkId == null) {
        this.props.actions.assignNetworkId(players.length - 1)
      }
    });
  }

  onChangeRoomCode = (roomCode) => {
    console.log("changing roomcode: ", roomCode);
    this.props.actions.editRoomCode(roomCode);
  }

  onChangePlayerName = (playerIndex, playerName) => {
    if(this.props.game.networkId == playerIndex) {
      this.props.actions.editPlayer(playerIndex, playerName);
    }
  }

  joinLobby = (roomCode) => {
    // this.socket.emit('syncLobby', this.props.game.players);
    this.socket.emit('addPlayerToLobby', this.props.game.players);
  }

  makePlayerInputBoxes = () => {
    if(this.props.game.roomCode.length == "" || this.props.game.players.length == 0) {

      return(
        <TouchableOpacity
          onPress={() => this.joinLobby()}
        >
          <Text
            style={styles.buttonText}
          >
            Join
          </Text>
        </TouchableOpacity>
      )
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
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: "squeakychalksound",
    color: 'white'
  }
})

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({editPlayer, editRoomCode, addPlayer, assignNetworkId}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkInput)
