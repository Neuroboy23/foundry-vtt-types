import * as data from '../data/data.mjs';
import { Document } from '../abstract/module.mjs';
import { DocumentMetadata } from '../abstract/document.mjs';
import * as CONST from '../constants.mjs';

/**
 * The base Folder model definition which defines common behavior of an Folder document between both client and server.
 */
export declare class BaseFolder extends Document<data.FolderData, BaseFolder> {
  /** @override */
  static get schema(): typeof data.FolderData;

  /** @override */
  static get metadata(): Merge<
    DocumentMetadata,
    {
      name: 'Folder';
      collection: 'folders';
      label: 'DOCUMENT.Folder';
      labelPlural: 'DOCUMENT.Folders';
      isPrimary: true;
      types: typeof CONST.FOLDER_DOCUMENT_TYPES;
    }
  >;

  /**
   * The type of Document contained within this Folder.
   */
  get type(): CONST.FOLDER_DOCUMENT_TYPES;
}
