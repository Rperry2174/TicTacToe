import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Game from './src/components/screens/Game';
import GameModeSelection from './src/components/screens/GameModeSelection';
import PlayerInput from './src/components/screens/PlayerInput';

import Chalkboard from './src/components/background/Chalkboard';
import WoodPanel from './src/components/background/WoodPanel';

class App extends Component {
  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.sectionContainer}>
            <View style={styles.vertical}>
              <Chalkboard>
                {this.props.game.gameState === "gameModeSelection" && <GameModeSelection /> }
                {this.props.game.gameState === "playerInput" && <PlayerInput /> }
                {this.props.game.gameState === "game" && <Game /> }
              </Chalkboard>
              <WoodPanel />
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
  },
  vertical: {
    flexDirection: 'column',
    height: '100%',
  },
});

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
