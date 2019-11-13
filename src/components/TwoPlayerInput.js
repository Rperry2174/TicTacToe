import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {editPlayer, syncPlayers} from '../actions/game';
import {PIECE_OPTIONS} from '../constants';

class TwoPlayerInput extends Component {
  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.playGameButtonPress = this.playGameButtonPress.bind(this);
    this.makePlayerInputBoxes = this.makePlayerInputBoxes.bind(this);
  }

  componentDidMount() {
    this.props.actions.syncPlayers(['', '']);
  }

  onChangeText(playerIndex, playerName) {
    this.props.actions.editPlayer(playerIndex, playerName);
  }

  playGameButtonPress() {
    this.props.actions.changeGameState('game');
  }

  makePlayerInputBoxes() {
    const {players} = this.props.game;
    const xColor = '#00ef05';
    const oColor = '#ed0303';
    const colors = [xColor, oColor];

    const inputBoxes = players.map((player, i) => {
      return (
        <View key={i}>
          <Text style={[styles.inputLabel, {color: colors[i]}]}>
            {PIECE_OPTIONS[i]} Player {i + 1}
          </Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => this.onChangeText(i, text)}
            value={players[i]}
          />
        </View>
      );
    });

    return inputBoxes;
  }

  render() {
    return <View style={styles.vertical}>{this.makePlayerInputBoxes()}</View>;
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
    color: '#ffffff',
    fontFamily: 'squeakychalksound',
    fontSize: 24,
    height: 40,
    paddingLeft: 10,
  },
  inputLabel: {
    fontFamily: 'squeakychalksound',
    fontSize: 24,
    fontWeight: '600',
  },
  mainTitle: {
    color: '#000000',
    fontSize: 48,
    fontWeight: '600',
  },
});

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({editPlayer, syncPlayers}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwoPlayerInput);
