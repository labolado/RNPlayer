/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import Video from 'react-native-video'

class Player extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <Video
        source={{uri: 'http://m2.music.126.net/qv3RI4K7ABKJ0TyAdb3taw==/3250156397064860.mp3'}}
        //ref='video'
        muted={this.props.muted}
        volume={this.props.volume}
        paused={this.props.paused}
        //onProgress={(e) => this.onProgress(e)}
        //onLoad={(e) => this.onLoad(e)}
      />
    )
  }
}

export default Player