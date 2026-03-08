export const RETRO_THEME = {
  pageBg: "#0a0a1a",
  surface: "#14113a",
  panel: "#1e1b4b",
  panelAlt: "#221e57",
  border: "#a855f7",
  text: "#ede9fe",
  muted: "#c4b5fd",
  shadow: "#4c1d95",
  buttonPrimaryBg: "#7c3aed",
  buttonSecondaryBg: "#1e1b4b",
  buttonText: "#f5f3ff",
  buttonShadow: "#2e1065",
  bubbleBg: "#312e81",
} as const;

export const RETRO_CARD_PROPS = {
  bg: RETRO_THEME.panel,
  textColor: RETRO_THEME.text,
  borderColor: RETRO_THEME.border,
  shadowColor: RETRO_THEME.shadow,
} as const;
