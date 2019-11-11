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
  Button
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
    return (
      <>
        <View
          style={styles.playGameContainer}
        >
          <ImageBackground
            style={[styles.backgroundImage, styles.vertical]}
            source={require('../assets/woodPanel.jpg')}
          >
            { this.props.game.gameState == "playerInput" &&
                <Button
                  title='Play Game'
                  onPress={() => this.playGameButtonPress()}
                />
            }
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
});


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeGameState}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WoodPanel)
