/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { DATA_DIR } from "@main/utils/constants";
import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { Sticker, StickerPack, StickerRef } from "./types";

let dcconCookies: Record<string, string> | null = null;

const CACHE_DIR = path.join(DATA_DIR, "EXST_Cache");

export async function loadStickers(_, refs: StickerRef[]): Promise<StickerPack[]> {
    const stickers: StickerPack[] = [];
    for (const ref of refs) {
        try {
            stickers.push(await loadStickerPack(ref));
        } catch (e) {
            console.error(e);
        }
    }
    return stickers;
}

const loadStickerPack = async (ref: StickerRef) => {
    const url = "https://dccon.dcinside.com/index/package_detail";

    if (dcconCookies === null) {
        const res = await fetch(url);
        dcconCookies = (Object.fromEntries(res.headers.getSetCookie().map(x => x.split("; ")[0].split("="))));
    }

    if (!dcconCookies) throw new Error("wtf");

    const res = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
            ci_t: dcconCookies.ci_c,
            package_idx: ref.packageIdx
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Cookie: Object.entries(dcconCookies).map(x => x.join("=")).join("; "),
            "X-Requested-With": "XMLHttpRequest"
        }
    });

    console.log(res);

    const conInfo = (await res.json());

    const cacheDir = path.join(CACHE_DIR, "dccon");

    await mkdir(cacheDir, { recursive: true });

    const getImage = async (id: string, name: string): Promise<Uint8Array> => {

        const p = path.join(cacheDir, name);

        if (existsSync(p)) {
            const buf = await readFile(p);
            return buf;
        }

        const res = await fetch(`https://dcimg5.dcinside.com/dccon.php?no=${id}`, {
            headers: {
                "Referer": "https://dccon.dcinside.com/"
            }
        });


        const buffer = await res.arrayBuffer();

        await writeFile(p, Buffer.from(buffer));

        return new Uint8Array(buffer);
    };

    const icon = await getImage(conInfo.info.main_img_path, conInfo.info.main_img_path + ".png");

    const stickers = await Promise.all(conInfo.detail.map(async x => {
        return {
            name: x.title,
            data: await getImage(x.path, `${x.path}.${x.ext}`),
            key: `dccon/${x.path}.${x.ext}`,
            ext: x.ext
        } as Sticker;
    }));

    return {
        name: conInfo.info.title,
        icon,
        stickers,
    } as StickerPack;
};
