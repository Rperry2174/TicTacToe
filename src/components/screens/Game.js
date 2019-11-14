import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import GameOver from './GameOver';
import Row from '../Row';

class Game extends Component {
  constructor(props) {
    super(props);
    this.drawBoard = this.drawBoard.bind(this);
  }

  drawBoard() {
    const rows = this.props.game.matrix.map((colData, i) => {
      return <Row rowIndex={i} cols={colData} key={i} />;
    });
    return <View>{rows}</View>;
  }

  render() {
    const gameBoard = (
      <View>
        <View style={styles.container}>{this.drawBoard()}</View>
      </View>
    );

    const gameOver = <GameOver />;
    return this.props.game.winningPlayerIndex == null ? gameBoard : gameOver;
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  col: {
    backgroundColor: '#00ff00',
    borderColor: '#000000',
    borderWidth: 5,
    flex: 1,
    padding: 10,
    height: 100,
  },
});

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
