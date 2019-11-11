import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
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
        <ImageBackground
        style={[styles.backgroundImage, styles.vertical]}
        source={require('../assets/greyBrickWall.png')}
        >
          <Text
            style={styles.mainTitle}>
            Tic Tac Toe!
          </Text>
          <View
            style={styles.positioningContainer}
          >
            <View
              style={styles.chalkBoardContainer}
            >
              <ImageBackground
                style={styles.backgroundImage}
                source={require('../assets/chalkboard.png')}
              >
                <GameModeSelection></GameModeSelection>
                <Text
                  style={styles.inputLabel}>
                  { `Mode: ${this.props.game.mode}` }
                </Text>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
        <View
          style={styles.playGameContainer}
        >
          <ImageBackground
            style={[styles.backgroundImage, styles.vertical]}
            source={require('../assets/woodPanel.jpg')}
          >
          </ImageBackground>
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
    textAlign: 'center',
    marginTop: 30
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'stretch',
    width:'100%',
    height:'100%',
  },
  positioningContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chalkBoardContainer: {
    width:'100%',
    height: '70%',
  },
  playGameContainer: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Title)
