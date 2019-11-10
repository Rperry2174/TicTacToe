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
        <Text>
        Winning Player: { players[winningPlayerIndex] }
        </Text>
        <View>
          <Button
            title={"Play Again"}
            onPress={() => this.restartGame()}
          />
        </View>
        <View>
          <Button
            title={"Home"}
            onPress={() => this.goToTitle()}
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
  actions: bindActionCreators({restartGame}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)
