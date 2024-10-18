import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class MainMenu extends Scene {
  logoTween

  constructor() {
    super('MainMenu')
  }

  preload() {
    this.sWidth = this.cameras.main.width
    this.sHeight = this.cameras.main.height
    this.fontSize = Math.min(this.sWidth, this.sHeight) * 0.08 // Font size proportional to screen dimensions
  }

  create() {
    this.changeScene('GameA')
    // Create title text
    this.add.text(this.sWidth / 2, this.sHeight / 4, 'Main Menu', {
      fontSize: `${this.fontSize * 1.5}px`,
      fill: '#ffffff'
    }).setOrigin(0.5)

    // Create GameA button
    const gameAButton = this.add.text(this.sWidth / 2, this.sHeight / 2, 'Play GameA', {
      fontSize: `${this.fontSize}px`,
      fill: '#ffffff'
    }).setOrigin(0.5).setInteractive()

    gameAButton.on('pointerdown', () => {
      this.changeScene('GameA')
    })

    // Create GameB button
    const gameBButton = this.add.text(this.sWidth / 2, this.sHeight / 2 + this.fontSize * 2, 'Play GameB', {
      fontSize: `${this.fontSize}px`,
      fill: '#ffffff'
    }).setOrigin(0.5).setInteractive()

    gameBButton.on('pointerdown', () => {
      this.changeScene('GameB')
    })
  }

  changeScene(sceneName) {
    this.scene.start(sceneName)
  }
}
