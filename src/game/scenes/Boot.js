import { Scene } from 'phaser'

export class Boot extends Scene {
  constructor() {
    super('Boot')
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.image('background', 'assets/bg.png')
    this.load.image('elephant', 'assets/animal-pack/PNG/Round (outline)/elephant.png')
    this.load.image('giraffe', 'assets/animal-pack/PNG/Round (outline)/giraffe.png')
    this.load.image('hippo', 'assets/animal-pack/PNG/Round (outline)/hippo.png')
    this.load.image('monkey', 'assets/animal-pack/PNG/Round (outline)/monkey.png')
    this.load.image('panda', 'assets/animal-pack/PNG/Round (outline)/panda.png')
    this.load.image('parrot', 'assets/animal-pack/PNG/Round (outline)/parrot.png')
    this.load.image('penguin', 'assets/animal-pack/PNG/Round (outline)/penguin.png')
    this.load.image('pig', 'assets/animal-pack/PNG/Round (outline)/pig.png')
    this.load.image('rabbit', 'assets/animal-pack/PNG/Round (outline)/rabbit.png')
    this.load.image('snake', 'assets/animal-pack/PNG/Round (outline)/snake.png')

    this.load.svg('snakev', 'assets/animal-pack/Vector/round_nodetails.svg')

    this.load.spritesheet('dude', 'assets/animal-pack/Spritesheet/round_nodetails_outline.png', {
      frameWidth: 32,
      frameHeight: 48
    })
  }

  create() {
    this.scene.start('Preloader')
  }
}

