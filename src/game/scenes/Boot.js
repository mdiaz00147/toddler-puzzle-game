import { Scene } from 'phaser'

export class Boot extends Scene {
  constructor() {
    super('Boot')
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')

    // buttons
    this.load.image('button_back', 'assets/buttons/back.png')

    // backgrounds
    this.load.image('background_a', 'assets/backgrounds/A.png')
    this.load.image('background_b', 'assets/backgrounds/B.png')
    this.load.image('background_c', 'assets/backgrounds/C.png')
    this.load.image('background_d', 'assets/backgrounds/D.png')

    // toys-cartoon
    const animalCartoonPackName = 'animal_cartoon'
    const animalCartoonPath = 'A.png'
    const animalCartoonWidth = 310

    this.load.spritesheet(`asset_${animalCartoonPackName}_a`, `assets/emojis-pack/${animalCartoonPath}`, {
      frameWidth: animalCartoonWidth
    })
    this.load.spritesheet(`asset_${animalCartoonPackName}_b`, `assets/emojis-pack/${animalCartoonPath}`, {
      frameWidth: animalCartoonWidth,
      startFrame: 1
    })
    this.load.spritesheet(`asset_${animalCartoonPackName}_c`, `assets/emojis-pack/${animalCartoonPath}`, {
      frameWidth: animalCartoonWidth,
      startFrame: 2
    })
    this.load.spritesheet(`asset_${animalCartoonPackName}_d`, `assets/emojis-pack/${animalCartoonPath}`, {
      frameWidth: animalCartoonWidth,
      startFrame: 3
    })
    this.load.spritesheet(`asset_${animalCartoonPackName}_e`, `assets/emojis-pack/${animalCartoonPath}`, {
      frameWidth: animalCartoonWidth,
      startFrame: 4
    })
    this.load.spritesheet(`asset_${animalCartoonPackName}_f`, `assets/emojis-pack/${animalCartoonPath}`, {
      frameWidth: animalCartoonWidth,
      startFrame: 5
    })
    this.load.spritesheet(`asset_${animalCartoonPackName}_g`, `assets/emojis-pack/${animalCartoonPath}`, {
      frameWidth: animalCartoonWidth,
      startFrame: 6
    })
    this.load.spritesheet(`asset_${animalCartoonPackName}_h`, `assets/emojis-pack/${animalCartoonPath}`, {
      frameWidth: animalCartoonWidth,
      startFrame: 7
    })
    this.load.spritesheet(`asset_${animalCartoonPackName}_i`, `assets/emojis-pack/${animalCartoonPath}`, {
      frameWidth: animalCartoonWidth,
      startFrame: 8
    })


    // mistic-lego
    const misticLegoPackName = 'mistic_lego'
    const misticLegoPath = 'B.png'
    const misticLegoWidth = 310

    this.load.spritesheet(`asset_${misticLegoPackName}_a`, `assets/emojis-pack/${misticLegoPath}`, {
      frameWidth: misticLegoWidth
    })
    this.load.spritesheet(`asset_${misticLegoPackName}_b`, `assets/emojis-pack/${misticLegoPath}`, {
      frameWidth: misticLegoWidth,
      startFrame: 1
    })
    this.load.spritesheet(`asset_${misticLegoPackName}_c`, `assets/emojis-pack/${misticLegoPath}`, {
      frameWidth: misticLegoWidth,
      startFrame: 2
    })
    this.load.spritesheet(`asset_${misticLegoPackName}_d`, `assets/emojis-pack/${misticLegoPath}`, {
      frameWidth: misticLegoWidth,
      startFrame: 3
    })
    this.load.spritesheet(`asset_${misticLegoPackName}_e`, `assets/emojis-pack/${misticLegoPath}`, {
      frameWidth: misticLegoWidth,
      startFrame: 4
    })
    this.load.spritesheet(`asset_${misticLegoPackName}_f`, `assets/emojis-pack/${misticLegoPath}`, {
      frameWidth: misticLegoWidth,
      startFrame: 5
    })
    this.load.spritesheet(`asset_${misticLegoPackName}_g`, `assets/emojis-pack/${misticLegoPath}`, {
      frameWidth: misticLegoWidth,
      startFrame: 6
    })
    this.load.spritesheet(`asset_${misticLegoPackName}_h`, `assets/emojis-pack/${misticLegoPath}`, {
      frameWidth: misticLegoWidth,
      startFrame: 7
    })
    this.load.spritesheet(`asset_${misticLegoPackName}_i`, `assets/emojis-pack/${misticLegoPath}`, {
      frameWidth: misticLegoWidth,
      startFrame: 8
    })

    // elements
    this.load.image('cloud-b', 'assets/clouds/cloud-computing.png')
    this.load.image('cloud-c', 'assets/clouds/cloud.png')
    this.load.image('sky', 'assets/elements/sky.png')
    this.load.image('ground', 'assets/elements/platform.png')
    this.load.image('star', 'assets/elements/star.png')
    this.load.image('bomb', 'assets/elements/bomb.png')
    this.load.image('brick', 'assets/elements/brick.png')
    this.load.image('frameA', 'assets/crateboy/_ART/birds/spr_bird1_0.png')
    this.load.image('frameB', 'assets/crateboy/_ART/birds/spr_bird1_1.png')
    this.load.image('wall', 'assets/crateboy/_ART/Wall tiles/wall3.png')

    // audio
    this.load.audio('collect', 'assets/crateboy/_AUDIO/collect.wav')
    this.load.audio('sfx_collect', 'assets/crateboy/_AUDIO/sfx_collect.wav')
  }

  create() {
    WebFont.load({
      google: {
        families: ['Bruno Ace SC', 'Fredoka']
      }
    })

    this.scene.start('Preloader')
  }
}

