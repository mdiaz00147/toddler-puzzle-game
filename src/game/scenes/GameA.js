import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

const NUM_OF_CLOUDS = 10
const NUM_OF_BIRDS = 2

export class GameA extends Scene {
  constructor() {
    super('GameA')

    this.emojies = ['🙉', '💩', '🚀', '😇', '🤩', '🥳']
    this.label = null
    this.clouds = null
    this.animals = null
    this.animalsShadows = null
    this.score = 0
  }

  preload() {
    this.scoreBoard = this.add.text(16, 16, `SCORE: 0`, {
      fontSize: '32px',
      fill: '#000'
    })

    this.sWidth = this.cameras.main.width
    this.sHeight = this.cameras.main.height
    this.fontSize = Math.min(this.sWidth, this.sHeight) * 0.04 // Font size proportional to screen dimensions

    const brownSquare = this.add.graphics()
    brownSquare
      .fillStyle(0x8b4513, 1)
      .fillRect(0, this.sHeight - this.sHeight * 0.1, this.sWidth, this.sHeight * 0.1)
      .setDepth(0)

    const brickBase = this.add
      .image(0, this.sHeight, 'brick')
      .setScale(0.1)
      .setOrigin(0, 1)
      .setDepth(0)

    const brickWidth = brickBase.width * brickBase.scaleX
    const brickHeight = brickBase.height * brickBase.scaleY
    const numBricks = Math.ceil(this.sWidth / brickWidth)
    const numRows = 4

    for (let level = 0; level < numRows; level++) {
      const offsetX = level % 2 === 0 ? 0 : brickWidth / 2 // Offset every other row

      for (let i = -1; i < numBricks; i++) {
        this.add
          .image(i * brickWidth + offsetX, this.sHeight - level * brickHeight, 'brick')
          .setScale(0.1)
          .setOrigin(0, 1)
          .setDepth(0)
      }
    }
  }

  create() {
    this.addBirds()
    this.addClouds()
    this.start()
  }

