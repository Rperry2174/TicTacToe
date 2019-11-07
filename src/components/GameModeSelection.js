import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import { connect } from 'react-redux';
import { changeGameMode } from '../actions/game'; //Do something here
import { bindActionCreators } from 'redux';

class GameModeSelection extends Component {

  constructor(props) {
    super(props);

    this.buttonOptions = ['1 Player', '2 Player', 'Network'];
  }

  _onButtonPress = (buttonIndex) => {
    console.log(buttonIndex + ' Simple Button pressed')
    this.props.actions.changeGameMode(buttonIndex);
  }

  createButtons = () => {
    const buttons = this.buttonOptions.map((buttonText, i) => {
      return (
        <View
          key={i}
          style={this.props.game.mode == i ? styles.active : styles.notActive}
        >
          <Button
            title={buttonText}
            onPress={() => this._onButtonPress(i)}
          />
        </View>
      )
    })

    return(buttons)
  }

  render() {
    return (
      <View style={styles.horizontal}>
        { this.createButtons() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  active: {
    backgroundColor: '#00ff00'
  },
  notActive: {

  }
})

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeGameMode}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameModeSelection)
