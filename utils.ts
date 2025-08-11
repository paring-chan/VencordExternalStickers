/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { PluginNative } from "@utils/types";

import settings from "./settings";

export const Native = VencordNative.pluginHelpers
  .ExternalStickers as PluginNative<typeof import("./native")>;

export const getStickerLoadPath = async () => {
  if (settings.store.stickersPath) return settings.store.stickersPath;
  return Native.getDefaultStickersRoot();
};
