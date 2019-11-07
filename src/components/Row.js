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

class Row extends Component {

  constructor(props) {
    super(props);
    this.rowIndex = this.props.rowIndex;
  }

  //Use this to draw the row based off an input
  //ex: [1, 0, 0] == ['x', 'o', 'o']
  drawRow = (rowArr) => {
    const rowItems = rowArr.map((col, i) => {
      return (
        <View
          style={[styles.col, col == 0 ? styles.red : styles.green]}
          key={i}
        >
        </View>
      )
    })
    console.log(rowItems)
    return(
      <View style={styles.row}>
        { rowItems }
      </View>
    )
  }

  render() {
    console.log("this.props: " + this.props.cols)
    return (
      <View style={[styles.container, styles.horizontal]}>
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
  state.board
);

const ActionCreators = Object.assign(
  {},
  changeBoard,
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Row)
