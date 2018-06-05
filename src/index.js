import Phaser from 'phaser'
import './index.css'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
}

const game = new Phaser.Game(config)

let platforms

function preload() {
  this.load.image('sky', 'src/assets/sky.png')
  this.load.image('ground', 'src/assets/platform.png')
  this.load.image('star', 'src/assets/star.png')
  this.load.image('bomb', 'src/assets/bomb.png')
  this.load.spritesheet('dude', 'src/assets/dude.png', { frameWidth: 32, frameHeight: 48 })
}

function create() {
  this.add.image(400, 300, 'sky')

  platforms = this.physics.add.staticGroup()

  platforms.create(400, 568, 'ground').setScale(2).refreshBody()

  platforms.create(600, 400, 'ground')
  platforms.create(50, 250, 'ground')
  platforms.create(750, 220, 'ground')
}

function update() {

}
