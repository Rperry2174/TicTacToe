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
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Chalkboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ImageBackground
          style={[styles.backgroundImage, styles.vertical]}
          source={require('../assets/greyBrickWall.png')}
        >
          <Text
            style={styles.mainTitle}>
            Tic Tac Toe!
          </Text>
          <View
            style={styles.positioningContainer}
          >
            <View
              style={styles.chalkBoardContainer}
            >
              <ImageBackground
                style={styles.backgroundImage}
                source={require('../assets/chalkboard.png')}
              >
                <View
                  style={{paddingHorizontal: 10, paddingTop: 50}}
                >
                  { this.props.children }
                </View>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
      </>
    );
  }
};

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    height:'100%',
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginTop: 30
  },
  positioningContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chalkBoardContainer: {
    width:'100%',
    height: '70%',
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
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chalkboard)
