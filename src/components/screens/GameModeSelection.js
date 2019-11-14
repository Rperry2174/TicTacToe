import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {GAME_MODE_OPTIONS} from '../../constants';
import {changeGameMode, changeGameState} from '../../actions/game';

class GameModeSelection extends Component {
  constructor(props) {
    super(props);

    this.onButtonPress = this.onButtonPress.bind(this);
    this.createButtons = this.createButtons.bind(this);
  }

  onButtonPress(buttonIndex) {
    this.props.actions.changeGameMode(buttonIndex);
    this.props.actions.changeGameState('playerInput');
  }

  createButtons() {
    const buttons = GAME_MODE_OPTIONS.map((buttonText, i) => {
      return (
        <View key={i}>
          <TouchableOpacity onPress={() => this.onButtonPress(i)}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    return buttons;
  }

  render() {
    return <View style={styles.vertical}>{this.createButtons()}</View>;
  }
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'squeakychalksound',
  },
});

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeGameMode, changeGameState}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameModeSelection);
