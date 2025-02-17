import { expectType } from 'tsd';

expectType<undefined>(ControlsLayer.instance);
expectType<ControlsLayer.LayerOptions>(ControlsLayer.layerOptions);
expectType<'controls'>(ControlsLayer.layerOptions.name);

declare const wall: Wall;

const layer = new ControlsLayer();
expectType<'controls'>(layer.options.name);
expectType<ControlsLayer.LayerOptions>(layer.options);
expectType<PIXI.Container | null>(layer.cursors);
expectType<PIXI.Container | null>(layer.doors);
expectType<null>(layer.effects);
expectType<PIXI.Container | null>(layer.rulers);
expectType<PIXI.Graphics | null>(layer.select);
expectType<true>(layer.interactiveChildren);
expectType<Ruler | null>(layer.ruler);
expectType<Ruler | null>(layer.getRulerForUser('my-user-id'));
expectType<ControlsLayer>(layer.draw());
expectType<void>(layer.drawCursors());
expectType<void>(layer.drawDoors());
expectType<Promise<DoorControl> | null>(layer.createDoorControl(wall));
expectType<void>(layer.drawRulers());
expectType<void>(layer.drawSelect({ x: 100, y: 500, width: 200, height: 200 }));
expectType<void>(layer.deactivate());
expectType<Cursor>(layer.drawCursor(new User()));
expectType<void>(layer.updateCursor(new User(), { x: 100, y: 500 }));
expectType<void>(layer.updateCursor(new User(), null));
