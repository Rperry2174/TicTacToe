import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {restartGame} from '../actions/game';

class GameOver extends Component {
  constructor(props) {
    super(props);

    this.restartGame = this.restartGame.bind(this);
    this.goToTitle = this.goToTitle.bind(this);
  }

  restartGame() {
    this.props.actions.restartGame('game');
  }

  goToTitle() {
    this.props.actions.restartGame('title');
  }

  render() {
    const {winningPlayerIndex, players} = this.props.game;

    return (
      <View style={styles.vertical}>
        <Text style={styles.winnerText}>Winning Player:</Text>
        <Text style={styles.winnerName}>{players[winningPlayerIndex]}</Text>
        <View style={styles.restartOptions}>
          <TouchableWithoutFeedback onPress={this.restartGame}>
            <Text style={styles.playButton}>Play Again</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.goToTitle}>
            <Text style={styles.playButton}>Home</Text>
          </TouchableWithoutFeedback>
        </View>
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
    height: 40,
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
    color: '#e6e6e6',
    fontFamily: 'squeakychalksound',
    fontSize: 35,
    textAlign: 'center',
  },
  winnerName: {
    color: 'yellow',
    fontFamily: 'squeakychalksound',
    fontSize: 35,
    textAlign: 'center',
  },
  playButton: {
    color: '#ffffff',
    fontFamily: 'squeakychalksound',
    fontSize: 25,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  restartOptions: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({restartGame}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameOver);
