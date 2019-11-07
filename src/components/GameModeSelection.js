import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

export default class GameModeSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameMode: '1 player',
    };
  }

  onChangeText = () => {

  }

  render() {
    return (
      <View style={styles.horizontal}>
        <Button
          title="1 Player"
          onPress={() => console.log('1Simple Button pressed')}
        />
        <Button
          title="2 Player"
          onPress={() => console.log('2Simple Button pressed')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
