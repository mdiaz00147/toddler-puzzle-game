import { Boot } from './scenes/Boot'
import { GameA } from './scenes/GameA'
import { GameB } from './scenes/GameB'
import { GameC } from './scenes/GameC'
import { GameOver } from './scenes/GameOver'
import { MainMenu } from './scenes/MainMenu'
import Phaser from 'phaser'

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

let clientWidth = document.documentElement.clientWidth
let clientHeight = document.documentElement.clientHeight

const config = {
  type: Phaser.AUTO,
  width: clientWidth,
  height: clientHeight,
  parent: 'game-container',
  backgroundColor: '#b06923',
  scene: [Boot, MainMenu, GameA, GameB, GameC, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
}

const StartGame = (parent) => {
  // if (window.innerWidth > window.innerHeight) {
  return new Phaser.Game({ ...config, parent })
  // } else {
  // if (
  //   confirm(
  //     'Please rotate your device to landscape orientation to start the game. Click "OK" to reload or "Cancel" to stay on this page.'
  //   )
  // ) {
  //   window.location.reload()
  // }
  // window.location.reload()
  //   return null
  // }
}

export default StartGame

