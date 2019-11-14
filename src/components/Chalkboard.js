import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const greyBrickWall = require('../assets/greyBrickWall.png');
const chalkBoard = require('../assets/chalkboard.png');

class Chalkboard extends Component {
  render() {
    return (
      <ImageBackground
        style={[styles.backgroundImage, styles.vertical]}
        source={greyBrickWall}
      >
        <Text style={styles.mainTitle}>Tic Tac Toe!</Text>
        <View style={styles.positioningContainer}>
          <View style={styles.chalkBoardContainer}>
            <ImageBackground style={styles.backgroundImage} source={chalkBoard}>
              <View style={styles.childViewPadding}>{this.props.children}</View>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    resizeMode: 'stretch',
    width: '100%',
  },
  chalkBoardContainer: {
    height: '74%',
    width: '100%',
  },
  childViewPadding: {
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  mainTitle: {
    color: 'yellow',
    fontFamily: 'squeakychalksound',
    fontSize: 45,
    fontWeight: '600',
    marginTop: 30,
    textAlign: 'center',
    textShadowColor: '#7e4f09',
  },
  positioningContainer: {
    alignItems: 'center',
    // backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
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
)(Chalkboard);
