import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class MainMenu extends Scene {
  logoTween

  constructor() {
    super('MainMenu')
  }

  create() {
    this.changeScene() // dev only

    this.add.image(512, 384, 'background')

    this.logo = this.add
      .image(512, 300, 'logan-a')
      .setDepth(200)
      .setInteractive({ draggable: true })
      .on('pointerdown', () => {
        this.moveLogo((position) => {
          console.log('Logo position:', position)
        })
      })

    this.input.setDraggable(this.logo)

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY
    })

    this.add
      .text(512, 660, 'Empezar!', {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
      })
      .setDepth(100)
      .setOrigin(0.5)
      .setInteractive() // Make the text interactive
      .on('pointerdown', () => {
        this.changeScene()
      })

    EventBus.emit('current-scene-ready', this)
  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop()
      this.logoTween = null
    }

    this.scene.start('Game')
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

