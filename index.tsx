/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 paring
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton } from "@api/ChatButtons";
import { definePluginSettings } from "@api/Settings";
import { enableStyle, setStyleClassNames } from "@api/Styles";
import { Margins } from "@utils/margins";
import { ModalProps, ModalRoot, ModalSize, openModal } from "@utils/modal";
import definePlugin, { OptionType, PluginAuthor, PluginNative } from "@utils/types";
import { Button, Forms, Select, TextInput, useEffect, useState } from "@webpack/common";

import { StickerPickerModal } from "./StickerPickerModal";
import { classNames, pluginStyle } from "./styles";
import { StickerPack, StickerRef } from "./types";

const Native = VencordNative.pluginHelpers.ExternalStickers as PluginNative<
    typeof import("./native")
>;

const paring: PluginAuthor = {
    id: 628595345798201355n,
    name: "paring",
};

const settings = definePluginSettings({
    packs: {
        type: OptionType.COMPONENT,
        default: [] as StickerRef[],
        component: ({ option, setValue }) => {
            const [tempValue, setTempValue] = useState(settings.plain.packs);

            useEffect(() => {
                setValue(tempValue);
            }, [tempValue]);

            return <div>
                {(tempValue).map((x, i) => (
                    <Forms.FormSection key={i}>
                        <Forms.FormTitle>Source Type</Forms.FormTitle>
                        <Select className={Margins.bottom20} options={[{ label: "DCCON", value: "dccon" }]} isSelected={v => v === x.type} select={newType => {
                            setTempValue(v => {
                                const newValue = [...v];
                                newValue[i] = { ...newValue[i], type: newType as StickerRef["type"] };

                                return newValue;
                            });
                        }} closeOnSelect={true} serialize={String} />

                        {x.type === "dccon" && (
                            <>
                                <Forms.FormTitle>DCCON Package Id</Forms.FormTitle>
                                <TextInput placeholder="123456" className={Margins.bottom20} onChange={newIdx => {
                                    setTempValue(v => {
                                        const newValue = [...v];
                                        newValue[i] = { ...newValue[i], packageIdx: newIdx };

                                        return newValue;
                                    });
                                }} value={x.packageIdx} />
                                <Button className={Margins.bottom20} onClick={() => {
                                    setTempValue(v => {
                                        const newValue = [...v];

                                        newValue.splice(i, 1);

                                        return newValue;

                                    });
                                }} color={Button.Colors.RED}>Remove</Button>
                            </>
                        )}
                    </Forms.FormSection>
                ))}
                <Button onClick={() => {
                    setTempValue([
                        ...(tempValue), {
                            type: "dccon",
                            packageIdx: ""
                        } as StickerRef]);
                }}>Add</Button>
            </div >;
        }
    }
});

const ChatButton = () => {
    return (
        <ChatBarButton
            tooltip="External Sticker"
            onClick={() => {
                openStickerModal();
            }}
            buttonProps={{
                "aria-haspopup": "dialog",
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-mood-edit"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20.955 11.104a9 9 0 1 0 -9.895 9.847" />
                <path d="M9 10h.01" />
                <path d="M15 10h.01" />
                <path d="M9.5 15c.658 .672 1.56 1 2.5 1c.126 0 .251 -.006 .376 -.018" />
                <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" />
            </svg>
        </ChatBarButton>
    );
};

export default definePlugin({
    name: "ExternalStickers",
    description: "Use external stickers like DCCON",
    authors: [paring],

    renderChatBarButton: ChatButton,
    settings,

    start() {
        setStyleClassNames(pluginStyle, classNames);
        enableStyle(pluginStyle);
    },
});

let stickers: StickerPack[] | null = null;
let lastSettings = "";

const openStickerModal = async () => {
    openModal(props => <PickerWrapper {...props} />, { modalKey: "external-sticker-picker" });
};

const PickerWrapper = (props: ModalProps) => {
    const [currentStickers, setCurrentStickers] = useState<StickerPack[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        (async () => {
            if (!(settings.store.packs instanceof Array)) {
                setError("invalid settings");
                return;
            }
            const settingsStr = JSON.stringify(settings.store.packs);
            if (lastSettings !== settingsStr) {
                lastSettings = settingsStr;
                stickers = await Native.loadStickers(JSON.parse(settingsStr));
            }
            setCurrentStickers(stickers);
        })();
    }, []);

    if (error) {
        return <div style={{ color: "white" }}>{error}</div>;
    }

    if (!currentStickers) {
        return <div style={{ color: "white" }}>Loading...</div>;
    }

    return <ModalRoot {...props} size={ModalSize.DYNAMIC}>
        {error || (currentStickers ? <StickerPickerModal packs={currentStickers} /> : "Loading...")}
    </ModalRoot>;
};
