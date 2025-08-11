/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { React } from "@webpack/common";

import StickerChatButton from "./components/picker/StickerChatButton";
import ExternalStickerPicker from "./components/picker/StickerPicker";
import { LANG } from "./lang";
import settings from "./settings";
import { getStickerLoadPath, Native } from "./utils";

const externalStickerTabId = "external-sticker";

export default definePlugin({
    name: "ExternalStickers",
    description: "Use non-discord stickers!",
    authors: [
        {
            id: 628595345798201355n,
            name: "paring",
        },
    ],
    settings,
    patches: [
        {
            find: "k.jXE.EXPRESSION_PICKER",
            replacement: [
                {
                    match: /children:(\[eE\?.{0,900}}\)\])/,
                    replace: "children:$self.wrapEmotionPickerTabs($1,ec,X)",
                },

                {
                    match:
                        /inExpressionPicker:!0,shouldValidateSelectedSound:!0}\)}\):null/,
                    replace: "$&,$self.emojiPickerTabContent(ec)",
                },
            ],
        },
        {
            find: '"defaultProps",{size:"md"',
            replacement: {
                match: /size:"md",isLoading:!1,disabled:!1}\)/,
                replace: "$&;$self.setSearchBarComponent(b)",
            },
        },
        {
            find: "h.CkL.FAVORITE_GIF",
            replacement: {
                match: /let R=i.useCallback\(/,
                replace: "$self.setPickerOpenFn(d.RO, o);$&",
            },
        },
    ],
    setPickerOpenFn(open: any, what: any) {
        this.openPicker = () => {
            open(externalStickerTabId, what);
        };
    },
    wrapEmotionPickerTabs(original: any[], selected: any, comp: any) {
        return [
            ...original,
            React.createElement(
                comp,
                {
                    id: "external-sticker-tab",
                    "aria-controls": "external-sticker-tab-content",
                    "aria-selected": selected === externalStickerTabId,
                    isActive: selected === externalStickerTabId,
                    viewType: externalStickerTabId,
                },
                LANG.PICKER_TITLE
            ),
        ];
    },
    emojiPickerTabContent(selected: any) {
        if (externalStickerTabId !== selected) return null;
        return React.createElement(ExternalStickerPicker, {
            SearchBar: this.SearchBar,
        });
    },
    setSearchBarComponent(comp: any) {
        this.SearchBar = comp;
    },

    renderChatBarButton() {
        return React.createElement(StickerChatButton, {
            open: () => this.openPicker(),
        });
    },

    start() {
        getStickerLoadPath()
            .then(x => Native.getStickerPacks(x))
            .then(console.log);
    },
});
