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
let player
let cursors
let stars

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

  player = this.physics.add.sprite(100, 450, 'dude')
  player.setBounce(0.1)
  player.setCollideWorldBounds(true)

  cursors = this.input.keyboard.createCursorKeys()

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  })
  stars.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
  })

  this.physics.add.collider(player, platforms)
  this.physics.add.collider(stars, platforms)
  this.physics.add.overlap(player, stars, collectStar, null, this)

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  })

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  })
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160)
    player.anims.play('left', true)
  } else if (cursors.right.isDown) {
    player.setVelocityX(160)
    player.anims.play('right', true)
  } else {
    player.setVelocityX(0)
    player.anims.play('turn')
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330)
  }
}

function collectStar(player, star) {
  star.disableBody(true, true)
}
