/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ScrollerThin, useState } from "@webpack/common";
import { LANG } from "userplugins/VencordExternalStickers/lang";

import SettingsTab from "./content/settings";
import StickerPackTab from "./content/sticker-pack";
import { getTabContext } from "./context";
import styles from "./modal.module.css";
import SidebarItem from "./sidebar-item";

export default function SettingsModal() {
    const [currentTab, setCurrentTab] = useState<string | null>("settings");
    const TabContext = getTabContext();

    return <TabContext.Provider value={{
        get: () => currentTab,
        set: v => setCurrentTab(v)
    }}>
        <div className={styles.root}>
            <div className={styles.title}>{LANG.SETTINGS}</div>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <SidebarItem tab="1">
                        얼끼얏호우
                    </SidebarItem>

                    <div className={styles.spacer} />

                    <SidebarItem tab="settings">
                        {LANG.SETTINGS}
                    </SidebarItem>
                </div>
                <ScrollerThin paddingFix className={styles.layoutContent}>
                    {currentTab === "1" && <StickerPackTab />}
                    {currentTab === "settings" && <SettingsTab />}
                </ScrollerThin>
            </div>
        </div>
    </TabContext.Provider>;
}
