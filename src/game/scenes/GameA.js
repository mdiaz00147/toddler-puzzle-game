import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

const NUM_OF_CLOUDS = 10
const NUM_OF_BIRDS = 2
const NUM_OF_ANIMALS = 9

export class GameA extends Scene {
  constructor() {
    super('GameA')

    this.emojies = ['🙉', '💩', '🚀', '😇', '🤩', '🥳', '🎸', '🎉', '🤓', '😬']
    this.label = null
    this.clouds = null
    this.animals = null
    this.birds = null
    this.animalsNames = {}
    this.animalsShadows = null
    this.animalLabelObj = null
    this.animalsOnBase = new Set()
    this.score = 0
  }

  preload() {
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')
    this.sWidth = this.cameras.main.width
    this.sHeight = this.cameras.main.height
    this.fontSize = Math.min(this.sWidth, this.sHeight) * 0.04 // Font size proportional to screen dimensions
    this.baseShades = {
      animalA: { x: this.sWidth / 6, y: this.sHeight * 0.2 },
      animalB: { x: this.sWidth / 2, y: this.sHeight * 0.2 },
      animalC: { x: (this.sWidth / 6) * 5, y: this.sHeight * 0.2 },
      animalD: { x: this.sWidth / 6, y: this.sHeight * 0.4 },
      animalE: { x: this.sWidth / 2, y: this.sHeight * 0.4 },
      animalF: { x: (this.sWidth / 6) * 5, y: this.sHeight * 0.4 },
      animalG: { x: this.sWidth / 6, y: this.sHeight * 0.6 },
      animalH: { x: this.sWidth / 2, y: this.sHeight * 0.6 },
      animalI: { x: (this.sWidth / 6) * 5, y: this.sHeight * 0.6 }
    }

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

  addAnimalLabel(animal) {
    // console.log('addAnimalLabel', this.animalsOnBase)
    if (this.animalsOnBase.has(animal)) {
      return
    }

    if (this.animalLabelObj) {
      this.animalLabelObj.text = ''
    }

    const x = this.sWidth / 2
    const y = this.sHeight * 0.6

    const textConfig = {
      fontFamily: 'Bruno Ace SC',
      fontSize: 80,
      color: '#ffffff'
    }

    this.animalLabelObj = this.add.text(0, y, animal, textConfig)
    this.animalLabelObj.x = x - this.animalLabelObj.displayWidth / 2
    this.animalLabelObj.text = ''

    let index = 0

    this.time.addEvent({
      delay: 200,
      callback: () => {
        this.animalLabelObj.text += animal[index]
        index++

        if (index === animal.length) {
          this.time.removeAllEvents()
        }
      },
      loop: true
    })
  }

  create() {
    console.log('create')
    this.start()
    this.addBirds()
    this.addClouds()

    // this.addCongratulationsText()

    WebFont.load({
      google: {
        families: ['Bruno Ace SC']
      },
      active: () => {
        this.scoreBoard = this.add
          .text(16, 16, `SCORE: 0`, {
            fontFamily: 'Bruno Ace SC',
            fontSize: '30px',
            fill: '#000000' // Same yellow color as the congratulations text
          })
          .setDepth(3)
      }
    })
  }

  start() {
    console.log('start')
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
    const shuffledAnimals = availableAnimals
      .sort(() => Math.random() - 0.5)
      .slice(0, NUM_OF_ANIMALS)

    for (let index = 0; index < shuffledAnimals.length; index++) {
      const animalKey = shuffledAnimals[index]
      const animalName = `animal${String.fromCharCode(65 + index)}`

      this.animalsNames[animalName] = animalKey
    }

    this.addAnimalsShadow(shuffledAnimals)
    this.addAnimals(shuffledAnimals)
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
    this.birds = this.add.group()

    this.anims.create({
      key: 'bird',
      frames: [{ key: 'frameA' }, { key: 'frameB' }],
      frameRate: 3,
      repeat: -1
    })
    for (let i = 0; i < NUM_OF_BIRDS; i++) {
      const x = Math.random() * this.sWidth
      const y = Math.random() * this.sHeight * 0.4
      const mySprite = this.add.sprite(x, y, 'frameA').setScale(2.5).setDepth(1)

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

      this.birds.add(mySprite)
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

  addAnimalsShadow(animals) {
    this.animalsShadows = this.add.group()
    console.log('addAnimalsShadow', animals)
    const scaleSizeShadow = Math.min(this.sWidth, this.sHeight) * 0.00071 // Scale size proportional to screen dimensions

    for (let index = 0; index < animals.length; index++) {
      const animalKey = animals[index]
      const animalShadow = this.add
        .image(
          this.baseShades[`animal${String.fromCharCode(65 + index)}`].x,
          this.baseShades[`animal${String.fromCharCode(65 + index)}`].y,
          animalKey
        )
        .setScale(scaleSizeShadow)
        .setInteractive()
        .setDepth(1)
      animalShadow.setTint(0x000)
      animalShadow.setAlpha(0.7)

      this.animalsShadows.add(animalShadow)
      this[`animal${String.fromCharCode(65 + index)}Shadow`] = animalShadow
    }
  }
  addAnimals(animals) {
    this.animals = this.add.group()

    const scaleSize = Math.min(this.sWidth, this.sHeight) * 0.0007 // Scale size proportional to screen dimensions

    const createAnimal = (key, index) => {
      const animal = this.add.image(0, 0, key).setScale(scaleSize).setInteractive().setDepth(2)
      animal.x = Phaser.Math.Clamp(
        Math.random() * this.sWidth,
        animal.displayWidth / 2,
        this.sWidth - animal.displayWidth / 2
      )
      animal.y = Phaser.Math.Clamp(
        Math.random() * this.sHeight,
        animal.displayHeight / 2,
        this.sHeight - animal.displayHeight / 2
      )

      this.animals.add(animal)
      // console.log('addAnimals', `animal${String.fromCharCode(65 + index)}`)
      this[`animal${String.fromCharCode(65 + index)}`] = animal

      return animal
    }

    const animalObjects = animals.map(createAnimal)

    this.input.setDraggable(animalObjects)
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      dragX = Phaser.Math.Clamp(
        dragX,
        gameObject.displayWidth / 2,
        this.sWidth - gameObject.displayWidth / 2
      )
      dragY = Phaser.Math.Clamp(
        dragY,
        gameObject.displayHeight / 2,
        this.sHeight - gameObject.displayHeight / 2
      )

      gameObject.x = dragX
      gameObject.y = dragY

      let onBaseCount = 0
      for (let index = 0; index < animalObjects.length; index++) {
        const animalKey = `animal${String.fromCharCode(65 + index)}`
        const isOnBase = this.isAnimalOnBase(animalKey)

        if (isOnBase) onBaseCount++
      }

      this.input.on('dragend', () => {
        if (onBaseCount === animalObjects.length) {
          if (!this.label) {
            this.addCongratulationsText(scaleSize)
          }
        } else {
          if (this.label) {
            this.label.destroy()
            this.tweens.killTweensOf(this.label)
            this.label = null
          }
        }
      })
    })
  }

  isAnimalOnBase(animalKey) {
    // console.log('isAnimalOnBase', animalKey)
    const scaleSizeShadowOnBase = Math.min(this.sWidth, this.sHeight) * 0.00073 // Scale size proportional to screen dimensions
    const scaleSizeShadow = Math.min(this.sWidth, this.sHeight) * 0.00071 // Scale size proportional to screen dimensions
    const isOnBase =
      Math.abs(this[animalKey].x - this.baseShades[animalKey].x) < 10 &&
      Math.abs(this[animalKey].y - this.baseShades[animalKey].y) < 10

    if (isOnBase) {
      this[`${animalKey}Shadow`].setTint(0x00ff00)
      this[`${animalKey}Shadow`].setTintFill(0x00ff00)
      this[`${animalKey}Shadow`].setAlpha(1)
      this[`${animalKey}Shadow`].setScale(scaleSizeShadowOnBase)

      this.addAnimalLabel(this.animalsNames[animalKey])

      this.animalsOnBase.add(this.animalsNames[animalKey])
    } else {
      this[`${animalKey}Shadow`].setTint(0x000)
      this[`${animalKey}Shadow`].setAlpha(0.7)
      this[`${animalKey}Shadow`].setScale(scaleSizeShadow)

      this.animalsOnBase.delete(this.animalsNames[animalKey])
    }

    return isOnBase
  }

  resetAnimals() {
    this.animals.clear(true, true)
    this.animalsShadows.clear(true, true)

    this.start()
  }

  resetClouds() {
    this.clouds.clear(true, true)

    this.addClouds()
  }

  resetBirds() {
    this.birds.clear(true, true)

    this.addBirds()
  }

  addCongratulationsText(scaleSize) {
    this.label = this.add
      .text(
        this.sWidth / 2,
        this.sHeight - this.sHeight / 4,
        `Ganaste Logan!\n${this.randomEmoji()}`,
        {
          fontFamily: 'Bruno Ace SC',
          fontSize: `${this.fontSize}px`,
          color: '#ffcc00', // A color that combines well with a typical game background
          stroke: '#000000',
          strokeThickness: 20,
          align: 'center'
        }
      )
      .setOrigin(0.5)
      .setDepth(3)

    this.tweens.add({
      targets: this.label,
      scale: { from: 1, to: 1.4 },
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      onUpdate: () => {
        this.label.setFontSize(`${this.fontSize * this.label.scaleX}px`)
      },
      onComplete: () => {
        this.score++
        this.scoreBoard.text = `SCORE: ${this.score}`
        this.label.destroy()
        this.label = null
        this.animalLabelObj.text = ''

        this.resetAnimals(scaleSize)
        this.resetClouds()
        this.resetBirds()
      }
    })
  }

  changeScene() {
    this.scene.start('GameOver')
  }
}

