import { observersConfigType } from './components/Bot';
type BotProps = {
    chatflowid: string;
    apiHost?: string;
    chatflowConfig?: Record<string, unknown>;
    observersConfig?: observersConfigType;
};
export declare const initFull: (props: BotProps & {
    id?: string;
}, style?: HTMLStyleElement) => Element;
export declare const init: (props: BotProps, style?: HTMLStyleElement) => HTMLElement;
export declare const destroy: () => void;
type Chatbot = {
    initFull: typeof initFull;
    init: typeof init;
    destroy: typeof destroy;
};
export declare const parseChatbot: () => {
    initFull: (props: BotProps & {
        id?: string;
    }, style?: HTMLStyleElement) => Element;
    init: (props: BotProps, style?: HTMLStyleElement) => HTMLElement;
    destroy: () => void;
};
export declare const injectChatbotInWindow: (bot: Chatbot) => void;
export {};
//# sourceMappingURL=window.d.ts.map