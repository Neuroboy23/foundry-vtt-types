import { expectType } from 'tsd';

expectType<'AmbientLight'>(LightingLayer.documentName);
expectType<LightingLayer | undefined>(LightingLayer.instance);
expectType<LightingLayer.LayerOptions>(LightingLayer.layerOptions);
expectType<'lighting'>(LightingLayer.layerOptions.name);
expectType<typeof AmbientLight>(LightingLayer.layerOptions.objectClass);

const layer = new LightingLayer();
expectType<typeof AmbientLight>(layer.options.objectClass);
expectType<LightingLayer.LayerOptions>(layer.options);
expectType<'lighting'>(layer.options.name);

expectType<foundry.utils.Collection<PointSource>>(layer.sources);

expectType<number>(layer.version);

expectType<boolean>(layer.globalLight);

expectType<PIXI.Container | null>(layer.coloration);

expectType<PIXI.Container | null>(layer.illumination);

expectType<
  | {
      background: LightChannel;
      black: LightChannel;
      bright: LightChannel;
      canvas: LightChannel;
      dark: LightChannel;
      dim: LightChannel;
    }
  | undefined
>(layer.channels);

expectType<Promise<LightingLayer>>(layer.draw());

expectType<boolean>(layer.hasGlobalIllumination());

expectType<void>(layer.initializeSources());

expectType<void>(layer.refresh());
expectType<void>(layer.refresh(undefined));
expectType<void>(layer.refresh(100));

expectType<Promise<LightingLayer>>(layer.tearDown());

expectType<void>(layer.activateAnimation());

expectType<void>(layer.deactivateAnimation());

expectType<Promise<void>>(layer.animateDarkness());
expectType<Promise<void>>(layer.animateDarkness(1.0));
expectType<Promise<void>>(layer.animateDarkness(1.0, {}));
expectType<Promise<void>>(layer.animateDarkness(1.0, { duration: 10000 }));
