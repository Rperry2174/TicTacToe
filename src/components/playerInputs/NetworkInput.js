import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  YellowBox,
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import io from 'socket.io-client';

import {
  editPlayer,
  editRoomCode,
  addPlayer,
  assignNetworkId,
  syncPlayers,
} from '../../actions/game';

import {PIECE_OPTIONS} from '../../constants';

class NetworkInput extends Component {
  constructor(props) {
    super(props);

    this.socket = io('http://localhost:3005');
    this.onChangeRoomCode = this.onChangeRoomCode.bind(this);
    this.onChangePlayerName = this.onChangePlayerName.bind(this);
    this.joinLobby = this.joinLobby.bind(this);
    this.makePlayerInputBoxes = this.makePlayerInputBoxes.bind(this);

    this.socket.on('addPlayerToLobby', players => {
      console.log('[ CLIENT ] addPlayerToLobby  :  ', players);
      this.props.actions.addPlayer();
      this.socket.emit('syncLobby', this.props.game.players);
    });

    this.socket.on('editPlayerName', playerInfo => {
      console.log('[ CLIENT ] editPlayerName  :  ', playerInfo);
      const {playerIndex, playerName} = playerInfo;
      this.props.actions.editPlayer(playerIndex, playerName);
    });

    this.socket.on('syncLobby', players => {
      console.log('[ CLIENT ] syncLobby  :  ', players);
      if (players.length > this.props.game.players) {
        this.props.actions.syncPlayers(players);
      }
      if (this.props.game.networkId == null && players.length >= 1) {
        this.props.actions.assignNetworkId(players.length - 1);
      }
    });
  }

  componentDidMount() {
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    ]);
  }

  onChangeRoomCode(roomCode) {
    console.log('changing roomcode: ', roomCode);
    this.props.actions.editRoomCode(roomCode);
  }

  onChangePlayerName(playerIndex, playerName) {
    if (this.props.game.networkId !== playerIndex) return;

    const playerInfo = {
      playerIndex: this.props.game.networkId,
      playerName,
    };

    this.socket.emit('editPlayerName', playerInfo);
  }

  joinLobby() {
    this.socket.emit('syncLobby', this.props.game.players);
    this.socket.emit('addPlayerToLobby', this.props.game.players);
  }

  makePlayerInputBoxes() {
    if (
      this.props.game.roomCode.length === '' ||
      this.props.game.players.length === 0
    ) {
      return (
        <TouchableOpacity onPress={() => this.joinLobby()}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      );
    }

    const {players} = this.props.game;
    const xColor = '#00ef05';
    const oColor = '#ed0303';
    const colors = [xColor, oColor];

    const inputBoxes = players.map((player, i) => {
      return (
        <View key={i}>
          <Text style={[styles.inputLabel, {color: colors[i]}]}>
            {PIECE_OPTIONS[i]} Player {i + 1}
          </Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => this.onChangePlayerName(i, text)}
            value={players[i]}
          />
        </View>
      );
    });

    return inputBoxes;
  }

  render() {
    return (
      <View style={styles.vertical}>
        <Text style={styles.inputLabel}>Room code:</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => this.onChangeRoomCode(text)}
          value={this.props.game.roomCode}
        />
        {this.makePlayerInputBoxes()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
  },
  inputBox: {
    borderColor: 'gray',
    borderWidth: 1,
    color: '#ffffff',
    fontFamily: 'squeakychalksound',
    fontSize: 20,
    height: 30,
    paddingLeft: 10,
  },
  inputLabel: {
    color: '#ffffff',
    fontFamily: 'squeakychalksound',
    fontSize: 24,
    fontWeight: '600',
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: '600',
    color: '#000000',
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'squeakychalksound',
    fontSize: 40,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      editPlayer,
      editRoomCode,
      addPlayer,
      assignNetworkId,
      syncPlayers,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NetworkInput);
