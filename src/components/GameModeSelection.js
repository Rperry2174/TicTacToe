import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { GAME_MODE_OPTIONS } from '../constants'

import { connect } from 'react-redux';
import { changeGameMode, changeGameState} from '../actions/game'; //Do something here
import { bindActionCreators } from 'redux';

class GameModeSelection extends Component {

  constructor(props) {
    super(props);
  }

  _onButtonPress = (buttonIndex) => {
    console.log(buttonIndex + ' Simple Button pressed')
    this.props.actions.changeGameMode(buttonIndex);
    this.props.actions.changeGameState("playerInput")
  }

  createButtons = () => {
    const buttons = GAME_MODE_OPTIONS.map((buttonText, i) => {
      return (
        <View
          key={i}
          style={[this.props.game.mode == i ? styles.active : styles.notActive, styles.button]}
        >
          <TouchableOpacity
            onPress={() => this._onButtonPress(i)}
          >
            <Text
              style={styles.buttonText}
            >
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      )
    })

    return(buttons)
  }

  render() {
    return (
      <View style={styles.vertical}>
        { this.createButtons() }
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
  active: {
    backgroundColor: '#00ff00'
  },
  button: {
    marginTop: 10,
    marginBottom: 10

  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center', // <-- the magic
  }
})

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeGameMode, changeGameState}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameModeSelection)
