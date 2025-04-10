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
    // this.changeScene('GameA')

    const bgImage = this.add
      .image(this.sWidth / 2, this.sHeight / 2, 'background_d')
      .setOrigin(0.5)
      .setDisplaySize(this.sWidth, this.sHeight)

    // Create title text
    const titleWidth = this.sWidth * 0.5
    const titleHeight = 200
    const cornerRadius = 40

    const titleGraphics = this.add.graphics()
    titleGraphics.fillStyle(0xb65d14, 1)
    titleGraphics.lineStyle(10, 0x944910, 1)
    titleGraphics.fillRoundedRect(
      this.sWidth / 2 - titleWidth / 2,
      this.sHeight / 4 - titleHeight / 2,
      titleWidth,
      titleHeight,
      cornerRadius
    )
    titleGraphics.strokeRoundedRect(
      this.sWidth / 2 - titleWidth / 2,
      this.sHeight / 4 - titleHeight / 2,
      titleWidth,
      titleHeight,
      cornerRadius
    )

    this.add
      .text(this.sWidth / 2, this.sHeight / 4, 'PUZZLE', {
        fontFamily: 'Fredoka',
        strokeThickness: 0,
        align: 'center',
        fontSize: `${this.fontSize * 1.5}px`,
        fill: '#fdda9c'
      })
      .setOrigin(0.5)
      .setDepth(1)

    // Create GameA button
    const gameAButton = this.add
      .text(this.sWidth / 2, this.sHeight / 2, 'GAME A', {
        fontFamily: 'Fredoka',
        strokeThickness: 0,
        align: 'center',
        fontSize: `${this.fontSize * 1.5}px`,
        fill: '#fdda9c'
      })
      .setOrigin(0.5)
      .setInteractive()

    gameAButton.on('pointerdown', () => {
      this.changeScene('GameA')
    })

    // Create GameB button
    const gameBButton = this.add
      .text(this.sWidth / 2, this.sHeight / 2 + this.fontSize * 2, 'GAME B', {
        fontFamily: 'Fredoka',
        fontSize: `${this.fontSize * 1.5}px`,
        fill: '#fdda9c',
        strokeThickness: 0,
        align: 'center'
      })
      .setOrigin(0.5)
      .setInteractive()

    gameBButton.on('pointerdown', () => {
      this.changeScene('GameB')
    })

    // Create GameC button
    const gameCButton = this.add
      .text(this.sWidth / 2, this.sHeight / 2 + this.fontSize * 4, 'GAME C', {
        fontFamily: 'Fredoka',
        fontSize: `${this.fontSize * 1.5}px`,
        fill: '#fdda9c',
        strokeThickness: 0,
        align: 'center'
      })
      .setOrigin(0.5)
      .setInteractive()

    gameCButton.on('pointerdown', () => {
      this.changeScene('GameC')
    })
  }

  changeScene(sceneName) {
    this.scene.start(sceneName)
  }
}

