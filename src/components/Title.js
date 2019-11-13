import React, {Component} from 'react';
import {View} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import GameModeSelection from './GameModeSelection';

class Title extends Component {
  render() {
    return (
      <View>
        <GameModeSelection />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Title);
