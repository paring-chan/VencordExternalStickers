/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Button, Forms, TextInput, useEffect, useState } from "@webpack/common";

import settings from "../../../settings";
import { Native } from "../../../utils";
import { LANG } from "./../../../lang";

export default function SettingsTab() {
    const [loading, setLoading] = useState(true);

    const [defaultStickerDir, setDefaultStickerDir] = useState<string | null>(null);
    const [stickerDir, setStickerDir] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const defaultPath = await Native.getDefaultStickersRoot();
            setDefaultStickerDir(defaultPath);
            setStickerDir(settings.store.stickersPath);

            setLoading(false);
        })();
    }, []);

    if (loading) {
        return null;
    }

    return <div>
        <Forms.FormSection>
            <Forms.FormTitle>{LANG.SETTINGS_STICKER_DIR}</Forms.FormTitle>
            {/* <Forms.FormText>{stickerDir}</Forms.FormText> */}
            <TextInput value={stickerDir!} onChange={value => {
                setStickerDir(value);
            }} placeholder={defaultStickerDir!} />
            <Button style={{ marginTop: 4 }} size={Button.Sizes.SMALL} onClick={() => {
                settings.store.stickersPath = stickerDir;
            }}>{LANG.CHANGE}</Button>
        </Forms.FormSection>
    </div>;
}
