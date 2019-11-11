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
import { editPlayer } from '../actions/game';
import { bindActionCreators } from 'redux';
import { PIECE_OPTIONS } from '../constants'

class TwoPlayerInput extends Component {

  constructor(props) {
    super(props);
  }

  onChangeText = (playerIndex, playerName) => {
    this.props.actions.editPlayer(playerIndex, playerName);
  }

  playGameButtonPress = () => {
    this.props.actions.changeGameState("game")
  }

  makePlayerInputBoxes = () => {
    let  { players } = this.props.game;
    const inputBoxes = players.map((player, i) => {
      return (
        <View
          key={i}
        >
          <Text
            style={styles.inputLabel}>
            { PIECE_OPTIONS[i] } Player {i + 1}
          </Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={ text => this.onChangeText(i, text) }
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
        { this.makePlayerInputBoxes() }
        <Text>
          {this.props.game.players[0]}
        </Text>
        <Text>
          {this.props.game.players[1]}
        </Text>
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
  actions: bindActionCreators({editPlayer}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TwoPlayerInput)
