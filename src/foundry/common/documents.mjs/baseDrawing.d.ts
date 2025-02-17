import { ConfiguredDocumentClass } from '../../../types/helperTypes';
import { DocumentMetadata } from '../abstract/document.mjs';
import { Document } from '../abstract/module.mjs';
import * as data from '../data/data.mjs';
import type { CONST } from '../module.mjs';
import { BaseScene } from './baseScene';
import { BaseUser } from './baseUser';

/**
 * The base Drawing model definition which defines common behavior of an Drawing document between both client and server.
 */
export declare class BaseDrawing extends Document<
  data.DrawingData,
  InstanceType<ConfiguredDocumentClass<typeof BaseScene>>
> {
  /** @override */
  static get schema(): typeof data.DrawingData;

  /** @override */
  static get metadata(): Merge<
    DocumentMetadata,
    {
      name: 'Drawing';
      collection: 'drawings';
      label: 'DOCUMENT.Drawing';
      labelPlural: 'DOCUMENT.Drawings';
      isEmbedded: true;
      types: [
        typeof CONST.DRAWING_TYPES.RECTANGLE,
        typeof CONST.DRAWING_TYPES.ELLIPSE,
        typeof CONST.DRAWING_TYPES.TEXT,
        typeof CONST.DRAWING_TYPES.POLYGON,
        typeof CONST.DRAWING_TYPES.FREEHAND
      ];
      permissions: {
        create: 'DRAWING_CREATE';
        update: (user: BaseUser, doc: BaseDrawing, data?: object) => boolean;
        delete: (user: BaseUser, doc: BaseDrawing, data?: object) => boolean;
      };
    }
  >;

  /** @override */
  testUserPermission(
    user: BaseUser,
    permission: keyof typeof foundry.CONST.ENTITY_PERMISSIONS | foundry.CONST.DOCUMENT_PERMISSION_LEVELS,
    { exact }?: { exact?: boolean }
  ): boolean;

  /**
   * Is a user able to update or delete an existing Drawing document??
   */
  protected static _canModify(user: BaseUser, doc: BaseDrawing, data?: object): boolean;
}
