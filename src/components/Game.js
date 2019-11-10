import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { connect } from 'react-redux';
import { changeBoard } from '../actions/game';
import { bindActionCreators } from 'redux';

import Row from './Row'
import GameOver from './GameOver'

class Game extends Component {

  constructor(props) {
    super(props);
  }

  drawBoard = () => {
    const rows = this.props.game.matrix.map((colData, i) => {
      return (
        <Row
          rowIndex={i}
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

    let { playerTurn, players } = this.props.game;

    let gameBoard = <View>
      <Text>
        Turn: {players[playerTurn]}
      </Text>
      <Text>
        Winning Player: {this.props.game.winningPlayerIndex}
      </Text>
      <View style={[styles.container, styles.horizontal]}>
        { this.drawBoard() }
      </View>
    </View>

    let gameOver = <GameOver />
    return (
      this.props.game.winningPlayerIndex == null ? gameBoard : gameOver
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

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game)
