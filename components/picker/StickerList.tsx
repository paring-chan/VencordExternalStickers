/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ScrollerThin } from "@webpack/common";

import StarIcon from "../icons/StarIcon";
import StickerButton from "./StickerButton";
import styles from "./StickerList.module.css";
import StickerSection from "./StickerSection";

export default function StickerList() {
    return <ScrollerThin className={styles.root}>
        <StickerSection icon={<StarIcon size={16} />} title="야호">
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
        </StickerSection>
        <StickerSection icon={<StarIcon size={16} />} title="야호">
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
        </StickerSection>
        <StickerSection icon={<StarIcon size={16} />} title="야호">
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
        </StickerSection>
        <StickerSection icon={<StarIcon size={16} />} title="야호">
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
            <StickerButton />
        </StickerSection>
    </ScrollerThin>;
}
