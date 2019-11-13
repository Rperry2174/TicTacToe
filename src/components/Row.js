import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Square from './Square';

import {changeBoard} from '../actions/game';

class Row extends Component {
  constructor(props) {
    super(props);
    this.rowIndex = this.props.rowIndex;

    this.drawRow = this.drawRow.bind(this);
  }

  drawRow(rowArr) {
    const rowItems = rowArr.map((colorValue, i) => {
      return (
        <Square
          style={styles.col}
          key={i}
          colIndex={i}
          rowIndex={this.rowIndex}
          colorValue={colorValue}
        />
      );
    });

    return <View style={styles.row}>{rowItems}</View>;
  }

  render() {
    return (
      <View style={styles.container}>{this.drawRow(this.props.cols)}</View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  col: {
    borderColor: '#000000',
    borderWidth: 5,
    flex: 1,
    height: 100,
    padding: 10,
  },
  green: {
    backgroundColor: '#00ff00',
  },
  red: {
    backgroundColor: '#ff0000',
  },
});

const mapStateToProps = state => state.game;

const ActionCreators = Object.assign({}, changeBoard);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Row);
