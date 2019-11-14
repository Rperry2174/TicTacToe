import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeGameState, restartGame} from '../actions/game';

const woodPanelBackground = require('../assets/woodPanel.jpg');

class WoodPanel extends Component {
  constructor(props) {
    super(props);

    this.playGameButtonPress = this.playGameButtonPress.bind(this);
    this.backButtonPress = this.backButtonPress.bind(this);
  }

  playGameButtonPress() {
    this.props.actions.changeGameState('game');
  }

  backButtonPress() {
    this.props.actions.restartGame('gameModeSelection');
  }

  render() {
    const {playerTurn, players} = this.props.game;
    const playerTurnText = (
      <View style={styles.pullLeft}>
        <Text style={styles.turnText}>Turn: {players[playerTurn]}</Text>
      </View>
    );

    const playButton = (
      <View style={styles.buttonContainer}>
        <View style={styles.pullLeft}>
          <TouchableWithoutFeedback onPress={this.backButtonPress}>
            <Text style={styles.playButton}>Back</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.pullRight}>
          <TouchableWithoutFeedback onPress={this.playGameButtonPress}>
            <Text style={styles.playButton}>PLAY</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );

    return (
      <View style={styles.playGameContainer}>
        <ImageBackground
          style={[styles.backgroundImage, styles.vertical]}
          source={woodPanelBackground}
        >
          <View style={styles.horizontal}>
            {this.props.game.gameState === 'game' &&
              this.props.game.winningPlayerIndex == null &&
              playerTurnText}
            {this.props.game.gameState === 'playerInput' && playButton}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    height: '100%',
  },
  horizontal: {
    // backgroundColor: 'green'
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  playGameContainer: {
    alignItems: 'center',
    height: '15%',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    resizeMode: 'stretch',
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'yellow'
  },
  pullRight: {
    alignItems: 'center',
    // backgroundColor: 'green',
    fontSize: 20,
    justifyContent: 'center',
    marginLeft: 'auto',
    width: '30%',
  },
  pullLeft: {
    alignItems: 'center',
    // backgroundColor: 'blue',
    fontSize: 20,
    justifyContent: 'center',
    width: '50%',
  },
  playButton: {
    color: '#492e06',
    fontFamily: 'WarungKopi',
    fontSize: 45,
    textShadowColor: '#7e4f09',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  turnText: {
    color: '#492e06',
    fontFamily: 'WarungKopi',
    fontSize: 45,
    paddingLeft: 10,
    textShadowColor: '#7e4f09',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeGameState, restartGame}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WoodPanel);
