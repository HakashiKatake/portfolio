import Phaser from "phaser";

export function createPlayer(scene: Phaser.Scene, x: number, y: number): Phaser.Physics.Arcade.Sprite {
  const player = scene.physics.add.sprite(x, y, "player-idle").setScale(2);
  player.setCollideWorldBounds(true);
  player.setDepth(10);
  player.body!.setSize(16, 20);
  player.body!.setOffset(4, 4);
  return player;
}

export function setupPlayerAnimations(scene: Phaser.Scene) {
  // Idle animation
  if (!scene.anims.exists("idle")) {
    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("player-idle", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  // Run animation
  if (!scene.anims.exists("run")) {
    scene.anims.create({
      key: "run",
      frames: scene.anims.generateFrameNumbers("player-run", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  // Jump animation
  if (!scene.anims.exists("jump")) {
    scene.anims.create({
      key: "jump",
      frames: scene.anims.generateFrameNumbers("player-jump", { start: 0, end: 1 }),
      frameRate: 6,
      repeat: 0,
    });
  }

  // Fall animation
  if (!scene.anims.exists("fall")) {
    scene.anims.create({
      key: "fall",
      frames: scene.anims.generateFrameNumbers("player-fall", { start: 0, end: 1 }),
      frameRate: 6,
      repeat: 0,
    });
  }
}

export function updatePlayer(
  player: Phaser.Physics.Arcade.Sprite,
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  wasd?: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key }
) {
  const onGround = player.body!.blocked.down;
  const speed = 160;

  const left = cursors.left.isDown || (wasd?.A.isDown ?? false);
  const right = cursors.right.isDown || (wasd?.D.isDown ?? false);
  const jump = cursors.space.isDown || (wasd?.W.isDown ?? false);

  // Horizontal movement
  if (left) {
    player.setVelocityX(-speed);
    player.setFlipX(true);
    if (onGround) player.play("run", true);
  } else if (right) {
    player.setVelocityX(speed);
    player.setFlipX(false);
    if (onGround) player.play("run", true);
  } else {
    player.setVelocityX(0);
    if (onGround) player.play("idle", true);
  }

  // Jump
  if (jump && onGround) {
    player.setVelocityY(-400);
    player.play("jump", true);
  }

  // Air animations
  if (!onGround) {
    if (player.body!.velocity.y < 0) {
      player.play("jump", true);
    } else {
      player.play("fall", true);
    }
  }
}
