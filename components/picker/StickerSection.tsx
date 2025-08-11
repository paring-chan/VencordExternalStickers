/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ReactNode } from "react";

import styles from "./StickerSection.module.css";

export default function StickerSection({ children, icon, title }: {
    icon: ReactNode;
    title: ReactNode;
    children: ReactNode;
}) {
    return <div className={styles.root}>
        <div className={styles.title}>
            {icon}
            {title}
        </div>
        <div className={styles.content}>
            {children}
        </div>
    </div>;
}
