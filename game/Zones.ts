import Phaser from "phaser";
import { PortfolioData } from "@/components/types";

export interface Zone {
  id: string;
  type: "skill" | "project" | "achievement" | "npc" | "contact" | "info" | "secret";
  x: number;
  y: number;
  radius: number;
  data: Record<string, unknown>;
  sprite?: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
}

export function createZones(
  scene: Phaser.Scene,
  data: PortfolioData,
  platforms: Phaser.Physics.Arcade.StaticGroup
): Zone[] {
  const zones: Zone[] = [];
  const worldHeight = 540;

  // ========== Skills Cave (Crystals) ==========
  data.skills.forEach((skill, i) => {
    const x = 1050 + i * 120;
    const y = worldHeight - 70;

    const crystal = scene.add.sprite(x, y, "crystal-idle").setScale(1.5).setDepth(2);
    
    if (!scene.anims.exists("crystal-float")) {
      scene.anims.create({
        key: "crystal-float",
        frames: scene.anims.generateFrameNumbers("crystal-idle", { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1,
      });
    }
    crystal.play("crystal-float");

    // Glow effect
    scene.tweens.add({
      targets: crystal,
      alpha: { from: 0.8, to: 1 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    zones.push({
      id: `skill-${i}`,
      type: "skill",
      x,
      y,
      radius: 50,
      data: { ...skill },
      sprite: crystal,
    });
  });

  // ========== Projects Village (Chests) ==========
  // Spread projects across the village area with more spacing
  const projectStartX = 2050;
  const projectSpacing = 80;
  data.projects.forEach((project, i) => {
    const x = projectStartX + i * projectSpacing;
    const y = worldHeight - 50;

    const chest = scene.add.sprite(x, y, "chest-closed").setScale(1.5).setDepth(2);
    
    if (!scene.anims.exists("chest-idle")) {
      scene.anims.create({
        key: "chest-idle",
        frames: scene.anims.generateFrameNumbers("chest-closed", { start: 0, end: 0 }),
        frameRate: 1,
        repeat: 0,
      });
    }

    zones.push({
      id: `project-${i}`,
      type: "project",
      x,
      y,
      radius: 40,
      data: { ...project },
      sprite: chest,
    });
  });

  // ========== Achievements Temple (Statues) ==========
  data.achievements.forEach((achievement, i) => {
    const x = 3600 + i * 120;
    const y = worldHeight - 56;

    const statue = scene.add.image(x, y, "statue").setScale(1.5).setDepth(2);

    zones.push({
      id: `achievement-${i}`,
      type: "achievement",
      x,
      y,
      radius: 50,
      data: { ...achievement },
      sprite: statue,
    });
  });

  // ========== Contact Terminal ==========
  const terminalX = 5100;
  const terminalY = worldHeight - 60;

  // Create a visible terminal using a lamp or key object
  const terminal = scene.add.image(terminalX, terminalY, "lamp").setScale(2).setDepth(2);
  scene.tweens.add({
    targets: terminal,
    alpha: { from: 0.7, to: 1 },
    duration: 500,
    yoyo: true,
    repeat: -1,
  });

  // Add floating text
  scene.add.text(terminalX - 60, terminalY - 60, "📡 CONTACT", {
    fontFamily: "Minecraft, monospace",
    fontSize: "10px",
    color: "#60a5fa",
    stroke: "#000000",
    strokeThickness: 2,
  }).setDepth(5);

  zones.push({
    id: "contact-terminal",
    type: "contact",
    x: terminalX,
    y: terminalY,
    radius: 60,
    data: { ...data.contact },
    sprite: terminal,
  });

  // ========== Secret zones ==========
  // Hidden key
  const keyX = 1350;
  const keyY = worldHeight - 200;
  const secretKey = scene.add.image(keyX, keyY, "key").setScale(1.5).setDepth(2).setAlpha(0.7);
  scene.tweens.add({
    targets: secretKey,
    y: keyY - 10,
    duration: 1200,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut",
  });

  zones.push({
    id: "secret-1",
    type: "secret",
    x: keyX,
    y: keyY,
    radius: 40,
    data: { message: "🗝️ Secret discovered! You found a hidden key!" },
    sprite: secretKey,
  });

  // Hidden info lamp
  const infoX = 4200;
  const infoY = worldHeight - 60;
  const infoLamp = scene.add.image(infoX, infoY, "lamp").setScale(1.5).setDepth(2);

  zones.push({
    id: "info-1",
    type: "info",
    x: infoX,
    y: infoY,
    radius: 50,
    data: { message: "💡 Fun fact: This entire portfolio was built as a playable game!" },
    sprite: infoLamp,
  });

  return zones;
}
