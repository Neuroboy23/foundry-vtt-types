/**
 * The FilePicker application renders contents of the server-side public directory
 * This app allows for navigating and uploading files to the public path
 * @typeParam Options - the type of the options object
 * @typeParam Data    - The data structure used to render the handlebars template.
 */
declare class FilePicker<
  Options extends FilePicker.Options = FilePicker.Options,
  Data extends object = FilePicker.Data
> extends Application<Options> {
  /**
   * @param options - Options that configure the behavior of the FilePicker
   */
  constructor(options?: Partial<Options>);

  /**
   * The full requested path given by the user
   */
  request: string | undefined;

  /**
   * The file sources which are available for browsing
   */
  sources: FilePicker.Sources;

  /**
   * Track the active source tab which is being browsed
   * @defaultValue `'data'`
   */
  activeSource: FilePicker.SourceType;

  /**
   * A callback function to trigger once a file has been selected
   */
  callback: FilePicker.Callback | undefined;

  /**
   * The latest set of results browsed from the server
   * @remarks This is never set.
   */
  results: {};

  /**
   * The general file type which controls the set of extensions which will be accepted
   */
  type: FilePicker.Type | undefined;

  /**
   * The target HTML element this file picker is bound to
   */
  field: HTMLElement | undefined;

  /**
   * A button which controls the display of the picker UI
   */
  button: HTMLElement | undefined;

  /**
   * The display mode of the FilePicker UI
   * @defaultValue `FilePicker.LAST_DISPLAY_MODE`
   */
  displayMode: FilePicker.DisplayMode;

  /**
   * The current set of file extensions which are being filtered upon
   */
  extensions: string[] | undefined;

  protected _loaded: boolean;

  /**
   * Record the last-browsed directory path so that re-opening a different FilePicker instance uses the same target
   * @defaultValue `""`
   */
  static LAST_BROWSED_DIRECTORY: string;

  /**
   * Record the last-configured tile size which can automatically be applied to new FilePicker instances
   * @defaultValue `null`
   */
  static LAST_TILE_SIZE: number | null;

  /**
   * Record the last-configured display mode so that re-opening a different FilePicker instance uses the same mode.
   * @defaultValue `'list'`
   */
  static LAST_DISPLAY_MODE: FilePicker.DisplayMode;

  /**
   * Enumerate the allowed FilePicker display modes
   */
  static DISPLAY_MODES: ['list', 'thumbs', 'tiles', 'images'];

  /**
   * Cache the names of S3 buckets which can be used
   * @defaultValue `null`
   */
  static S3_BUCKETS: string[] | null;

  /**
   * @override
   * @defaultValue
   * ```typescript
   * foundry.utils.mergeObject(super.defaultOptions, {
   *   template: "templates/apps/filepicker.html",
   *   classes: ["filepicker"],
   *   width: 520,
   *   tabs: [{navSelector: ".tabs"}],
   *   dragDrop: [{dragSelector: ".file", dropSelector: ".filepicker-body"}],
   *   tileSize: false,
   *   filters: [{inputSelector: 'input[name="filter"]', contentSelector: ".filepicker-body"}]
   * })
   * ```
   */
  static get defaultOptions(): FilePicker.Options;

  /**
   * Given a current file path, determine the directory it belongs to
   * @param target - The currently requested target path
   * @returns An array of the inferred source and target directory path
   * @internal
   */
  protected _inferCurrentDirectory(target: string | undefined): [string, string];

  /**
   * Get the valid file extensions for a given named file picker type
   * @internal
   */
  protected _getExtensions(type: FilePicker.Type): string[] | undefined;

  /**
   * Test a URL to see if it matches a well known s3 key pattern
   * @param url - An input URL to test
   * @returns A regular expression match
   */
  static matchS3URL(url: string): RegExpMatchArray | null;

  /**
   * Parse a s3 key to learn the bucket and the key prefix used for the request
   * @param key - A fully qualified key name or prefix path
   */
  static parseS3URL(key: string): { bucket: string | null; keyPrefix: string };

  /**
   * @override
   */
  get title(): string;

  /**
   * Return the source object for the currently active source
   */
  get source(): FilePicker.Source;

  /**
   * Return the target directory for the currently active source
   */
  get target(): string;

  /**
   * Return a flag for whether the current user is able to upload file content
   */
  get canUpload(): boolean;

  /**
   * Return the upload URL to which the FilePicker should post uploaded files
   */
  static get uploadURL(): string;

  /**
   * @override
   * @param options - (unused)
   */
  getData(options?: Partial<Options>): Data | Promise<Data>;

  /**
   * Browse to a specific location for this FilePicker instance
   * @param target - The target within the currently active source location.
   * @param options - Browsing options (default: `{}`)
   */
  browse(target: string, options?: FilePicker.BrowseOptions): Promise<FilePicker.BrowseResult | undefined>;

  /**
   * Browse files for a certain directory location
   * @param source  - The source location in which to browse. See FilePicker#sources for details
   * @param target  - The target within the source location (default: `""`)
   * @param options - Optional arguments (default: `{}`)
   *
   * @returns A Promise which resolves to the directories and files contained in the location
   */
  static browse(
    source: FilePicker.SourceType,
    target: string,
    options?: FilePicker.BrowseOptions
  ): Promise<FilePicker.BrowseResult>;

  /**
   * Configure metadata settings regarding a certain file system path
   * @param source  - The source location in which to browse. See FilePicker#sources for details
   * @param target  - The target within the source location
   * @param options - Optional arguments which modify the request (default: `{}`)
   */
  static configurePath(
    source: FilePicker.SourceType,
    target: string,
    options?: FilePicker.ConfigurePathOptions
  ): Promise<FilePicker.ConfigurePathResult>;

  /**
   * Create a subdirectory within a given source. The requested subdirectory path must not already exist.
   * @param source  - The source location in which to browse. See FilePicker#sources for details
   * @param target  - The target within the source location
   * @param options - Optional arguments which modify the request (default: `{}`)
   */
  static createDirectory(
    source: FilePicker.SourceType,
    target: string,
    options?: FilePicker.CreateDirectoryOptions
  ): Promise<string>;

  /**
   * General dispatcher method to submit file management commands to the server
   * @internal
   */
  protected static _manageFiles(
    data: FilePicker.BrowseFilesData,
    options?: FilePicker.BrowseOptions
  ): Promise<FilePicker.BrowseResult>;
  protected static _manageFiles(
    data: FilePicker.ConfigurePathData,
    options?: FilePicker.ConfigurePathOptions
  ): Promise<FilePicker.ConfigurePathResult>;
  protected static _manageFiles(
    data: FilePicker.CreateDirectoryData,
    options?: FilePicker.CreateDirectoryOptions
  ): Promise<string>;

  /**
   * Dispatch a POST request to the server containing a directory path and a file to upload
   * @param source  - The data source to which the file should be uploaded
   * @param path    - The destination path
   * @param file    - The File object to upload
   * @param options - Additional file upload options passed as form data (default `{}`)
   * @returns The response object
   */
  static upload(
    source: FilePicker.SourceType,
    path: string,
    file: File,
    options?: FilePicker.UploadOptions
  ): Promise<FilePicker.UploadResult | false | void>;

  /**
   * @override
   * Additional actions performed when the file-picker UI is rendered
   */
  render(force?: boolean, options?: Application.RenderOptions<Options>): unknown;

  /** @override */
  activateListeners(html: JQuery): void;

  /**
   * Handle a click event to change the display mode of the File Picker
   * @param event - The triggering click event
   * @internal
   */
  protected _onChangeDisplayMode(event: JQuery.ClickEvent): void;

  /**
   * @param event - (unused)
   * @param event - (unused)
   * @override
   * @internal
   */
  protected _onChangeTab(event: MouseEvent | null, tabs: Tabs, active: this['activeSource']): void;

  /**
   * @override
   * @param selector - (unused)
   */
  protected _canDragStart(selector: string | null): boolean;

  /**
   * @override
   * @param selector - (unused)
   */
  protected _canDragDrop(selector: string | null): boolean;

  /**
   * @override
   */
  protected _onDragStart(event: DragEvent): void;

  /**
   * @override
   * @internal
   */
  protected _onDrop(event: DragEvent): void;

  /**
   * Handle user submission of the address bar to request an explicit target
   * @param event - The originating keydown event
   * @internal
   */
  protected _onRequestTarget(event: KeyboardEvent): void;

  /**
   * Handle requests from the IntersectionObserver to lazily load an image file
   * @internal
   */
  protected _onLazyLoadImages(...args: Parameters<SidebarTab['_onLazyLoadImage']>): void;

  /**
   * Handle file or folder selection within the file picker
   * @param event - The originating click event
   * @internal
   */
  protected _onPick(event: JQuery.ClickEvent): void;

  /**
   * Handle backwards navigation of the fol6der structure
   * @internal
   */
  protected _onClickDirectoryControl(event: JQuery.ClickEvent): void;

  /**
   * Present the user with a dialog to create a subdirectory within their currentl
   * @internal browsed file storate location.
   */
  protected _createDirectoryDialog(source: FilePicker.Source): void;

  /**
   * Handle changes to the bucket selector
   * @internal
   */
  protected _onChangeBucket(event: JQuery.ChangeEvent): void;

  /**
   * @override
   * @param event - (unused)
   */
  protected _onSearchFilter(event: KeyboardEvent, query: string, rgx: RegExp, html: HTMLElement): void;

  /**
   * Handle file picker form submission
   */
  protected _onSubmit(ev: Event): void;

  /**
   * Handle file upload
   */
  protected _onUpload(ev: Event): void;

  /**
   * Bind the file picker to a new target field.
   * Assumes the user will provide a <button> HTMLElement which has the data-target and data-type attributes
   * The data-target attribute should provide the name of the input field which should receive the selected file
   * The data-type attribute is a string in ["image", "audio"] which sets the file extensions which will be accepted
   *
   * @param button  - The button element
   */
  static fromButton(button: HTMLButtonElement): FilePicker;
}

