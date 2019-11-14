import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import OnePlayerInput from './OnePlayerInput';
import TwoPlayerInput from './TwoPlayerInput';
import NetworkInput from './NetworkInput';

import {GAME_MODE_OPTIONS} from '../constants';
import {changeGameState} from '../actions/game';

class PlayerInput extends Component {
  constructor(props) {
    super(props);

    this.playGameButtonPress = this.playGameButtonPress.bind(this);
  }

  playGameButtonPress() {
    this.props.actions.changeGameState('game');
  }

  render() {
    return (
      <View>
        <Text style={styles.gameModeText}>
          {GAME_MODE_OPTIONS[this.props.game.mode]}
        </Text>
        {this.props.game.mode === 0 && <OnePlayerInput />}
        {this.props.game.mode === 1 && <TwoPlayerInput />}
        {this.props.game.mode === 2 && <NetworkInput />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  gameModeText: {
    color: '#e6e6e6',
    fontFamily: 'squeakychalksound',
    fontSize: 45,
    textAlign: 'center',
  },
  vertical: {
    flexDirection: 'column',
    height: '100%',
  },
  mainTitle: {
    color: '#000000',
    fontSize: 48,
    fontWeight: '600',
    marginTop: 30,
    textAlign: 'center',
  },
  positioningContainer: {
    alignItems: 'center',
    // backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
  },
  playGameContainer: {
    alignItems: 'center',
    height: '15%',
    justifyContent: 'center',
  },
  chalkBoardContainer: {
    width: '100%',
    height: '70%',
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
});

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeGameState}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerInput);
