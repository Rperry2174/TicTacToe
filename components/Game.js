import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import Row from './Row'

export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: [
        [1, 0, 0],
        [0, 1, 1],
        [1, 0, 0],
      ]
    };
  }

  drawBoard = () => {
    const rows = this.state.board.map((colData, i) => {
      return (
        <Row
          cols={colData}
          key={i}
        >
        </Row>
      )
    })
    console.log("ROWS" + rows)
    return(
      <View>
        { rows }
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        { this.drawBoard() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%'
  },
  col: {
    flex:1,
    borderColor: '#000000',
    borderWidth: 5,
    padding: 10,
    height: 100,
    backgroundColor: '#00ff00'
  }
})
