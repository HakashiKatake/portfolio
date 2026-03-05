import Phaser from "phaser";
import { Zone } from "./Zones";
import { PortfolioData } from "@/components/types";

interface InteractionResult {
  type: string;
  data: Record<string, unknown>;
}

export class InteractionSystem {
  private scene: Phaser.Scene;
  private player: Phaser.Physics.Arcade.Sprite;
  private zones: Zone[];
  private portfolioData: PortfolioData;
  private promptText: Phaser.GameObjects.Text | null = null;
  private activePanel: Phaser.GameObjects.Container | null = null;
  private dialogueIndex: number = 0;
  private activeNpcZone: Zone | null = null;

  constructor(
    scene: Phaser.Scene,
    player: Phaser.Physics.Arcade.Sprite,
    zones: Zone[],
    data: PortfolioData
  ) {
    this.scene = scene;
    this.player = player;
    this.zones = zones;
    this.portfolioData = data;
  }

  getNearestZone(): Zone | null {
    let nearest: Zone | null = null;
    let minDist = Infinity;

    for (const zone of this.zones) {
      const dist = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        zone.x,
        zone.y
      );
      if (dist < zone.radius && dist < minDist) {
        minDist = dist;
        nearest = zone;
      }
    }
    return nearest;
  }

  updatePrompts() {
    const nearest = this.getNearestZone();

    if (this.promptText) {
      this.promptText.destroy();
      this.promptText = null;
    }

    if (nearest && !this.activePanel) {
      this.promptText = this.scene.add.text(
        this.player.x - 55,
        this.player.y - 55,
        "Press E to interact",
        {
          fontFamily: "Minecraft, monospace",
          fontSize: "12px",
          color: "#fbbf24",
          stroke: "#000000",
          strokeThickness: 3,
        }
      ).setDepth(20);
    }
  }

  checkInteraction(): InteractionResult | null {
    // If a panel is already open, close it
    if (this.activePanel) {
      this.closePanel();
      return null;
    }

    // If in NPC dialogue, advance
    if (this.activeNpcZone) {
      return this.advanceDialogue();
    }

    const zone = this.getNearestZone();
    if (!zone) return null;

    switch (zone.type) {
      case "skill":
        this.showSkillPanel(zone);
        return { type: "skill", data: zone.data };
      case "project":
        this.showProjectPanel(zone);
        return { type: "project", data: zone.data };
      case "achievement":
        this.showAchievementPanel(zone);
        return { type: "achievement", data: zone.data };
      case "npc":
        this.startDialogue(zone);
        return { type: "npc", data: zone.data };
      case "contact":
        this.showContactPanel(zone);
        return { type: "contact", data: zone.data };
      case "secret":
        this.showInfoPanel(zone.data.message as string, "#fbbf24");
        return { type: "secret", data: zone.data };
      case "info":
        this.showInfoPanel(zone.data.message as string, "#60a5fa");
        return { type: "info", data: zone.data };
      default:
        return null;
    }
  }

  private showSkillPanel(zone: Zone) {
    // Animate crystal opening
    if (zone.sprite && this.scene.anims.exists("crystal-open-anim") === false) {
      this.scene.anims.create({
        key: "crystal-open-anim",
        frames: this.scene.anims.generateFrameNumbers("crystal-open", { start: 0, end: 3 }),
        frameRate: 6,
        repeat: 0,
      });
    }
    if (zone.sprite && zone.sprite instanceof Phaser.GameObjects.Sprite) {
      zone.sprite.play("crystal-open-anim");
    }

    const skill = zone.data as Record<string, string>;
    this.createPanel([
      `⚡ ${skill.name}`,
      `Level: ${skill.level}`,
      skill.description || "",
    ], "#a855f7");
  }

  private showProjectPanel(zone: Zone) {
    // Animate chest opening
    if (!this.scene.anims.exists("chest-open-anim")) {
      this.scene.anims.create({
        key: "chest-open-anim",
        frames: this.scene.anims.generateFrameNumbers("chest-open", { start: 0, end: 3 }),
        frameRate: 6,
        repeat: 0,
      });
    }
    if (zone.sprite && zone.sprite instanceof Phaser.GameObjects.Sprite) {
      zone.sprite.play("chest-open-anim");
    }

    const project = zone.data as Record<string, string>;
    const categoryLabels: Record<string, string> = {
      mobile: "📱 Mobile",
      pc: "🖥️ PC",
      gamejam: "🏆 Game Jam",
      personal: "🌟 Personal",
      tools: "🔧 Tools",
    };
    const cat = categoryLabels[project.category] || project.category;
    const lines = [
      `📦 ${project.name}`,
      `Engine: ${project.engine} | ${cat}`,
      project.description || "",
    ];
    if (project.demo) lines.push(`🎮 Demo: ${project.demo}`);
    this.createPanel(lines, "#6d28d9");
  }

  private showAchievementPanel(zone: Zone) {
    const achievement = zone.data as Record<string, unknown>;
    this.createPanel([
      `🏆 ${achievement.title}`,
      `Year: ${achievement.year}`,
    ], "#eab308");
  }

  private showContactPanel(zone: Zone) {
    const contact = zone.data as Record<string, string>;
    const lines = [
      "📡 CONTACT TERMINAL",
      "──────────────",
      "",
      "🏆 Achievement Unlocked!",
      "You explored my portfolio!",
      "",
    ];
    if (contact.github) lines.push(`🐙 GitHub: ${contact.github}`);
    if (contact.linkedin) lines.push(`💼 LinkedIn: ${contact.linkedin}`);
    if (contact.email) lines.push(`✉️ Email: ${contact.email}`);

    this.createPanel(lines, "#60a5fa");
  }

  private showInfoPanel(message: string, color: string) {
    this.createPanel([message], color);
  }

  private startDialogue(zone: Zone) {
    this.activeNpcZone = zone;
    this.dialogueIndex = 0;
    const dialogues = zone.data.dialogues as string[];
    const name = zone.data.name as string;
    this.createPanel([`${name}:`, "", dialogues[0]], "#c084fc");
  }

  private advanceDialogue(): InteractionResult | null {
    if (!this.activeNpcZone) return null;
    const dialogues = this.activeNpcZone.data.dialogues as string[];
    this.dialogueIndex++;

    if (this.dialogueIndex >= dialogues.length) {
      this.closePanel();
      this.activeNpcZone = null;
      this.dialogueIndex = 0;
      return null;
    }

    this.closePanel();
    const name = this.activeNpcZone.data.name as string;
    this.createPanel(
      [`${name}:`, "", dialogues[this.dialogueIndex]],
      "#c084fc"
    );
    return { type: "npc", data: this.activeNpcZone.data };
  }

  private createPanel(lines: string[], borderColor: string) {
    const cam = this.scene.cameras.main;
    const panelWidth = 500;
    const lineHeight = 28;
    const panelHeight = 30 + lines.length * lineHeight;
    const panelX = cam.scrollX + cam.width / 2 - panelWidth / 2;
    const panelY = cam.scrollY + cam.height - panelHeight - 20;

    const container = this.scene.add.container(panelX, panelY).setDepth(100);

    // Background
    const bg = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x1a1a2e, 0.95)
      .setOrigin(0, 0)
      .setStrokeStyle(2, Phaser.Display.Color.HexStringToColor(borderColor).color);
    container.add(bg);

    // Text lines
    lines.forEach((line, i) => {
      const text = this.scene.add.text(16, 14 + i * lineHeight, line, {
        fontFamily: "Minecraft, monospace",
        fontSize: "14px",
        color: "#e0e0ff",
        wordWrap: { width: panelWidth - 32 },
      });
      container.add(text);
    });

    // Close hint
    const closeHint = this.scene.add.text(panelWidth - 100, panelHeight - 22, "Press E", {
      fontFamily: "Minecraft, monospace",
      fontSize: "11px",
      color: "#888",
    });
    container.add(closeHint);

    // Fade in
    container.setAlpha(0);
    this.scene.tweens.add({
      targets: container,
      alpha: 1,
      duration: 200,
    });

    this.activePanel = container;
  }

  private closePanel() {
    if (this.activePanel) {
      this.scene.tweens.add({
        targets: this.activePanel,
        alpha: 0,
        duration: 150,
        onComplete: () => {
          this.activePanel?.destroy();
          this.activePanel = null;
        },
      });
    }
  }
}
