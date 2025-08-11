/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { openModal } from "@utils/modal";
import { Button, Tooltip } from "@webpack/common";

import { LANG } from "../../lang";
import SettingsOutlinedIcon from "../icons/SettingsOutlinedIcon";
import StickerSettings from "../settings";
import StickerCategory from "./StickerCategory";
import StickerList from "./StickerList";
import styles from "./StickerPicker.module.css";

export default function ExternalStickerPicker({ SearchBar }: any) {
    return <div className={styles.root}>
        <div className={styles.searchBarContainer}>
            <SearchBar query="" onChange={() => { }} onClear={() => { }} placeholder={LANG.PICKER_SEARCH} />
            <Tooltip text={LANG.SETTINGS} position="bottom">
                {props => (
                    <Button color={Button.Colors.TRANSPARENT} className={styles.settingsButton} {...props} onClick={() => {
                        openModal(props => <StickerSettings {...props} />);
                    }}>
                        <SettingsOutlinedIcon />
                    </Button>
                )}
            </Tooltip>
        </div>
        <div className={styles.side}>
            <div className={styles.categoryList}>
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
                <StickerCategory />
            </div>
            <StickerList />
        </div>
    </div>;
}
