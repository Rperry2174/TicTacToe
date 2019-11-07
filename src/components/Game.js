import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { connect } from 'react-redux';
import { changeBoard } from '../actions/board';
import { bindActionCreators } from 'redux';

import Row from './Row'

class Game extends Component {

  constructor(props) {
    super(props);
  }

  drawBoard = () => {
    const rows = this.props.board.matrix.map((colData, i) => {
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

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game)
