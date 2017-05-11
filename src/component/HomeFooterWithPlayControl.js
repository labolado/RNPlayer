/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import {
  Body,
  Text,
  Thumbnail,
  Container, Content,
  List, ListItem, Icon,
} from 'native-base'
import { connect } from 'react-redux'
import MusicList from './MusicList'
import MusicPlayer from '../pages/MusicPlayer'
import { playMusicList, pausedChange } from "../actions/playerAction";

class HomeFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  state: {
    visible: boolean,
  }

  render() {
    const { currentMusicInfo, status } = this.props.player
    const navigation = this.props.navigation
    return (
      <Container>
        <Content style={{backgroundColor: '#B72712'}}>
          <List>
            <ListItem style={{height: 55}}
                      onPress={() => navigation.navigate('MusicPlayer')}>
              <Thumbnail square
                         style={{width: 48, height: 48,}}
                         source={{uri: currentMusicInfo.album.picUrl}}/>
              <Body>
              <Text>{currentMusicInfo.artists[0].name}</Text>
              <Text
                style={{fontSize: 13, color: 'white', paddingTop: 5}}>{currentMusicInfo.name}</Text>
              </Body>
              <TouchableOpacity
                style={{width: 30, height: 30, borderRadius: 15, marginRight: 8,}}
                onPress={this.props.pausedChange}
              >
                <Icon name={status.paused? 'play': 'pause'}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    visible: !this.state.visible,
                  })
                }}>
                <Icon name='menu'/>
              </TouchableOpacity>
              <MusicList
                visible={this.state.visible}
                onCancel={() => {
                  this.setState({
                      visible: false,
                    })
              }}/>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}


function mapProps(store) {
  const { player } = store || {}
  return {
    player,
  }
}

function mapAction(dispatch) {
  return {
    pausedChange: () => dispatch(pausedChange()),
    playMusicList: (v) => dispatch(playMusicList(v)),
  }
}

export default connect(mapProps, mapAction)(HomeFooter)