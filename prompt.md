MASTER PROMPT
Dual-Mode Game Developer Portfolio (Interactive + Simple)

Build a professional game developer portfolio website with two modes:

Cool Interactive Version — immersive experience using a 3D room and a playable platformer.

Simple Version — fast recruiter-friendly portfolio using RetroUI components.

Both versions must use one shared content source so the portfolio owner only edits one JSON file to update all content.

Tech Stack

Use the following stack:

Framework

Next.js 14 (App Router)

Language

TypeScript

Styling

TailwindCSS

Game Engine

Phaser 3

3D Rendering

Three.js via React Three Fiber

UI Library

RetroUI (https://www.retroui.dev/
)

Deployment

Vercel compatible

Core Requirement

All portfolio content must come from:

/data/portfolio.json

Both the cool version and the simple version must dynamically load content from this JSON.

No portfolio information should be hardcoded.

Updating the JSON must automatically update both versions.

Routes

The site must have the following routes:

/          → landing page
/cool      → interactive portfolio
/simple    → traditional portfolio
Landing Page

Minimal entry screen with two options.

Buttons:

🎮 Enter Interactive Portfolio
📄 View Simple Portfolio

Optional background animation or subtle pixel theme.

Folder Structure

Create the following architecture.

/app
   page.tsx
   /cool
      page.tsx
   /simple
      page.tsx

/components
   RetroLayout.tsx
   SkillCard.tsx
   ProjectCard.tsx
   DialogueBox.tsx
   GameCanvas.tsx

/game
   GameScene.ts
   Player.ts
   InteractionSystem.ts
   Zones.ts
   UIOverlay.ts

/three
   RoomScene.tsx
   CameraController.ts
   InteractionRaycaster.ts

/data
   portfolio.json

/public
   /assets
       /backgrounds
       /tiles
       /npc
       /player
       /objects
       gaming_room.glb
Shared JSON Data Model

Example structure:

{
  "name": "Saurabh",
  "title": "Game Developer",

  "about": {
    "bio": "Game developer specializing in Unity, Godot and pixel art.",
    "location": "Mumbai"
  },

  "skills": [
    {
      "name": "Unity",
      "level": "Advanced",
      "description": "2D and 3D gameplay systems"
    },
    {
      "name": "Godot",
      "level": "Advanced"
    }
  ],

  "projects": [
    {
      "name": "Dodger",
      "description": "Split screen racing game",
      "engine": "Unity",
      "demo": "",
      "github": ""
    }
  ],

  "gameJams": [
    {
      "name": "GMTK Game Jam",
      "project": "Squishy Sophie"
    }
  ],

  "achievements": [
    {
      "title": "Hosted Godot Workshop",
      "year": 2026
    }
  ],

  "contact": {
    "github": "",
    "linkedin": "",
    "email": ""
  }
}
SIMPLE VERSION

Route:

/simple

Use RetroUI components.

https://www.retroui.dev/

Layout:

Header
About
Skills
Projects
Game Jams
Achievements
Contact

Use RetroUI components such as:

RetroCard
RetroWindow
RetroButton
RetroPanel

All content must be loaded from:

portfolio.json

Design should resemble a retro operating system UI.

COOL VERSION

Route:

/cool

The cool version has three stages.

Stage 1 → Interactive 3D gaming room
Stage 2 → Monitor zoom transition
Stage 3 → Side-scrolling portfolio game
Stage 1 — Interactive 3D Room

Use the 3D model:

gaming_room.glb

Source model:

https://sketchfab.com/3d-models/gaming-room-47f1263d4e2843f08060c680901fb9cd

Render using:

React Three Fiber

GLTFLoader

Camera position:

Behind gaming chair
Facing desk and monitor

Lighting:

Ambient light
Purple neon glow
Monitor emissive light
Room Controls
Mouse → look around
WASD → walk
E → interact
SPACE → boot PC
ESC → menu
TAB → open simple portfolio

Movement must be slow and cinematic.

Room UI

Display instructions when loaded:

Press SPACE to start
Explore the room
Interactive Room Objects
Cassette Player

Interaction:

Press E → play music

Toggle lo-fi or chiptune music.

