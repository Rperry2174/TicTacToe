import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from 'react-native'

import GameModeSelection from './GameModeSelection'

import { connect } from 'react-redux';
import { restartGame } from '../actions/game'; //Do something here
import { bindActionCreators } from 'redux';

class GameOver extends Component {

  constructor(props) {
    super(props);
  }

  restartGame = () => {
    this.props.actions.restartGame("game");
  }

  goToTitle = () => {
    this.props.actions.restartGame("title");
  }


  render() {
    let { winningPlayerIndex, players } = this.props.game;

    return (
      <View style={styles.vertical}>
        <Text
          style={styles.winnerText}
        >
          Winning Player:
        </Text>
        <Text
          style={styles.winnerName}
        >
          { players[winningPlayerIndex] }
        </Text>
        <View
          style={styles.restartOptions}
        >
          <TouchableWithoutFeedback
            onPress={this.restartGame}
          >
            <Text
              style={styles.playButton}
            >
              Play Again
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goToTitle}
          >
            <Text
              style={styles.playButton}
            >
              Home
            </Text>
          </TouchableWithoutFeedback>
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
  winnerText: {
    fontSize: 35,
    textAlign: 'center',
    fontFamily: "squeakychalksound",
    color: '#e6e6e6'
  },
  winnerName: {
    fontSize: 35,
    textAlign: 'center',
    fontFamily: "squeakychalksound",
    color: 'yellow'
  },
  playButton: {
    fontFamily: "squeakychalksound",
    fontSize: 25,
    color: '#ffffff',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  restartOptions: {
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({restartGame}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)
