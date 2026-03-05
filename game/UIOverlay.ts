import Phaser from "phaser";

interface MenuCallbacks {
  onResume: () => void;
  onReturnToRoom: () => void;
  onSimplePortfolio: () => void;
}

export class UIOverlay {
  private scene: Phaser.Scene;
  private menuContainer: Phaser.GameObjects.Container | null = null;
  private isMenuOpen: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  toggleMenu(callbacks: MenuCallbacks) {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu(callbacks);
    }
  }

  private openMenu(callbacks: MenuCallbacks) {
    this.isMenuOpen = true;
    this.scene.scene.pause();

    const cam = this.scene.cameras.main;
    const centerX = cam.scrollX + cam.width / 2;
    const centerY = cam.scrollY + cam.height / 2;

    this.menuContainer = this.scene.add.container(centerX, centerY).setDepth(200);

    // Overlay background
    const overlay = this.scene.add.rectangle(0, 0, cam.width, cam.height, 0x000000, 0.7);
    this.menuContainer.add(overlay);

    // Menu panel
    const panelWidth = 220;
    const panelHeight = 200;
    const panel = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x1a1a2e, 0.95)
      .setStrokeStyle(3, 0x7c3aed);
    this.menuContainer.add(panel);

    // Title
    const title = this.scene.add.text(0, -80, "⏸ PAUSED", {
      fontFamily: "Minecraft, monospace",
      fontSize: "14px",
      color: "#a855f7",
    }).setOrigin(0.5);
    this.menuContainer.add(title);

    // Menu items
    const menuItems = [
      { text: "▶ Resume Game", callback: () => { this.closeMenu(); callbacks.onResume(); } },
      { text: "🏠 Return to Room", callback: callbacks.onReturnToRoom },
      { text: "📄 Simple Portfolio", callback: callbacks.onSimplePortfolio },
      { text: "🔇 Mute Music", callback: () => {} },
    ];

    menuItems.forEach((item, i) => {
      const btn = this.scene.add.text(0, -30 + i * 35, item.text, {
        fontFamily: "Minecraft, monospace",
        fontSize: "10px",
        color: "#c4b5fd",
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      btn.on("pointerover", () => {
        btn.setColor("#ffffff");
        btn.setScale(1.1);
      });
      btn.on("pointerout", () => {
        btn.setColor("#c4b5fd");
        btn.setScale(1);
      });
      btn.on("pointerdown", () => {
        item.callback();
      });

      this.menuContainer!.add(btn);
    });
  }

  private closeMenu() {
    this.isMenuOpen = false;
    if (this.menuContainer) {
      this.menuContainer.destroy();
      this.menuContainer = null;
    }
    this.scene.scene.resume();
  }
}
