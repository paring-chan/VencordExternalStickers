/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Margins } from "@utils/margins";
import { Button, Forms, TextInput } from "@webpack/common";

import { LANG } from "../../../lang";
import styles from "./sticker-pack.module.css";

export default function StickerPackTab() {
    return <div>
        <Forms.FormSection>
            <Forms.FormTitle>{LANG.PACK_NAME}</Forms.FormTitle>
            <TextInput className={Margins.bottom20} />
        </Forms.FormSection>
        <Forms.FormSection>
            <Forms.FormTitle>{LANG.PACK_ICON}</Forms.FormTitle>
            <div className={`${styles.iconPreview} ${Margins.bottom8}`}></div>
            <Button style={{ marginTop: 4 }} size={Button.Sizes.SMALL} className={Margins.bottom20}>{LANG.CHANGE}</Button>
        </Forms.FormSection>
        <Forms.FormDivider className={Margins.bottom20} />

        <Forms.FormSection>
            <Forms.FormSection className={Margins.bottom8}>{LANG.SETTINGS_STICKERS}</Forms.FormSection>
            <div className={styles.stickerList}>
                <StickerListItem />
                <StickerListItem />
                <StickerListItem />
                <StickerListItem />
                <StickerListItem />
            </div>

        </Forms.FormSection>
    </div>;
}

function StickerListItem() {
    return <div className={styles.stickerListItem}>
        <div className={styles.sticker}></div>
        <div className={styles.stickerDetails}>
            <TextInput />
            <div className={styles.stickerActions}>
                <Button size={Button.Sizes.SMALL} color={Button.Colors.BRAND}>{LANG.SAVE}</Button>
                <Button size={Button.Sizes.SMALL} color={Button.Colors.RED}>{LANG.REMOVE}</Button>
            </div>
        </div>
    </div>;
}
