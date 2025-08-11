/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Tooltip } from "@webpack/common";

import styles from "./StickerCategory.module.css";

export default function StickerCategory() {
    return <Tooltip text="wow" position="right">
        {props =>
            <button {...props} className={styles.categoryItem}>item</button>
        }
    </Tooltip>;
}
