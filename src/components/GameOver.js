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
import { } from '../actions/game'; //Do something here
import { bindActionCreators } from 'redux';

class GameOver extends Component {

  constructor(props) {
    super(props);
  }

  _onButtonPress = (buttonIndex) => {
    console.log(buttonIndex + ' Simple Button pressed')
  }

  render() {
    return (
      <View style={styles.vertical}>
        <View>
          <Button
            title={"Play Again"}
            onPress={() => this._onButtonPress(i)}
          />
        </View>
        <View>
          <Button
            title={"Home"}
            onPress={() => this._onButtonPress(i)}
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
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)
