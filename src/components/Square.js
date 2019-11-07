import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { connect } from 'react-redux';
import { changeBoard } from '../actions/board';
import { bindActionCreators } from 'redux';

class Square extends Component {

  constructor(props) {
    super(props);

    this.rowIndex = this.props.rowIndex;
    this.colIndex = this.props.colIndex;
  }

  numberToColor = () => {
    if (this.props.colorValue == 0) {
      return "white";
    } else if (this.props.colorValue == 1) {
      return "red"
    } else if (this.props.colorValue == 2) {
      return "green"
    } else {
      // Error handling
    }
  }

  updateColorValue = () => {

  }

  _onPressSquare = () => {
    console.log("my props: " + this.rowIndex + "," + this.colIndex + "," + this.props.colorValue);
    let newBoard = [
      [2, 0, 2],
      [2, 2, 2],
      [2, 0, 0],
    ]
    console.log("this.props.acitons: ", this.props.actions)

    this.props.actions.changeBoard(newBoard);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this._onPressSquare}
        >
        <View
          style={[styles.col, styles[this.numberToColor()]]}
        >
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
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
  },
  white: {
    backgroundColor: '#ffffff'
  }
})

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeBoard}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Square)
