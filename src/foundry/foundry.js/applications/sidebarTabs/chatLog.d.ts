import { ConfiguredDocumentClass } from '../../../../types/helperTypes';
import type { ChatMessageDataConstructorData } from '../../../common/data/data.mjs/chatMessageData.js';

declare global {
  /**
   * The sidebar directory which organizes and displays world-level ChatMessage documents.
   * @see {@link Sidebar}
   */
  class ChatLog extends SidebarTab<ChatLog.Options> {
    constructor(options?: Partial<ChatLog.Options>);

    /**
     * Track any pending text which the user has submitted in the chat log textarea
     * @internal
     */
    protected _pendingText: string;

    /**
     * Track the history of the past 5 sent messages which can be accessed using the arrow keys
     * @defaultValue `[]`
     * @internal
     */
    protected _sentMessages: string[];

    /**
     * Track which remembered message is being currently displayed to cycle properly
     * @defaultValue `-1`
     * @internal
     */
    protected _sentMessageIndex: number;

    /**
     * Track the time when the last message was sent to avoid flooding notifications
     * @defaultValue `0`
     * @internal
     */
    protected _lastMessageTime: number;

    /**
     * Track the id of the last message displayed in the log
     * @defaultValue `null`
     * @internal
     */
    protected _lastId: string | null;

    /**
     * Track the last received message which included the user as a whisper recipient.
     * @defaultValue `null`
     * @internal
     */
    protected _lastWhisper: InstanceType<ConfiguredDocumentClass<typeof ChatMessage>> | null;

    /**
     * A reference to the chat text entry bound key method
     * @defaultValue `null`
     * @internal
     */
    _onChatKeyDownBinding: ((event: JQuery.KeyDownEvent) => void) | null;

    /** @override */
    static get defaultOptions(): ChatLog.Options;

    /**
     * A reference to the Messages collection that the chat log displays
     */
    get collection(): Messages;

    /** @override */
    getData(options?: Partial<ChatLog.Options>): ChatLog.Data;

    /** @override */
    protected _render(force?: boolean, options?: Application.RenderOptions<ChatLog.Options>): Promise<void>;

    /**
     * @override
     * @internal
     */
    protected _renderInner(data: ChatLog.Data): Promise<JQuery>;

    /**
     * Render a batch of additional messages, prepending them to the top of the log
     * @param html - The rendered jQuery HTML object
     * @param size - The batch size to include
     *
     * @internal
     */
    protected _renderBatch(html: JQuery, size: number): Promise<void>;

    /**
     * Delete a single message from the chat log
     * @param messageId - The ChatMessage entity to remove from the log
     * @param deleteAll - Is this part of a flush operation to delete all messages?
     *                    (default: `false`)
     */
    deleteMessage(messageId: string, { deleteAll }?: { deleteAll?: boolean }): void;

    /**
     * Trigger a notification that alerts the user visually and audibly that a new chat log message has been posted
     */
    notify(message: InstanceType<ConfiguredDocumentClass<typeof ChatMessage>>): void;

    /**
     * Parse a chat string to identify the chat command (if any) which was used
     * @param message - The message to match
     * @returns The identified command and regex match
     * @remarks The returned RegExpMatchArray or string Array has the entire match as its first value, then the match for
     *          the slash command (or an empty string) and as last element the flavor or message text. The whisper match
     *          is an exception: Its third value is the target user name (optionally in brackets) and the fourth value is
     *          the message text.
     */
    static parse<S extends string>(message: S): [ChatLog.Command, RegExpMatchArray] | ['none', [S, '', S]];

    /**
     * Post a single chat message to the log
     * @param message - A ChatMessage entity instance to post to the log
     * @param notify  - Trigger a notification which shows the log as having a new unread message
     *                  (default: `false`)
     * @returns A Promise which resolves once the message is posted
     */
    postOne(message: InstanceType<ConfiguredDocumentClass<typeof ChatMessage>>, notify?: boolean): Promise<void>;

    /**
     * Scroll the chat log to the bottom
     * @param options - (default: `{}`)
     */
    protected scrollBottom(options?: ChatLog.ScrollBottomOptions): void;

    /**
     * Update the content of a previously posted message after its data has been replaced
     * @param message - The ChatMessage instance to update
     * @param notify  - Trigger a notification which shows the log as having a new unread message
     *                  (default: `false`)
     */
    updateMessage(message: InstanceType<ConfiguredDocumentClass<typeof ChatMessage>>, notify?: boolean): void;

    /**
     * Update the displayed timestamps for every displayed message in the chat log.
     * Timestamps are displayed in a humanized "timesince" format.
     */
    updateTimestamps(): void;

    /** @override */
    activateListeners(html: JQuery): void;

    /**
     * Prepare the data object of chat message data depending on the type of message being posted
     * @param message - The original string of the message content
     * @returns A Promise resolving to the prepared chat data object
     */
    protected processMessage(
      message: string
    ): Promise<InstanceType<ConfiguredDocumentClass<typeof ChatMessage>> | undefined | void>;

    /**
     * Process messages which are posted using a dice-roll command
     * @param command       - The chat command type
     * @param match         - The matched RegExp expressions
     * @param chatData      - The initial chat data
     * @param createOptions - Options used to create the message
     *                        (unused)
     * @internal
     */
    protected _processDiceCommand(
      command: string,
      match: RegExpMatchArray,
      chatData: ChatMessageDataConstructorData,
      createOptions: DocumentModificationContext
    ): void;

    /**
     * Process messages which are posted using a chat whisper command
     * @param command       - The chat command type
     * @param match         - The matched RegExp expressions
     * @param chatData      - The initial chat data
     * @param createOptions - Options used to create the message
     * @throws If the user does not have the permission to whisper to other players
     * @internal
     */
    protected _processWhisperCommand(
      command: string,
      match: RegExpMatchArray,
      chatData: ChatMessageDataConstructorData,
      createOptions: DocumentModificationContext
    ): void;

    /**
     * Process messages which are posted using a chat whisper command
     * @param command       - The chat command type
     * @param match         - The matched RegExp expressions
     * @param chatData      - The initial chat data
     * @param createOptions - Options used to create the message
     * @internal
     */
    protected _processChatCommand(
      command: string,
      match: RegExpMatchArray,
      chatData: ChatMessageDataConstructorData,
      createOptions: DocumentModificationContext
    ): void;

    /**
     * Add a sent message to an array of remembered messages to be re-sent if the user pages up with the up arrow key
     * @param message - The message text being remembered
     * @internal
     */
    protected _remember(message: string): void;

    /**
     * Recall a previously sent message by incrementing up (1) or down (-1) through the sent messages array
     * @param direction - The direction to recall, positive for older, negative for more recent
     * @returns The recalled message, or an empty string
     * @internal
     */
    protected _recall(direction: number): string;

    /**
     * Attach context menu options to messages in the chat log.
     * @param html - The HTML element to which context options are attached
     */
    protected _contextMenu(html: JQuery): void;

    /**
     * Get the ChatLog entry context options
     * @returns The sidebar entry context options
     * @internal
     */
    protected _getEntryContextOptions(): ContextMenuEntry[];

    /**
     * Handle keydown events in the chat entry textarea
     * @internal
     */
    protected _onChatKeyDown(event: JQuery.KeyDownEvent): void;

    /**
     * Handle setting the preferred roll mode
     * @internal
     */
    protected _onChangeRollMode(event: JQuery.ChangeEvent): void;

    /**
     * Handle single message deletion workflow
     * @internal
     */
    protected _onDeleteMessage(
      event: JQuery.ClickEvent
    ): Promise<InstanceType<ConfiguredDocumentClass<typeof ChatMessage>> | undefined>;

    /**
     * Handle clicking of dice tooltip buttons
     * @internal
     */
    protected _onDiceRollClick(event: JQuery.ClickEvent): void;

    /**
     * Handle click events to export the chat log
     * @internal
     */
    protected _onExportLog(event: JQuery.ClickEvent): void;

    /**
     * Handle click events to flush the chat log
     * @internal
     */
    protected _onFlushLog(event: JQuery.ClickEvent): void;

    /**
     * Handle scroll events within the chat log container
     * @param event - The initial scroll event
     * @internal
     */
    protected _onScrollLog(event: JQuery.ScrollEvent): void;

    /**
     * Update roll mode select dropdowns when the setting is changed
     * @param mode - The new roll mode setting
     * @internal
     */
    protected static _setRollMode(mode: keyof CONFIG.Dice.RollModes): void;
  }

  namespace ChatLog {
    type Command =
      | 'roll'
      | 'gmroll'
      | 'blindroll'
      | 'selfroll'
      | 'whisper'
      | 'reply'
      | 'gm'
      | 'players'
      | 'ic'
      | 'emote'
      | 'ooc'
      | 'invalid'
      | 'none';

    interface Data {
      user: InstanceType<ConfiguredDocumentClass<typeof User>>;
      rollMode: keyof CONFIG.Dice.RollModes;
      rollModes: typeof CONFIG['Dice']['rollModes'];
      isStream: boolean;
    }

    interface Options extends ApplicationOptions {
      /**
       * @defaultValue `'chat'`
       */
      id: string;

      /**
       * @defaultValue `'templates/sidebar/chat-log.html'`
       */
      template: string;

      title: string;

      scrollContainer: null;

      /**
       * @defaultValue `false`
       */
      stream: boolean;
    }

    interface ScrollBottomOptions {
      /**
       * If a popout exists, scroll it too
       * @defaultValue `undefined`
       */
      popout?: boolean;
    }
  }
}