  start() {
    const basePositionsShadows = {
      animalA: { x: this.sWidth / 6, y: this.sHeight * 0.2 },
      animalB: { x: this.sWidth / 2, y: this.sHeight * 0.2 },
      animalC: { x: (this.sWidth / 6) * 5, y: this.sHeight * 0.2 }
    }

    const scaleSize = Math.min(this.sWidth, this.sHeight) * 0.0007 // Scale size proportional to screen dimensions
    const shuffledAnimals = this.shuffledAnimals()
    const [animalAKey, animalBKey, animalCKey] = shuffledAnimals

    this.addAnimalsShadow(basePositionsShadows, scaleSize, animalAKey, animalBKey, animalCKey)
    this.addAnimals(basePositionsShadows, scaleSize, animalAKey, animalBKey, animalCKey)
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

  addBirds() {
    for (let i = 0; i < NUM_OF_BIRDS; i++) {
      const x = Math.random() * this.sWidth
      const y = Math.random() * this.sHeight * 0.4
      const mySprite = this.add.sprite(x, y, 'frameA').setScale(2.5).setDepth(1)

      this.anims.create({
        key: 'bird', // Animation key
        frames: [
          { key: 'frameA' }, // Frame 1
          { key: 'frameB' } // Frame 2
        ],
        frameRate: 3, // Number of frames per second (adjust this)
        repeat: -1 // Loop the animation indefinitely
      })

      mySprite.play('bird', true)

      let yValue = '-=500'
      let xValue = '+=500'

      this.tweens.add({
        targets: mySprite,
        x: xValue,
        repeat: -1,
        duration: 6000,
        ease: 'Power1',
        yoyo: true,
        flipX: true
      })
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

  shuffledAnimals() {
    const availableAnimals = [
      'elephant',
      'giraffe',
      'hippo',
      'monkey',
      'panda',
      'parrot',
      'penguin',
      'pig',
      'rabbit',
      'snake'
    ]

    return Phaser.Utils.Array.Shuffle(availableAnimals).slice(0, 3)
  }

  addAnimalsShadow(basePositionsShadows, scaleSize, animalAKey, animalBKey, animalCKey) {
    this.animalsShadows = this.add.group()

    const scaleSizeShadow = Math.min(this.sWidth, this.sHeight) * 0.00071 // Scale size proportional to screen dimensions

    this.animalAShadow = this.add
      .image(basePositionsShadows.animalA.x, basePositionsShadows.animalA.y, animalAKey)
      .setScale(scaleSizeShadow)
      .setInteractive()
      .setDepth(1)
    this.animalAShadow.setTint(0x000) // Apply gray tint
    this.animalAShadow.setAlpha(0.7) // Make the image semi-transparent to emphasize the silhouette

    this.animalBShadow = this.add
      .image(basePositionsShadows.animalB.x, basePositionsShadows.animalB.y, animalBKey)
      .setScale(scaleSizeShadow)
      .setInteractive()
      .setDepth(1)
    this.animalBShadow.setTint(0x000) // Apply gray tint
    this.animalBShadow.setAlpha(0.7) // Make the image semi-transparent to emphasize the silhouette

    this.animalCShadow = this.add
      .image(basePositionsShadows.animalC.x, basePositionsShadows.animalC.y, animalCKey)
      .setScale(scaleSizeShadow)
      .setInteractive()
      .setDepth(1)
    this.animalCShadow.setTint(0x000) // Apply gray tint
    this.animalCShadow.setAlpha(0.7) // Make the image semi-transparent to emphasize the silhouette

    this.animalsShadows.add(this.animalAShadow)
    this.animalsShadows.add(this.animalBShadow)
    this.animalsShadows.add(this.animalCShadow)
  }

  addAnimals(basePositionsShadows, scaleSize, animalAKey, animalBKey, animalCKey) {
    this.animals = this.add.group()

    const createAnimal = (key) => {
      let animal
      let isOverlapping

      do {
        isOverlapping = false
        const position = this.randomPosition()
        animal = this.add
          .image(position.x, position.y, key)
          .setScale(scaleSize)
          .setInteractive()
          .setDepth(2)

        // Check for overlap with existing animals
        this.animals.getChildren().forEach((existingAnimal) => {
          const distance = Phaser.Math.Distance.Between(
            animal.x,
            animal.y,
            existingAnimal.x,
            existingAnimal.y
          )
          if (distance < animal.width * scaleSize * 1.1) {
            // 10% distance
            isOverlapping = true
            animal.destroy()
          }
        })
      } while (isOverlapping)

      this.animals.add(animal)
      return animal
    }

    this.animalA = createAnimal(animalAKey)
    this.animalB = createAnimal(animalBKey)
    this.animalC = createAnimal(animalCKey)

    this.input.setDraggable([this.animalA, this.animalB, this.animalC])

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY

      const isAnimalAOnBase =
        Math.abs(this.animalA.x - basePositionsShadows.animalA.x) < 10 &&
        Math.abs(this.animalA.y - basePositionsShadows.animalA.y) < 10

      const isAnimalBOnBase =
        Math.abs(this.animalB.x - basePositionsShadows.animalB.x) < 10 &&
        Math.abs(this.animalB.y - basePositionsShadows.animalB.y) < 10

      const isanimalCOnBase =
        Math.abs(this.animalC.x - basePositionsShadows.animalC.x) < 10 &&
        Math.abs(this.animalC.y - basePositionsShadows.animalC.y) < 10

      this.isAnimalOnBase('animalAShadow', isAnimalAOnBase)
      this.isAnimalOnBase('animalBShadow', isAnimalBOnBase)
      this.isAnimalOnBase('animalCShadow', isanimalCOnBase)

      if (isAnimalAOnBase && isAnimalBOnBase && isanimalCOnBase) {
        this.score++
        this.scoreBoard.setText(`SCORE: ${this.score}`)

        if (!this.label) {
          this.addCongratulationsText(basePositionsShadows, scaleSize)
        }
      } else {
        if (this.label) {
          this.label.destroy()
          this.tweens.killTweensOf(this.label)
          this.label = null
        }
      }
    })
  }

  isAnimalOnBase(animal, isOnBase) {
    const scaleSizeShadowOnBase = Math.min(this.sWidth, this.sHeight) * 0.00073 // Scale size proportional to screen dimensions
    const scaleSizeShadow = Math.min(this.sWidth, this.sHeight) * 0.00071 // Scale size proportional to screen dimensions

    if (isOnBase) {
      this[animal].setTint(0x00ff00)
      this[animal].setTintFill(0x00ff00)
      this[animal].setAlpha(1)
      this[animal].setScale(scaleSizeShadowOnBase)
    } else {
      this[animal].setTint(0x000)
      this[animal].setAlpha(0.7)
      this[animal].setScale(scaleSizeShadow)
    }
  }

  resetAnimals(basePositionsShadows, scaleSize) {
    this.animals.clear(true, true)
    this.animalsShadows.clear(true, true)

    this.start()
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
          fontFamily: 'Comic Sans MS, Comic Sans, cursive', // Changed font family to a cooler one
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

