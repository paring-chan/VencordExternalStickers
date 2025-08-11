/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { React } from "@webpack/common";

import { getTabContext } from "./context";
import styles from "./sidebar-item.module.css";

export default function SidebarItem({ children, tab }: { children?: React.ReactNode; tab: string; }) {
    const { get, set } = React.useContext(getTabContext());


    return <button className={`${styles.root} ${get() === tab ? styles.selected : ""}`} onClick={() => {
        set(tab);
    }}>
        {children}
    </button>;
}
