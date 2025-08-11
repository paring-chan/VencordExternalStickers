/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ModalProps, ModalRoot, ModalSize } from "@utils/modal";

import SettingsModal from "./modal";

export default function StickerSettings(props: ModalProps) {
    return <ModalRoot {...props} size={ModalSize.LARGE}>
        <SettingsModal />
    </ModalRoot>;
}
