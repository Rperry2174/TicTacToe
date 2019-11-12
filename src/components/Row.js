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

import Square from './Square'

class Row extends Component {

  constructor(props) {
    super(props);
    this.rowIndex = this.props.rowIndex;
  }

  drawRow = (rowArr) => {
    const rowItems = rowArr.map((colorValue, i) => {
      return (
        <Square
          style={styles.col}
          key={i}
          colIndex={i}
          rowIndex={this.rowIndex}
          colorValue={colorValue}
        >
        </Square>
      )
    })

    return(
      <View style={styles.row}>
        { rowItems }
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.drawRow(this.props.cols) }
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
  },
  green: {
    backgroundColor: '#00ff00'
  },
  red: {
    backgroundColor: '#ff0000'
  }
})

const mapStateToProps = state => (
  state.game
);

const ActionCreators = Object.assign(
  {},
  changeBoard,
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Row)
