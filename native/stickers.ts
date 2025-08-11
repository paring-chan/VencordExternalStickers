/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { readdir, readFile, stat } from "fs/promises";
import path from "path";

export const getStickerPacks = async (
  _,
  rootDir: string
): Promise<StickerPack[]> => {
  const contents = await readdir(rootDir);

  const result: StickerPack[] = [];

  for (const item of contents) {
    try {
      const fileStat = await stat(path.join(rootDir, item));
      if (!fileStat.isDirectory()) continue;
      const packJson = JSON.parse(
        await readFile(path.join(rootDir, item, "pack.json"), "utf-8")
      );

      result.push({
        dir: item,
        meta: packJson,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return result;
};
