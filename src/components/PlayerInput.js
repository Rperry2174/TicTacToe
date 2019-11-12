import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
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

  playGameButtonPress = () => {
    this.props.actions.changeGameState("game")
  }

  // <ImageBackground
  //   source={require('../assets/chalkboard.png')}
  //   style={styles.chalkBoardContainer}
  // >

  render() {
    return (
      <View>
        <Text
          style={styles.gameModeText}>
          { GAME_MODE_OPTIONS[this.props.game.mode] }
        </Text>
        { this.props.game.mode == 1 && <TwoPlayerInput/> }
        { this.props.game.mode == 2 && <NetworkInput/> }
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  gameModeText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: "squeakychalksound",
    color: '#e6e6e6'
  },
  vertical: {
    flexDirection: 'column',
    height:'100%',
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginTop: 30
  },
  positioningContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  playGameContainer: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chalkBoardContainer: {
    width:'100%',
    height: '70%',
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'stretch',
    width:'100%',
    height:'100%',
  },
})

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeGameState}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInput)