Posters / Wall Frames

Interaction:

Press E

Show popup:

Favorite Games
Celeste
Hollow Knight
Journey
Desk Objects

Keyboard or controller interaction shows:

Skills preview
Unity
Godot
Game Design
PC Monitor Interaction

The PC monitor is the main trigger.

Prompt when near:

Press SPACE to boot

When pressed display terminal style screen:

> Booting SaurabhOS...
> Loading portfolio...

CRT shader effect.

Game assets load in background.

Stage 2 — Zoom Transition

Sequence:

SPACE pressed
↓
camera moves toward monitor
↓
monitor fills screen
↓
CRT glitch effect
↓
fade to pixel world
↓
Phaser game starts

Transition time:

~2.5 seconds
Stage 3 — Platformer Portfolio

Built using Phaser 3.

The player explores a short level to discover portfolio content.

Controls:

← → move
SPACE jump
E interact
ESC menu
TAB simple version
Player Sprites

Use:

Player-Idle-24x24.png
Player-Run-24x24.png
Player-Jump-24x24.png
Player-Fall-24x24.png

Animations:

idle
run
jump
fall
Background Layers

Use parallax backgrounds:

parallax-background-sky.png
parallax-background-mountains.png
parallax-forest-trees-01.png
parallax-forest-trees-02.png
World Layout

Level progression:

Spawn Forest
↓
Skills Cave
↓
Projects Village
↓
Achievements Temple
↓
Contact Terminal

Each section displays content from the JSON.

Interactive Objects

Use assets:

Obj-Chest-Closed-24x24.png
Obj-Chest-Opening-24x24.png
Obj-Crystal-Idle-32x32.png
Obj-Crystal-Open-32x32.png
Obj-Statue.png
Obj-Lamp-On.png
Obj-Key.png
Obj-Moving-Platform-Idle-48x28.png

Mappings:

Chest → project
Crystal → skill
Statue → achievement
Lamp → info
NPC System

NPC sprites:

NPC-Alchemist-Idle-24x24.png
NPC-Miner-Idle-24x24.png
NPC-Old-Shaman-Idle-24x24.png
NPC-Village-Lady-01-Talk-24x24.png

Press E near NPC to open dialogue window.

Dialogue content must come from JSON.

UI Overlay System

When interacting with objects show pixel UI panels.

Examples:

Crystal → skill info
Chest → project card
NPC → dialogue
Statue → achievement
ESC Menu
Resume Game
Return to Room
Simple Portfolio
Mute Music
Final Ending

At the Contact Terminal show popup:

Achievement Unlocked
You explored my portfolio

Buttons:

Download Resume
Contact Me
View GitHub

These must link to the JSON file values.

Optional Achievement Stats

Display exploration stats:

Time to explore portfolio: 52s
Secrets discovered: 2/3
Projects viewed: 5
Performance Requirements

Game must:

Load < 3 seconds
Maintain 60 FPS
Lazy load assets
Compress sprite sheets
Support mobile fallback

Game assets should load while the user explores the room.

Final Result

The final website must provide:

/cool → immersive playable portfolio
/simple → recruiter friendly portfolio

Both versions must automatically update when editing:

/data/portfolio.json
One last thing (seriously useful)

Add a floating toggle button on all pages:

🎮 Interactive Mode
📄 Simple Mode

This ensures recruiters can instantly switch views.


retro ui installation:
CLI Setup (Recommended)
1. Run the CLI setup tool
npx pixel-retroui

Copy
2. The CLI will automatically install the package and configure files based on your preferences.

CLI output preview:
      ▄▀▄─────▄▀▄
     ▄█░░▀▀▀▀▀░░█▄
─▄▄──█░░░░░░░░░░░█──▄▄
█▄▄█─█░░▀░░┬░░▀░░█─█▄▄█
Setting up pixel-retroui...
Installing pixel-retroui...
Would you like to use the default Minecraft font?
Which framework are you using?
.
.
.
🎉 Setup complete! Enjoy using pixel-retroui!
3. For Next.js, in your layout.tsx file:

import '@/lib/pixel-retroui-setup.js';

Copy
Setup Complete!

You're now ready to use RetroUI components in your project.