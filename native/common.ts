/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { DATA_DIR } from "@main/utils/constants";
import path from "path";

export const getDefaultStickersRoot = async () => {
    return path.join(DATA_DIR, "ExternalStickers_DATA");
};
