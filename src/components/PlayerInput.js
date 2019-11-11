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

import { GAME_MODE_OPTIONS } from '../constants'

import { connect } from 'react-redux';
import { changeGameState } from '../actions/game';
import { bindActionCreators } from 'redux';

class PlayerInput extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.vertical}>
        <Text
          style={styles.mainTitle}>
          Tic Tac Toe!
        </Text>
        <View
          style={styles.chalkBoard}
        >
          <Text
            style={styles.gameModeText}>
            { GAME_MODE_OPTIONS[this.props.game.mode] }
          </Text>
          { this.props.game.mode == 1 && <TwoPlayerInput/> }
          { this.props.game.mode == 2 && <NetworkInput/> }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    padding: 10,
    height:'100%',
  },
  chalkBoard: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
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
    textAlign: 'center',
  },
  gameModeText: {
    fontSize: 40,
    textAlign: 'center', // <-- the magic
  }
})

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeGameState}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInput)
