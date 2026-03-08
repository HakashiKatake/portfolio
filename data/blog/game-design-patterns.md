---
title: "Game Design Patterns I Keep Coming Back To"
date: "2024-12-01"
tags: ["game-design", "patterns"]
---

Game design is full of recurring patterns that work across genres and engines. Here are a few I find myself using again and again.

## The State Machine

Almost every game character needs a state machine — idle, running, jumping, attacking. It keeps logic organized and prevents impossible state combinations.

## Object Pooling

Spawning and destroying objects every frame tanks performance. Pre-allocating a pool of reusable objects (bullets, particles, enemies) is one of the first optimizations I reach for.

## Observer Pattern for Events

Decoupling systems through events keeps code modular. When the player scores, I fire an event — the UI, audio, and analytics systems all listen independently.

## Component-Based Design

Rather than deep inheritance trees, I attach behavior components to entities. A "Damageable" component works on a player, enemy, or destructible wall the same way.

These patterns aren't revolutionary, but they form a reliable toolkit that speeds up every jam and project.
