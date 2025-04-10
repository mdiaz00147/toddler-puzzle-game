import { Scene } from 'phaser'

export class Boot extends Scene {
  constructor() {
    super('Boot')
  }

  preload() {
    console.log('boot_preload')

    // Load the WebFont script only — wait to load fonts + assets in create()
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')

    // Load a small background to show behind the loader
    this.load.image('background', 'assets/backgrounds/D.png')
    this.sWidth = this.cameras.main.width
    this.sHeight = this.cameras.main.height
  }

  create() {
    WebFont.load({
      google: {
        families: ['Bruno Ace SC', 'Fredoka']
      },
      active: () => {
        // Show outline of the loading bar
        const barWidth = this.sWidth * 0.6
        const barHeight = this.sHeight * 0.04
        const barX = this.sWidth / 2
        const barY = this.sHeight / 2

        this.add
          .image(this.sWidth / 2, this.sHeight / 2, 'background')
          .setOrigin(0.5)
          .setDisplaySize(this.sWidth, this.sHeight)
        // Outline of the loading bar
        this.add.rectangle(barX, barY, barWidth, barHeight).setStrokeStyle(1, 0xffffff)

        // Inner bar that will expand with progress
        const bar = this.add
          .rectangle(barX - barWidth / 2, barY, 4, barHeight - 4, 0xffffff)
          .setOrigin(0, 0.5)

        // Listen for progress updates
        this.load.on('progress', (progress) => {
          bar.width = 4 + (barWidth - 8) * progress
        })

        // Load all game assets now that font is ready
        this.loadGameAssets()

        // Start loading!
        this.load.once('complete', () => {
          this.scene.start('MainMenu')
        })

        this.load.start()
      },
      inactive: () => {
        console.warn('WebFont failed to load. Proceeding anyway.')
        this.scene.start('MainMenu')
      }
    })
  }

  loadGameAssets() {
    // BUTTONS
    this.load.image('button_back', 'assets/buttons/back.png')

    // BACKGROUNDS
    this.load.image('background_a', 'assets/backgrounds/A.png')
    this.load.image('background_b', 'assets/backgrounds/B.png')
    this.load.image('background_c', 'assets/backgrounds/C.png')
    this.load.image('background_d', 'assets/backgrounds/D.png')
    this.load.image('background_e', 'assets/backgrounds/E.png')

    // TOYS-CARTOON
    const animalCartoonPackName = 'animal_cartoon'
    const animalCartoonPath = 'A.png'
    const animalCartoonWidth = 310
    for (let i = 0; i <= 8; i++) {
      this.load.spritesheet(
        `asset_${animalCartoonPackName}_${String.fromCharCode(97 + i)}`,
        `assets/emojis-pack/${animalCartoonPath}`,
        {
          frameWidth: animalCartoonWidth,
          startFrame: i === 0 ? undefined : i
        }
      )
    }

    // MISTIC-LEGO
    const misticLegoPackName = 'mistic_lego'
    const misticLegoPath = 'B.png'
    const misticLegoWidth = 310
    for (let i = 0; i <= 8; i++) {
      this.load.spritesheet(
        `asset_${misticLegoPackName}_${String.fromCharCode(97 + i)}`,
        `assets/emojis-pack/${misticLegoPath}`,
        {
          frameWidth: misticLegoWidth,
          startFrame: i === 0 ? undefined : i
        }
      )
    }

    // EMOJIS-LEGO
    const emojisLegoPackName = 'emojis_lego'
    const emojisLegoPath = 'C.png'
    const emojisLegoWidth = 310
    for (let i = 0; i <= 8; i++) {
      this.load.spritesheet(
        `asset_${emojisLegoPackName}_${String.fromCharCode(97 + i)}`,
        `assets/emojis-pack/${emojisLegoPath}`,
        {
          frameWidth: emojisLegoWidth,
          startFrame: i === 0 ? undefined : i
        }
      )
    }

    // AUDIO
    this.load.audio('collect', 'assets/crateboy/_AUDIO/collect.wav')
    this.load.audio('sfx_collect', 'assets/crateboy/_AUDIO/sfx_collect.wav')

    // ELEMENTS
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
  }
}

