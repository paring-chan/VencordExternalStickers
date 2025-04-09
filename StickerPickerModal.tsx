/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { getCurrentChannel } from "@utils/discord";
import { closeModal } from "@utils/modal";
import { DraftType, UploadHandler, useEffect } from "@webpack/common";

import { classNames } from "./styles";
import { StickerPack } from "./types";

const urls: Record<string, string> = {};

export const StickerPickerModal = ({ packs: packs }: { packs: StickerPack[]; }) => {
    useEffect(() => {
        for (const pack of packs) {
            for (const sticker of pack.stickers) {
                if (urls[sticker.key]) continue;
                const blob = new Blob([sticker.data]);
                urls[sticker.key] = URL.createObjectURL(blob);
            }
        }
    }, [packs]);

    return <div style={{ height: 600, display: "flex", flexDirection: "column", maxWidth: 600 }}>
        <div
            className="extsSearchInput"
        >
            <input className={classNames.searchInput} placeholder="Search sticker" onChange={e => { }} />
        </div>
        <div className="extsStickerPackList">
            {packs.map((pack, i) =>
                <div key={i}>
                    <div className="extsStickerPackTitle">{pack.name}</div>

                    <div className="extsStickerGrid">
                        {pack.stickers.map((sticker, j) =>
                            <button className="extsStickerButton" key={j} onClick={() => {
                                const channel = getCurrentChannel();
                                if (!channel) return;




                                // console.log(UploadManager);
                                const file = new File([sticker.data], `${sticker.name}.${sticker.ext}`, { type: `image/${sticker.ext}` });
                                UploadHandler.promptToUpload([file], channel, DraftType.ChannelMessage);
                                closeModal("external-sticker-picker");
                            }}>
                                <img src={urls[sticker.key]} alt={pack.name} className="extsStickerImage" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>

    </div>;
};
