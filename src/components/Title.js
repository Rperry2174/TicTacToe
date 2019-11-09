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

class Title extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roomCode: '1234',
      playerName: 'Ryan'
    };
  }

  onChangeText = (key, text) => {
    console.log("text: " + text);
    this.setState({
      [key]: text
    })
  }

  _onButtonPress = () => {
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
          Room Code
        </Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={ text => this.onChangeText('roomCode', text) }
          value={this.state.roomCode}
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

        <Text
          style={styles.inputLabel}>
          { `Mode: ${this.props.game.mode}` }
        </Text>

        <View>
          <Button
            title='Play Game'
            onPress={() => this._onButtonPress()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Title)
