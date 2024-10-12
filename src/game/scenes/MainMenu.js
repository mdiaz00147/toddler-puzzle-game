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
    // this.changeScene('GameA') // dev only

    this.add
      .image(this.sWidth / 2, this.sHeight / 2, 'background')
      .setDisplaySize(this.sWidth, this.sHeight)

    this.add.image(this.sWidth / 2, this.sHeight / 2, 'logan-a')

    this.add
      .text(this.sWidth / 2, this.sHeight / 2 + 400, 'Empezar Game A!', {
        fontFamily: 'Arial Black',
        fontSize: this.fontSize,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
      })
      .setDepth(100)
      .setOrigin(0.5)
      .setInteractive() // Make the text interactive
      .on('pointerdown', () => {
        this.changeScene('GameA')
      })

    // this.add
    //   .text(this.sWidth / 2, this.sHeight / 2 + 500, 'Empezar Game B!', {
    //     fontFamily: 'Arial Black',
    //     fontSize: this.fontSize,
    //     color: '#ffffff',
    //     stroke: '#000000',
    //     strokeThickness: 8,
    //     align: 'center'
    //   })
    //   .setDepth(100)
    //   .setOrigin(0.5)
    //   .setInteractive() // Make the text interactive
    //   .on('pointerdown', () => {
    //     this.changeScene('GameB')
    //   })

    EventBus.emit('current-scene-ready', this)
  }

  changeScene(sceneName) {
    if (this.logoTween) {
      this.logoTween.stop()
      this.logoTween = null
    }

    this.scene.start(sceneName)
  }

  moveLogo(vueCallback) {
    if (this.logoTween) {
      if (this.logoTween.isPlaying()) {
        this.logoTween.pause()
      } else {
        this.logoTween.play()
      }
    } else {
      this.logoTween = this.tweens.add({
        targets: this.logo,
        x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
        y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          vueCallback({
            x: Math.floor(this.logo.x),
            y: Math.floor(this.logo.y)
          })
        }
      })
    }
  }
}

