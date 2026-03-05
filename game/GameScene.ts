import Phaser from "phaser";
import { createPlayer, setupPlayerAnimations, updatePlayer } from "./Player";
import { createZones, Zone } from "./Zones";
import { InteractionSystem } from "./InteractionSystem";
import { UIOverlay } from "./UIOverlay";
import { PortfolioData } from "@/components/types";

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private zones: Zone[] = [];
  private interactionSystem!: InteractionSystem;
  private uiOverlay!: UIOverlay;
  private portfolioData!: PortfolioData;
  private backgrounds: Phaser.GameObjects.TileSprite[] = [];
  private interactKey!: Phaser.Input.Keyboard.Key;
  private escKey!: Phaser.Input.Keyboard.Key;
  private tabKey!: Phaser.Input.Keyboard.Key;
  private wasd!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };
  private startTime: number = 0;
  private projectsViewed: number = 0;
  private secretsFound: number = 0;
  private npcs: Phaser.GameObjects.Sprite[] = [];

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    // Load player sprites
    this.load.spritesheet("player-idle", "/assets/player/Player-Idle-24x24.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("player-run", "/assets/player/Player-Run-24x24.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("player-jump", "/assets/player/Player-Jump-24x24.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("player-fall", "/assets/player/Player-Fall-24x24.png", {
      frameWidth: 24,
      frameHeight: 24,
    });

    // Load backgrounds
    this.load.image("bg-sky", "/assets/backgrounds/parallax-background-sky.png");
    this.load.image("bg-mountains", "/assets/backgrounds/parallax-background-mountains.png");
    this.load.image("bg-trees1", "/assets/backgrounds/parallax-forest-trees-01.png");
    this.load.image("bg-trees2", "/assets/backgrounds/parallax-forest-trees-02.png");

    // Load tiles
    this.load.image("tile-top", "/assets/tiles/Tile-01.png");
    this.load.image("tile-mid", "/assets/tiles/Tile-13.png");
    this.load.image("tile-cave", "/assets/tiles/Cave-Under-Tile.png");

    // Load objects
    this.load.spritesheet("chest-closed", "/assets/objects/Obj-Chest-Closed-24x24.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("chest-open", "/assets/objects/Obj-Chest-Opening-24x24.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("crystal-idle", "/assets/objects/Obj-Crystal-Idle-32x32.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("crystal-open", "/assets/objects/Obj-Crystal-Open-32x32.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("statue", "/assets/objects/Obj-Statue.png");
    this.load.image("lamp", "/assets/objects/Obj-Lamp-On.png");
    this.load.image("key", "/assets/objects/Obj-Key.png");
    this.load.image("platform", "/assets/objects/Obj-Moving-Platform-Idle-48x28.png");
    this.load.image("gate", "/assets/objects/Obj-Village-Gate-Top.png");
    this.load.image("fence", "/assets/objects/Obj-Fence.png");
    this.load.image("barrel", "/assets/objects/Obj-Barrel.png");
    this.load.image("boxes", "/assets/objects/Obj-Boxes.png");
    this.load.image("wood-platform", "/assets/objects/Obj-Wood-Platform-01.png");
    this.load.image("flag", "/assets/objects/Obj-Flag-Hanging-01.png");

    // Load NPCs
    this.load.spritesheet("npc-alchemist", "/assets/npc/NPC-Alchemist-Idle-24x24.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("npc-miner", "/assets/npc/NPC-Miner-Idle-24x24.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("npc-shaman", "/assets/npc/NPC-Old-Shaman-Idle-24x24.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("npc-village-lady", "/assets/npc/NPC-Village-Lady-01-Talk-24x24.png", {
      frameWidth: 24,
      frameHeight: 24,
    });

    // Load UI
    this.load.image("quest-mark", "/assets/ui/Quest-Mark-Idle-16x16.png");
  }

  create() {
    this.portfolioData = this.registry.get("portfolioData");
    this.startTime = Date.now();

    const worldWidth = 5760; // 6 screens wide
    const worldHeight = 540;

    // Set world bounds
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    // Parallax backgrounds
    this.backgrounds.push(
      this.add.tileSprite(0, 0, worldWidth, worldHeight, "bg-sky").setOrigin(0, 0).setScrollFactor(0).setDepth(-4)
    );
    this.backgrounds.push(
      this.add.tileSprite(0, 100, worldWidth, worldHeight, "bg-mountains").setOrigin(0, 0).setScrollFactor(0).setDepth(-3)
    );
    this.backgrounds.push(
      this.add.tileSprite(0, 150, worldWidth, worldHeight, "bg-trees1").setOrigin(0, 0).setScrollFactor(0).setDepth(-2)
    );
    this.backgrounds.push(
      this.add.tileSprite(0, 200, worldWidth, worldHeight, "bg-trees2").setOrigin(0, 0).setScrollFactor(0).setDepth(-1)
    );

    // Ground platforms
    this.platforms = this.physics.add.staticGroup();
    
    // Build the main ground
    for (let x = 0; x < worldWidth; x += 24) {
      const tileTop = this.platforms.create(x, worldHeight - 24, "tile-top") as Phaser.Physics.Arcade.Sprite;
      tileTop.setScale(1).refreshBody();
      tileTop.setDepth(1);
      
      const tileMid = this.platforms.create(x, worldHeight - 0, "tile-mid") as Phaser.Physics.Arcade.Sprite;
      tileMid.setScale(1).refreshBody();
      tileMid.setDepth(1);
    }

    // Elevated platforms throughout the level
    this.createElevatedPlatforms();

    // Create player
    this.player = createPlayer(this, 100, worldHeight - 80);
    setupPlayerAnimations(this);
    
    // Camera follows player
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // Create interactive zones with content from JSON
    this.zones = createZones(this, this.portfolioData, this.platforms);

    // Create NPCs
    this.createNPCs();

    // Setup interaction system
    this.interactionSystem = new InteractionSystem(this, this.player, this.zones, this.portfolioData);
    this.uiOverlay = new UIOverlay(this);

    // Input
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.tabKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
    this.wasd = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    // Colliders
    this.physics.add.collider(this.player, this.platforms);

    // Section labels
    this.createSectionLabels(worldHeight);

    // Decorative elements
    this.createDecorations(worldHeight);
  }

  private createElevatedPlatforms() {
    const worldHeight = 540;
    const platformPositions = [
      // Skills Cave area - elevated platforms
      { x: 1100, y: worldHeight - 120, width: 5 },
      { x: 1250, y: worldHeight - 180, width: 4 },
      { x: 1400, y: worldHeight - 140, width: 5 },
      
      // Projects Village area - platforms
      { x: 2200, y: worldHeight - 100, width: 4 },
      { x: 2500, y: worldHeight - 160, width: 5 },
      { x: 2800, y: worldHeight - 120, width: 4 },
      
      // Achievements Temple area
      { x: 3600, y: worldHeight - 130, width: 6 },
      { x: 3900, y: worldHeight - 180, width: 5 },
      
      // Contact Terminal area
      { x: 4800, y: worldHeight - 100, width: 8 },
    ];

    for (const plat of platformPositions) {
      for (let i = 0; i < plat.width; i++) {
        const tile = this.platforms.create(plat.x + i * 24, plat.y, "tile-top") as Phaser.Physics.Arcade.Sprite;
        tile.setScale(1).refreshBody();
        tile.setDepth(1);
      }
    }
  }

  private createNPCs() {
    const worldHeight = 540;
    const npcConfigs = [
      { key: "npc-village-lady", x: 300, y: worldHeight - 60, name: "Village Lady", dialogueKey: "villageLady" as const },
      { key: "npc-alchemist", x: 1200, y: worldHeight - 60, name: "Skill Alchemist", dialogueKey: "alchemist" as const },
      { key: "npc-miner", x: 2400, y: worldHeight - 60, name: "Project Miner", dialogueKey: "miner" as const },
      { key: "npc-shaman", x: 3800, y: worldHeight - 60, name: "Achievement Shaman", dialogueKey: "shaman" as const },
    ];

    for (const config of npcConfigs) {
      const npc = this.add.sprite(config.x, config.y, config.key).setScale(2).setDepth(2);
      
      // Create NPC idle animation
      if (!this.anims.exists(`${config.key}-idle`)) {
        this.anims.create({
          key: `${config.key}-idle`,
          frames: this.anims.generateFrameNumbers(config.key, { start: 0, end: 3 }),
          frameRate: 6,
          repeat: -1,
        });
      }
      npc.play(`${config.key}-idle`);

      // Quest mark above NPC
      const questMark = this.add.image(config.x, config.y - 40, "quest-mark").setScale(1.5).setDepth(3);
      this.tweens.add({
        targets: questMark,
        y: config.y - 48,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });

      // Add NPC as an interactive zone
      this.zones.push({
        id: `npc-${config.dialogueKey}`,
        type: "npc",
        x: config.x,
        y: config.y,
        radius: 50,
        data: {
          name: config.name,
          dialogues: this.portfolioData.npcDialogues[config.dialogueKey],
        },
        sprite: npc,
      });

      this.npcs.push(npc);
    }
  }

  private createSectionLabels(worldHeight: number) {
    const sections = [
      { x: 150, text: "🌲 Spawn Forest" },
      { x: 1200, text: "💎 Skills Cave" },
      { x: 2400, text: "🏘️ Projects Village" },
      { x: 3700, text: "🏛️ Achievements Temple" },
      { x: 5000, text: "📡 Contact Terminal" },
    ];

    for (const section of sections) {
      this.add.text(section.x, worldHeight - 500, section.text, {
        fontFamily: "Minecraft, monospace",
        fontSize: "14px",
        color: "#a78bfa",
        stroke: "#000000",
        strokeThickness: 3,
      }).setDepth(5).setAlpha(0.8);
    }
  }

  private createDecorations(worldHeight: number) {
    // Spawn Forest decorations
    for (let i = 0; i < 5; i++) {
      this.add.image(200 + i * 150, worldHeight - 60, "lamp").setScale(1.5).setDepth(1);
    }

    // Fences in village area (covers full 2050-3490 project zone)
    for (let i = 0; i < 18; i++) {
      this.add.image(2050 + i * 80, worldHeight - 46, "fence").setScale(1.5).setDepth(0);
    }

    // Barrels and boxes spread across village
    this.add.image(2200, worldHeight - 54, "barrel").setScale(1.5).setDepth(1);
    this.add.image(2600, worldHeight - 54, "boxes").setScale(1.5).setDepth(1);
    this.add.image(3000, worldHeight - 54, "barrel").setScale(1.5).setDepth(1);
    this.add.image(3400, worldHeight - 54, "boxes").setScale(1.5).setDepth(1);

    // Temple gate
    this.add.image(3500, worldHeight - 100, "gate").setScale(2).setDepth(1);

    // Flags  
    this.add.image(3700, worldHeight - 200, "flag").setScale(2).setDepth(1);
    this.add.image(4000, worldHeight - 200, "flag").setScale(2).setDepth(1);
  }

  update() {
    // Update player movement
    updatePlayer(this.player, this.cursors, this.wasd);

    // Parallax scrolling
    const camX = this.cameras.main.scrollX;
    if (this.backgrounds[0]) this.backgrounds[0].tilePositionX = camX * 0.1;
    if (this.backgrounds[1]) this.backgrounds[1].tilePositionX = camX * 0.3;
    if (this.backgrounds[2]) this.backgrounds[2].tilePositionX = camX * 0.5;
    if (this.backgrounds[3]) this.backgrounds[3].tilePositionX = camX * 0.7;

    // Check interactions
    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      const result = this.interactionSystem.checkInteraction();
      if (result) {
        if (result.type === "project") this.projectsViewed++;
        if (result.type === "secret") this.secretsFound++;
      }
    }

    // ESC menu
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.uiOverlay.toggleMenu({
        onResume: () => this.scene.resume(),
        onReturnToRoom: () => {
          const onExit = this.registry.get("onExit");
          if (onExit) onExit();
        },
        onSimplePortfolio: () => {
          const onOpenSimple = this.registry.get("onOpenSimple");
          if (onOpenSimple) onOpenSimple();
        },
      });
    }

    // TAB -> simple version
    if (Phaser.Input.Keyboard.JustDown(this.tabKey)) {
      const onOpenSimple = this.registry.get("onOpenSimple");
      if (onOpenSimple) onOpenSimple();
    }

    // Update interaction prompts
    this.interactionSystem.updatePrompts();
  }

  getStats() {
    return {
      time: Math.floor((Date.now() - this.startTime) / 1000),
      projectsViewed: this.projectsViewed,
      secretsFound: this.secretsFound,
    };
  }
}
