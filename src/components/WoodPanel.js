/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Button,
  TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeGameState } from '../actions/game';

class WoodPanel extends Component {
  constructor(props) {
    super(props);
  }

  playGameButtonPress = () => {
    this.props.actions.changeGameState("game")
  }

  render() {
    let { playerTurn, players, winningPlayerIndex } = this.props.game;

    return (
      <>
        <View
          style={styles.playGameContainer}
        >
          <ImageBackground
            style={[styles.backgroundImage, styles.vertical]}
            source={require('../assets/woodPanel.jpg')}
          >
            <View style={styles.horizontal}>
              {
                this.props.game.gameState == "game" &&
                this.props.game.winningPlayerIndex == null &&
                <View
                  style={styles.pullLeft}
                >
                  <Text
                    style={styles.turnText}
                  >
                    Turn: {players[playerTurn]}
                  </Text>
                </View>
              }
              {
                this.props.game.gameState == "playerInput" &&
                <View
                  style={styles.pullRight}
                >
                  <TouchableWithoutFeedback
                    onPress={this.playGameButtonPress}
                  >
                    <Text
                      style={styles.playButton}
                    >
                      PLAY
                    </Text>
                  </TouchableWithoutFeedback>

                </View>
              }
            </View>
          </ImageBackground>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    height:'100%',
  },
  horizontal: {
    flex:1,
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'green'
  },
  playGameContainer: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'stretch',
    width:'100%',
    height:'100%',
  },
  pullRight: {
    width: '30%',
    // backgroundColor: 'blue',
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  pullLeft: {
    justifyContent: 'center',
    fontSize: 20,
  },
  playButton: {
    fontFamily: "WarungKopi",
    fontSize: 45,
    color: '#492e06',
    textShadowColor: '#7e4f09',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  turnText: {
    fontFamily: "WarungKopi",
    fontSize: 45,
    color: '#492e06',
    textShadowColor: '#7e4f09',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    paddingLeft: 10
  }
});


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeGameState}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WoodPanel)