declare namespace FilePicker {
  interface BrowseResult {
    target: string;
    private: boolean;
    dirs: string[];
    privateDirs: string[];
    files: string[];
    gridSize: number | null;
    extensions: [];
  }

  interface BrowseOptions {
    /**
     * A bucket within which to search, if using the S3 source
     */
    bucket?: string;

    /**
     * An Array of file extensions to filter on
     * @defaultValue `[]` (do not filter on extension)
     */
    extensions?: string[];

    /**
     * The requested dir represents a wildcard path
     * @defaultValue false
     */
    wildcard?: boolean;
  }

  type Callback = (path: string) => void;

  interface ConfigurePathOptions {
    bucket?: string | undefined | null;

    private?: boolean | undefined;

    gridSize?: number | undefined;
  }

  interface ConfigurePathResult {
    private?: boolean;
    gridSize?: number;
  }

  interface CreateDirectoryOptions {
    /**
     * @defaultValue `""`
     */
    bucket?: string | null;
  }

  interface Data {
    bucket: string | null;
    canGoBack: boolean;
    canUpload: boolean;
    canSelect: boolean;
    cssClass: string;
    dirs: Dir[];
    displayMode: FilePicker.DisplayMode;
    extensions: string[] | undefined;
    files: File[];
    isS3: boolean;
    noResults: boolean;
    selected: string | undefined;
    source: Source;
    sources: Sources;
    target: string;
    tileSize: number | null;
    user: Game['user'];
    submitText: string;
  }

