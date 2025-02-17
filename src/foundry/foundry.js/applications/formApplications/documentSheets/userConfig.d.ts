import { ConfiguredDocumentClass } from '../../../../../types/helperTypes';

declare global {
  /**
   * The Application responsible for configuring a single User document.
   * @typeParam Options - the type of the options object
   * @typeParam Data    - The data structure used to render the handlebars template.
   */
  class UserConfig<
    Options extends DocumentSheetOptions = UserConfig.Options,
    Data extends object = UserConfig.Data<Options>
  > extends DocumentSheet<Options, Data, InstanceType<ConfiguredDocumentClass<typeof User>>> {
    /**
     * @override
     * @defaultValue
     * ```typescript
     * foundry.utils.mergeObject(super.defaultOptions, {
     *   classes: ["sheet", "user-config"],
     *   template: "templates/user/user-config.html",
     *   width: 400,
     *   height: "auto"
     * })
     * ```
     */
    static get defaultOptions(): UserConfig.Options;

    /** @override */
    get title(): string;

    /** @override */
    getData(options?: Partial<Options>): Data;

    /** @override */
    activateListeners(html: JQuery): void;

    /**
     * Handle changing the user avatar image by opening a FilePicker
     */
    protected _onEditAvatar(event: JQuery.ClickEvent): ReturnType<FilePicker['browse']>;

    /**
     * @remarks This method not overridden in foundry but added to provide types when overriding the UserConfig.
     */
    protected _updateObject(
      event: Event,
      formData: FormData
    ): Promise<InstanceType<ConfiguredDocumentClass<typeof User>> | undefined>;
  }

  namespace UserConfig {
    interface Data<Options extends DocumentSheetOptions> {
      user: InstanceType<ConfiguredDocumentClass<typeof User>>;
      actors: InstanceType<ConfiguredDocumentClass<typeof Actor>>[];
      options: Options;
    }

    interface Options extends DocumentSheetOptions {
      /**
       * @defaultValue `["sheet", "user-config"]`
       */
      classes: DocumentSheetOptions['classes'];

      /**
       * @defaultValue `"templates/user/user-config.html"`
       */
      template: DocumentSheetOptions['template'];

      /**
       * @defaultValue `400`
       */
      width: DocumentSheetOptions['width'];

      /**
       * @defaultValue `auto`
       */
      height: DocumentSheetOptions['height'];
    }
  }
}

type FormData = Pick<foundry.data.UserData, 'avatar' | 'character' | 'color'>;
