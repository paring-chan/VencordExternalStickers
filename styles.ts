/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { findByPropsLazy } from "@webpack";

export { default as pluginStyle } from "./plugin.css?managed";

export const classNames = findByPropsLazy("searchInput");