  type SourceType = 'data' | 'public' | 's3';

  interface Dir {
    name: string;
    path: string;
    private: boolean;
  }

  type DisplayMode = ValueOf<typeof FilePicker['DISPLAY_MODES']>;

  interface File {
    name: string;
    url: string;
    img: string;
  }

  interface ManageFilesDataBase {
    source: string;
    target: string;
  }

  interface BrowseFilesData extends ManageFilesDataBase {
    action: 'browseFiles';
  }

  interface ConfigurePathData extends ManageFilesDataBase {
    action: 'configurePath';
  }

  interface CreateDirectoryData extends ManageFilesDataBase {
    action: 'createDirectory';
  }

  /**
   * Options for configuring FilePicker
   */
  interface Options extends ApplicationOptions {
    /**
     * A type of file to target, in "audio", "image", "video", "imagevideo" or "folder"
     */
    type?: Type | undefined;

    /**
     * The current file path being modified, if any
     */
    current?: string | undefined;

    /**
     * A current file source in "data", "public", or "s3"
     */
    activeSource?: SourceType | undefined;

    /**
     * A callback function to trigger once a file has been selected
     */
    callback?: Callback | undefined;

    /**
     * A flag which permits explicitly disallowing upload, true by default
     */
    allowUpload?: boolean | undefined;

    /**
     * An HTML form field that the result of this selection is applied to
     */
    field?: HTMLElement | undefined;

    /**
     * An HTML button element which triggers the display of this picker
     */
    button?: HTMLElement | undefined;

    /**
     * The picker display mode in FilePicker.DISPLAY_MODES
     */
    displayMode?: DisplayMode | undefined;

    tileSize?: boolean | undefined;
  }

  interface Source {
    target: string;
    label: string;
    icon: string;
  }

  interface Sources {
    data: Source;
    public: Source;
    s3?: Source & {
      buckets: string[];
      bucket: string;
    };
  }

  type Type = 'audio' | 'image' | 'video' | 'imagevideo' | 'folder';

  interface UploadOptions {
    /**
     * A bucket to upload to, if using the S3 source
     * @defaultValue `""`
     */
    bucket?: string | null;
  }

  interface UploadResult {
    message: string;
    path: string;
    status: 'success';
  }
}
