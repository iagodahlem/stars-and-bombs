import Phaser from 'phaser'
import './index.css'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update,
  },
}

const game = new Phaser.Game(config)

function preload() {
  this.load.image('sky', 'src/assets/sky.png')
  this.load.image('ground', 'src/assets/platform.png')
  this.load.image('star', 'src/assets/star.png')
  this.load.image('bomb', 'src/assets/bomb.png')
  this.load.spritesheet('dude', 'src/assets/dude.png', { frameWidth: 32, frameHeight: 48 })
}

function create() {
  this.add.image(400, 300, 'sky')
}

function update() {

}
