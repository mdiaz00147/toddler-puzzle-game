import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

const NUM_OF_CLOUDS = 10
export class Game extends Scene {
  constructor() {
    super('Game')

    this.emojies = ['🙉', '💩', '🚀', '😇', '🤩', '🥳']
  }

  preload() {
    this.sWidth = this.cameras.main.width
    this.sHeight = this.cameras.main.height

    const brownSquare = this.add.graphics()
    brownSquare.fillStyle(0x8b4513, 1) // Brown color
    const rectHeight = this.sHeight * 0.1
    brownSquare.fillRect(0, this.sHeight - rectHeight, this.sWidth, rectHeight).setDepth(0)

    this.fontSize = Math.min(this.sWidth, this.sHeight) * 0.04 // Font size proportional to screen dimensions

    this.add
      .text(
        this.sWidth / 2,
        this.sHeight - rectHeight / 2, // Adjusted to align vertically to the center of the square
        'Arrastra los animales a sus posiciones !',
        {
          fontFamily: 'Arial',
          fontSize: `${this.fontSize}px`,
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
      x: Math.floor(Math.random() * (this.sWidth - 100)),
      y: Math.floor(Math.random() * (this.sHeight - 150))
    }
  }

  addClouds() {
    const cloudTypes = ['cloud-b', 'cloud-c']
    const cloudScales = [
      Math.min(this.sWidth, this.sHeight) * 0.00012,
      Math.min(this.sWidth, this.sHeight) * 0.00016,
      Math.min(this.sWidth, this.sHeight) * 0.0002
    ]

    this.clouds = this.add.group()

    for (let i = 0; i < NUM_OF_CLOUDS; i++) {
      let cloud
      let isOverlapping

      do {
        isOverlapping = false

        const x = Math.random() * this.sWidth
        const y = Math.random() * this.sHeight * 0.4
        const cloudType = cloudTypes[Math.floor(Math.random() * cloudTypes.length)]
        const cloudScaleSize = cloudScales[Math.floor(Math.random() * cloudScales.length)]

        cloud = this.add.image(x, y, cloudType)
        cloud.setScale(cloudScaleSize)
        cloud.setDepth(0)
        cloud.setFlipX(Math.random() < 0.5) // Randomly flip the cloud on the x-axis

        // Check for overlap with existing clouds
        const existingClouds = this.clouds.getChildren()

        for (let j = 0; j < existingClouds.length; j++) {
          const existingCloud = existingClouds[j]
          
          if (
            Phaser.Geom.Intersects.RectangleToRectangle(
              cloud.getBounds(),
              existingCloud.getBounds()
            )
          ) {
            isOverlapping = true

            cloud.destroy()

            break
          }
        }
      } while (isOverlapping)

      this.clouds.add(cloud)
    }
  }

  create() {
    this.addClouds()

    const basePositionsShadows = {
      giraffe: { x: this.sWidth / 6, y: this.sHeight * 0.2 },
      elephant: { x: this.sWidth / 2, y: this.sHeight * 0.2 },
      snake: { x: (this.sWidth / 6) * 5, y: this.sHeight * 0.2 }
    }

    const scaleSizeShadow = Math.min(this.sWidth, this.sHeight) * 0.00071 // Scale size proportional to screen dimensions
    const scaleSize = Math.min(this.sWidth, this.sHeight) * 0.0007 // Scale size proportional to screen dimensions

    const giraffeS = this.add
      .image(basePositionsShadows.giraffe.x, basePositionsShadows.giraffe.y, 'giraffe')
      .setScale(scaleSizeShadow)
      .setInteractive()
      .setDepth(1)
    giraffeS.setTint(0x000) // Apply gray tint
    giraffeS.setAlpha(0.7) // Make the image semi-transparent to emphasize the silhouette

    const elephantS = this.add
      .image(basePositionsShadows.elephant.x, basePositionsShadows.elephant.y, 'elephant')
      .setScale(scaleSizeShadow)
      .setInteractive()
      .setDepth(1)
    elephantS.setTint(0x000) // Apply gray tint
    elephantS.setAlpha(0.7) // Make the image semi-transparent to emphasize the silhouette

    const snakeS = this.add
      .image(basePositionsShadows.snake.x, basePositionsShadows.snake.y, 'snake')
      .setScale(scaleSizeShadow)
      .setInteractive()
      .setDepth(1)
    snakeS.setTint(0x000) // Apply gray tint
    snakeS.setAlpha(0.7) // Make the image semi-transparent to emphasize the silhouette

    this.addAnimals(basePositionsShadows, scaleSize)
  }

  addAnimals(basePositionsShadows, scaleSize) {
    this.giraffe = this.add
      .image(this.randomPosition().x, this.randomPosition().y, 'giraffe')
      .setScale(scaleSize)
      .setInteractive()
      .setDepth(2)
    this.elephant = this.add
      .image(this.randomPosition().x, this.randomPosition().y, 'elephant')
      .setScale(scaleSize)
      .setInteractive()
      .setDepth(2)
    this.snake = this.add
      .image(this.randomPosition().x, this.randomPosition().y, 'snake')
      .setScale(scaleSize)
      .setInteractive()
      .setDepth(2)

    this.input.setDraggable([this.giraffe, this.elephant, this.snake])

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY

      const isGiraffeOnBase =
        Math.abs(this.giraffe.x - basePositionsShadows.giraffe.x) < 10 &&
        Math.abs(this.giraffe.y - basePositionsShadows.giraffe.y) < 10

      const isElephantOnBase =
        Math.abs(this.elephant.x - basePositionsShadows.elephant.x) < 10 &&
        Math.abs(this.elephant.y - basePositionsShadows.elephant.y) < 10

      const issnakeOnBase =
        Math.abs(this.snake.x - basePositionsShadows.snake.x) < 10 &&
        Math.abs(this.snake.y - basePositionsShadows.snake.y) < 10

      if (isGiraffeOnBase && isElephantOnBase && issnakeOnBase) {
        if (!this.label) {
          this.addCongratulationsText(basePositionsShadows, scaleSize)
        }
      } else {
        if (this.label) {
          this.label.destroy()
          this.label = null
        }
      }
    })
  }

  resetAnimals(basePositionsShadows, scaleSize) {
    // Remove existing animals
    this.giraffe.destroy()
    this.elephant.destroy()
    this.snake.destroy()

    // Add animals again
    this.addAnimals(basePositionsShadows, scaleSize)
  }

  resetClouds() {
    this.clouds.clear(true, true)

    this.addClouds()
  }

  addCongratulationsText(basePositionsShadows, scaleSize) {
    this.label = this.add
      .text(
        this.sWidth / 2,
        this.sHeight - this.sHeight / 4,
        `Felicitaciones Logan!\n${this.randomEmoji()}`,
        {
          fontFamily: 'Arial Black',
          fontSize: `${this.fontSize}px`,
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4,
          align: 'center'
        }
      )
      .setOrigin(0.5)
      .setDepth(3)

    this.tweens.add({
      targets: this.label,
      scale: { from: 1, to: 1.2 },
      duration: 1000,
      ease: 'Power2',
      yoyo: true,
      onUpdate: () => {
        this.label.setFontSize(`${this.fontSize * this.label.scaleX}px`)
      },
      onComplete: () => {
        this.label.destroy()
        this.label = null

        this.resetAnimals(basePositionsShadows, scaleSize)
        this.resetClouds()
      }
    })
  }

  changeScene() {
    this.scene.start('GameOver')
  }
}

