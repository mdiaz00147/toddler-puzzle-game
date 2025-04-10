import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class MainMenu extends Scene {
  logoTween

  constructor() {
    super('MainMenu')
  }

  preload() {
    // this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')

    this.sWidth = this.cameras.main.width
    this.sHeight = this.cameras.main.height
    this.fontSize = Math.min(this.sWidth, this.sHeight) * 0.08 // Font size proportional to screen dimensions
  }

  create() {
    this.changeScene('GameA')

    const bgImage = this.add
      .image(this.sWidth / 2, this.sHeight / 2, 'background_d')
      .setOrigin(0.5)
      .setDisplaySize(this.sWidth, this.sHeight)

    // Create title text
    const titleButton = this.add
      .rectangle(this.sWidth / 2, this.sHeight / 4, this.sWidth * 0.5, 200, 0xc57833)
      .setOrigin(0.5)
      .setStrokeStyle(10, 0x915015) // Border with thickness 10 and color #915015

    this.add
      .text(this.sWidth / 2, this.sHeight / 4, 'PUZZLE', {
        fontFamily: 'Fredoka',
        strokeThickness: 0,
        align: 'center',
        fontSize: `${this.fontSize * 1.5}px`,
        fill: '#f2b868'
      })
      .setOrigin(0.5)
      .setDepth(1)

    // Create GameA button
    const gameAButton = this.add
      .text(this.sWidth / 2, this.sHeight / 2, 'Play GameA', {
        fontFamily: 'Bruno Ace SC',
        fontSize: `${this.fontSize}px`,
        fill: '#ffffff'
      })
      .setOrigin(0.5)
      .setInteractive()

    gameAButton.on('pointerdown', () => {
      this.changeScene('GameA')
    })

    // Create GameB button
    const gameBButton = this.add
      .text(this.sWidth / 2, this.sHeight / 2 + this.fontSize * 2, 'Play GameB', {
        fontSize: `${this.fontSize}px`,
        fill: '#ffffff'
      })
      .setOrigin(0.5)
      .setInteractive()

    gameBButton.on('pointerdown', () => {
      this.changeScene('GameB')
    })
  }

  changeScene(sceneName) {
    this.scene.start(sceneName)
  }
}

