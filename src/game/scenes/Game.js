import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class Game extends Scene {
  constructor() {
    super('Game')

    this.emojies = ['🙉', '💩', '🚀', '😇', '🤩', '🥳']
  }

  preload() {
    this.load.image('background', 'assets/background.png')

    const brownSquare = this.add.graphics()
    brownSquare.fillStyle(0x8b4513, 1) // Brown color
    brownSquare
      .fillRect(0, this.cameras.main.height - 100, this.cameras.main.width, 150)
      .setDepth(0)

    this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height - 50, // Adjusted to align vertically to the center of the square
        'Arrastra los animales a sus posiciones !',
        {
          fontFamily: 'Arial',
          fontSize: 24,
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4,
          align: 'center'
        }
      )
      .setOrigin(0.5)
      .setDepth(1)
  }

  randomEmoji() {
    return this.emojies[Math.floor(Math.random() * this.emojies.length)]
  }

  randomPosition() {
    return {
      x: Math.floor(Math.random() * (1024 - 100)),
      y: Math.floor(Math.random() * (768 - 150))
    }
  }

  create() {
    const basePositionsShadows = {
      giraffe: { x: 200, y: 179 },
      elephant: { x: 500, y: 179 },
      snake: { x: 800, y: 179 }
    }

    const giraffeS = this.add
      .image(basePositionsShadows.giraffe.x, basePositionsShadows.giraffe.y, 'giraffe')
      .setScale(0.36)
      .setInteractive()
      .setDepth(1)
    giraffeS.setTint(0x000) // Apply gray tint
    giraffeS.setAlpha(0.7) // Make the image semi-transparent to emphasize the silhouette

    const elephantS = this.add
      .image(basePositionsShadows.elephant.x, basePositionsShadows.elephant.y, 'elephant')
      .setScale(0.36)
      .setInteractive()
      .setDepth(1)
    elephantS.setTint(0x000) // Apply gray tint
    elephantS.setAlpha(0.7) // Make the image semi-transparent to emphasize the silhouette

    const snakeS = this.add
      .image(basePositionsShadows.snake.x, basePositionsShadows.snake.y, 'snake')
      .setScale(0.36)
      .setInteractive()
      .setDepth(1)
    snakeS.setTint(0x000) // Apply gray tint
    snakeS.setAlpha(0.7) // Make the image semi-transparent to emphasize the silhouette

    const giraffe = this.add
      .image(this.randomPosition().x, this.randomPosition().y, 'giraffe')
      .setScale(0.35)
      .setInteractive()
      .setDepth(2)
    const elephant = this.add
      .image(this.randomPosition().x, this.randomPosition().y, 'elephant')
      .setScale(0.35)
      .setInteractive()
      .setDepth(2)
    const snake = this.add
      .image(this.randomPosition().x, this.randomPosition().y, 'snake')
      .setScale(0.35)
      .setInteractive()
      .setDepth(2)

    this.input.setDraggable([giraffe, elephant, snake])

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY

      const isGiraffeOnBase =
        Math.abs(giraffe.x - basePositionsShadows.giraffe.x) < 10 &&
        Math.abs(giraffe.y - basePositionsShadows.giraffe.y) < 10

      const isElephantOnBase =
        Math.abs(elephant.x - basePositionsShadows.elephant.x) < 10 &&
        Math.abs(elephant.y - basePositionsShadows.elephant.y) < 10

      const issnakeOnBase =
        Math.abs(snake.x - basePositionsShadows.snake.x) < 10 &&
        Math.abs(snake.y - basePositionsShadows.snake.y) < 10

      if (isGiraffeOnBase && isElephantOnBase && issnakeOnBase) {
        if (!this.label) {
          this.addCongratulationsText()
        }
      } else {
        if (this.label) {
          this.label.destroy()
          this.label = null
        }
      }
    })

    // this.addCongratulationsText()
  }

  addCongratulationsText() {
    this.label = this.add
      .text(512, 384, `Felicitaciones Logan! ${this.randomEmoji()}`, {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
      })
      .setOrigin(0.5)
      .setDepth(3)

    this.tweens.add({
      targets: this.label,
      scale: { from: 1, to: 2 },
      duration: 1000,
      ease: 'Power2',
      yoyo: true,
      onComplete: () => {
        this.label.destroy()
        this.label = null
      }
    })

    // this.tweens.add({
    //   targets: this.label,
    //   x: { value: this.cameras.main.width, duration: 3000, ease: 'Back.easeInOut' },
    //   y: { value: this.cameras.main.height, duration: 1500, ease: 'Sine.easeOut' },
    //   duration: 20000,
    //   ease: 'Power2',
    //   yoyo: true,
    //   repeat: -2
    // })
  }

  changeScene() {
    this.scene.start('GameOver')
  }
}

