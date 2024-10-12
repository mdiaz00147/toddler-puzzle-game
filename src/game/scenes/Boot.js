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

    this.load.image('cloud-b', 'assets/clouds/cloud-computing.png')
    this.load.image('cloud-c', 'assets/clouds/cloud.png')

    this.load.image('sky', 'assets/elements/sky.png')
    this.load.image('ground', 'assets/elements/platform.png')
    this.load.image('star', 'assets/elements/star.png')
    this.load.image('bomb', 'assets/elements/bomb.png')
    this.load.image('brick', 'assets/elements/brick.png')

    this.load.image('frameA', 'assets/crateboy/_ART/birds/spr_bird1_0.png')
    this.load.image('frameB', 'assets/crateboy/_ART/birds/spr_bird1_1.png')
  }

  create() {
    this.scene.start('Preloader')
  }
}

