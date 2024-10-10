import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class Game extends Scene {
  constructor() {
    super('Game')
  }

  preload() {
    // this.load.image('background', 'assets/background.png')
    const gradient = this.add.graphics()
    gradient.fillGradientStyle(0x87cefa, 0x87cefa, 0x0000ff, 0x0000ff, 1)
    gradient.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
  }

  update(time, delta) {
    // Game logic to be executed every frame
  }

  pauseGame() {
    // this.scene.pause()
    // EventBus.emit('game-paused')
  }

  resumeGame() {
    // this.scene.resume()
    // EventBus.emit('game-resumed')
  }

  create() {
    const baseSquareInitialPosition = {
      x: this.cameras.main.width / 2,
      y: this.cameras.main.height / 2
    }

    this.add.rectangle(baseSquareInitialPosition.x, baseSquareInitialPosition.y, 300, 300, 0x808080)

    const square = this.add
      .rectangle(this.cameras.main.width, this.cameras.main.height, 300, 300, 0x00ff00)
      .setInteractive()
      .setDepth(1)

    console.log(square)

    this.input.setDraggable(square)

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      console.log(
        `Dragging to x: ${Math.abs(gameObject.x - baseSquareInitialPosition.x) < 10}, y: ${Math.abs(gameObject.y - baseSquareInitialPosition.y) < 10}`
      )

      gameObject.x = dragX
      gameObject.y = dragY

      if (
        Math.abs(gameObject.x - baseSquareInitialPosition.x) < 10 &&
        Math.abs(gameObject.y - baseSquareInitialPosition.y) < 10
      ) {
        if (!this.label) {
          this.label = this.add
            .text(baseSquareInitialPosition.x, baseSquareInitialPosition.y - 50, 'Yeiii (:', {
              fontSize: '32px',
              fill: '#000'
            })
            .setOrigin(0.5)
            .setDepth(2)
        }
      } else {
        if (this.label) {
          this.label.destroy()
          this.label = null
        }
      }
    })
  }

  changeScene() {
    this.scene.start('GameOver')
  }
}

