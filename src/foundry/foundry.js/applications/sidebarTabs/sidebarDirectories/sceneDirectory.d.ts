/**
 * A directory listing of active game scenes
 */
declare class SceneDirectory extends SidebarDirectory<'Scene'> {
  /** @override */
  static documentName: 'Scene';

  /** @override */
  protected _render(force?: boolean, options?: Application.RenderOptions<SidebarDirectory.Options>): Promise<void>;

  /** @override */
  protected _getEntryContextOptions(): ContextMenuEntry[];
}
