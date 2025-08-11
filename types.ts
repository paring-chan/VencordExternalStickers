/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

interface StickerMeta {
  path: string;
  name: string;
  displayName: string;
}

interface StickerPackMeta {
  title: string;
  icon: string;
  stickers: StickerMeta;
}

interface StickerPack {
  meta: StickerPackMeta;
  dir: string;
}
