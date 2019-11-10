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
import { changeGameState } from '../actions/game';
import { bindActionCreators } from 'redux';

class NetworkInput extends Component {

  constructor(props) {
    super(props);
  }

  onChangeText = (key, text) => {

  }

  playGameButtonPress = () => {
    this.props.actions.changeGameState("game")
  }

  render() {
    return (
      <View style={styles.vertical}>
        <Text
          style={styles.inputLabel}>
          Room Code
        </Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={ text => this.onChangeText('roomCode', text) }
          value="1234"
        />
        <Text
          style={styles.inputLabel}>
          Name
        </Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={ text => this.onChangeText('playerName', text) }
          value={ this.props.game.players[0] }
        />
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
     height: 40,
     borderColor: 'gray',
     borderWidth: 1
  },
  inputLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
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
  actions: bindActionCreators({changeGameState}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkInput)
