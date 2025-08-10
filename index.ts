/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { React } from "@webpack/common";

import ExternalStickerPicker from "./components/StickerPicker";
import { LANG } from "./lang";


const externalStickerTabId = "external-sticker";

export default definePlugin({
    name: "ExternalStickers",
    description: "Use non-discord stickers!",
    authors: [
        {
            id: 628595345798201355n,
            name: "paring",
        }
    ],
    patches: [
        {
            find: "k.jXE.EXPRESSION_PICKER",
            replacement: {
                match: /children:(\[eE\?.{0,900}}\)\])/,
                replace: "children:$self.wrapEmotionPickerTabs($1,ec,X)"
            }
        },
        {
            find: "k.jXE.EXPRESSION_PICKER",
            replacement: {
                match: /inExpressionPicker:!0,shouldValidateSelectedSound:!0}\)}\):null/,
                replace: "$&,$self.emojiPickerTabContent(ec)"
            }
        }
    ],
    wrapEmotionPickerTabs(original: any[], selected: any, comp: any) {
        return [
            ...original,
            React.createElement(comp, {
                id: "external-sticker-tab",
                "aria-controls": "external-sticker-tab-content",
                "aria-selected": selected === externalStickerTabId,
                isActive: selected === externalStickerTabId,
                viewType: externalStickerTabId,
            }, LANG.PICKER_TITLE)
        ];
    },
    emojiPickerTabContent(selected: any) {
        if (externalStickerTabId !== selected) return null;
        return React.createElement(ExternalStickerPicker);
    }
});
