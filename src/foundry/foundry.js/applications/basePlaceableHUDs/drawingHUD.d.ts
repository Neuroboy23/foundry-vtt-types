import { ConfiguredObjectClassForName } from '../../../../types/helperTypes';

declare global {
  /**
   * An implementation of the PlaceableHUD base class which renders a heads-up-display interface for Drawing objects.
   * @typeParam Options - the type of the options object
   */
  class DrawingHUD<Options extends ApplicationOptions = ApplicationOptions> extends BasePlaceableHUD<
    ConcreteDrawing,
    Options
  > {
    /**
     * @override
     * @defaultValue
     * ```
     * foundry.utils.mergeObject(super.defaultOptions, {
     *   id: "drawing-hud",
     *   template: "templates/hud/drawing-hud.html"
     * })
     * ```
     */
    static get defaultOptions(): ApplicationOptions;

    /** @override */
    getData(options?: Partial<Options>): ReturnType<BasePlaceableHUD<ConcreteDrawing>['getData']> & {
      lockedClass: string;
      visibilityClass: string;
    };

    /**
     * @override
     * @param options - (unused)
     */
    setPosition(options?: Partial<Application.Position>): void;
  }
}

type ConcreteDrawing = InstanceType<ConfiguredObjectClassForName<'Drawing'>>;
