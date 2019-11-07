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
    this.colorValue = this.props.colorValue;
  }

  numberToColor = () => {
    if (this.colorValue == 0) {
      return "white";
    } else if (this.colorValue == 1) {
      return "red"
    } else if (this.colorValue == 2) {
      return "green"
    } else {
      // Error handling
    }
  }

  _onPressSquare = () => {
    console.log("my props: " + this.rowIndex + "," + this.colIndex);
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

export default connect(mapStateToProps, mapDispatchToProps)(Square)
