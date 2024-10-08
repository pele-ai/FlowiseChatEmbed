import styles from '../../../assets/index.css';
import { Bot, BotProps } from '@/components/Bot';
import { BubbleParams } from '@/features/bubble/types';
import { createSignal, onCleanup, onMount, Show, createMemo } from 'solid-js';

const defaultButtonColor = '#3B81F6';
const defaultIconColor = 'white';

export type FullProps = BotProps & BubbleParams;

export const Full = (props: FullProps, { element }: { element: HTMLElement }) => {
  const [isBotDisplayed, setIsBotDisplayed] = createSignal(false);

  const launchBot = () => {
    setIsBotDisplayed(true);
    document.body.style.margin = '0'; // Ensure no margin
    document.documentElement.style.padding = '0'; // Ensure no padding

    // Set viewport meta tag dynamically
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, interactive-widget=resizes-content');
    }
    if (props?.observersConfig) {
      const { observeBotOpen } = props.observersConfig;
      typeof observeBotOpen === 'function' &&
        createMemo(() => {
          observeBotOpen(isBotDisplayed());
        });
    }
  };

  const botLauncherObserver = new IntersectionObserver((intersections) => {
    if (intersections.some((intersection) => intersection.isIntersecting)) launchBot();
  });

  onMount(() => {
    botLauncherObserver.observe(element);
  });

  onCleanup(() => {
    botLauncherObserver.disconnect();
    document.body.style.margin = ''; // Reset margin
    document.documentElement.style.padding = ''; // Reset padding

    // Reset viewport meta tag if needed
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
  });

  const closeBot = () => {
    setIsBotDisplayed(false);
  };

  return (
    <>
      <style>{styles}</style>
      <Show when={isBotDisplayed()}>
        <div
          style={{
            'background-color': props.theme?.chatWindow?.backgroundColor || '#ffffff',
            height: props.theme?.chatWindow?.height ? `${props.theme?.chatWindow?.height.toString()}px` : '100dvh',
            width: props.theme?.chatWindow?.width ? `${props.theme?.chatWindow?.width.toString()}px` : '100%',
            margin: '0px',
            overflow: 'hidden', // Ensure no extra scrolling due to content overflow
            direction: props.theme?.chatWindow?.textInput?.direction,
          }}
        >
          <Bot
            badgeBackgroundColor={props.theme?.chatWindow?.backgroundColor}
            bubbleBackgroundColor={props.theme?.button?.backgroundColor ?? defaultButtonColor}
            bubbleTextColor={props.theme?.button?.iconColor ?? defaultIconColor}
            showTitle={props.theme?.chatWindow?.showTitle}
            showAgentMessages={props.theme?.chatWindow?.showAgentMessages}
            title={props.theme?.chatWindow?.title}
            titleAvatarSrc={props.theme?.chatWindow?.titleAvatarSrc}
            welcomeMessage={props.theme?.chatWindow?.welcomeMessage}
            errorMessage={props.theme?.chatWindow?.errorMessage}
            poweredByTextColor={props.theme?.chatWindow?.poweredByTextColor}
            textInput={props.theme?.chatWindow?.textInput}
            botMessage={props.theme?.chatWindow?.botMessage}
            userMessage={props.theme?.chatWindow?.userMessage}
            feedback={props.theme?.chatWindow?.feedback}
            fontSize={props.theme?.chatWindow?.fontSize}
            footer={props.theme?.chatWindow?.footer}
            starterPrompts={props.theme?.chatWindow?.starterPrompts}
            chatflowid={props.chatflowid}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
            isFullPage={true}
            observersConfig={props.observersConfig}
            showResizeButton={props.theme?.chatWindow?.showResizeButton}
            onResize={props.theme?.chatWindow?.onResize}
            showCloseButton={props.theme?.chatWindow?.showCloseButton}
            onCloseBot={closeBot}
          />
        </div>
      </Show>
    </>
  );
};
