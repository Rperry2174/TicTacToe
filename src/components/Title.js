import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import GameModeSelection from './GameModeSelection'
import NetworkInput from './NetworkInput'
import TwoPlayerInput from './TwoPlayerInput'

import { connect } from 'react-redux';
import { } from '../actions/game';
import { bindActionCreators } from 'redux';

class Title extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roomCode: '1234',
      playerName: 'Ryan'
    };
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
          style={styles.mainTitle}>
          Tic Tac Toe!
        </Text>
        <GameModeSelection></GameModeSelection>
        <Text
          style={styles.inputLabel}>
          { `Mode: ${this.props.game.mode}` }
        </Text>

        <View>
          <Button
            title='Play Game'
            onPress={() => this.playGameButtonPress()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
    height:'100%'
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
    textAlign: 'center', // <-- the magic
  },
})

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Title)
