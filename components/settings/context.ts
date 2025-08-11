/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { React } from "@webpack/common";

export interface TabContextData {
    get: () => string | null,
    set: (value: string | null) => void;
}


let context: React.Context<TabContextData> = null!;


export const getTabContext = () => {
    if (context) return context;
    return context = React.createContext<{
        get: () => string | null,
        set: (value: string | null) => void;
    }>({
        get: null!,
        set: null!
    });
};
