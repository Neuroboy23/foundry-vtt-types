import 'jquery';
import 'socket.io-client';
import 'tinymce';
import 'handlebars';
import 'pixi.js';

// Apps

import './types/applications/application';
import './types/applications/baseEntitySheet';
import './types/applications/cameraViews';
import './types/applications/dialog';
import './types/applications/filePicker';
import './types/applications/formApplication';
import './types/applications/formDataExtended';
import './types/applications/localization';
import './types/applications/sidebar';

import './types/applications/forms/actorSheet';
import './types/applications/forms/forms';
import './types/applications/forms/itemSheet';
import './types/applications/forms/permission';
import './types/applications/forms/rollTableConfig';
import './types/applications/forms/scene';
import './types/applications/forms/settingsConfig';
import './types/applications/forms/setupConfigurationForm';
import './types/applications/forms/userManagement';

import './types/applications/hud/chatBubbles';
import './types/applications/hud/container';
import './types/applications/hud/controls';
import './types/applications/hud/hotbar';
import './types/applications/hud/hud';
import './types/applications/hud/menu';
import './types/applications/hud/navigation';
import './types/applications/hud/pause';
import './types/applications/hud/players';

import './types/applications/journal/journalSheet';
import './types/applications/journal/noteConfig';

import './types/applications/placeables/placeablesConfig';
import './types/applications/placeables/placeablesHud';

import './types/applications/sidebarTab';
import './types/applications/sidebarTabs/chatLog';
import './types/applications/sidebarTabs/combatTracker';
import './types/applications/sidebarTabs/compendiumDirectory';
import './types/applications/sidebarTabs/settings';

import './types/applications/sidebarTabs/sidebarDirectory';
import './types/applications/sidebarTabs/sidebarDirectories/actorDirectory';
import './types/applications/sidebarTabs/sidebarDirectories/itemDirectory';
import './types/applications/sidebarTabs/sidebarDirectories/journalDirectory';
import './types/applications/sidebarTabs/sidebarDirectories/macroDirectory';
import './types/applications/sidebarTabs/sidebarDirectories/playlistDirectory';
import './types/applications/sidebarTabs/sidebarDirectories/rollTableDirectory';
import './types/applications/sidebarTabs/sidebarDirectories/sceneDirectory';

// Augments

import './types/augments/howler';
import './types/augments/tinyMCE';

// Core

import './types/core/audioHelper';
import './types/core/config';
import './types/core/fonts';
import './types/core/gameTime';
import './types/core/handlebarsHelpers';
import './types/core/hooks';
import './types/core/imageHelper';
import './types/core/keyboardManager';
import './types/core/setupConfiguration';
import './types/core/socketInterface';
import './types/core/sortingHelpers';
import './types/core/textEditor';
import './types/core/videoHelper';

// rolls

import './types/core/rolls/dicePool';
import './types/core/rolls/roll';

// dice terms

import './types/core/rolls/diceTerms/coin';
import './types/core/rolls/diceTerms/diceTerm';
import './types/core/rolls/diceTerms/die';
import './types/core/rolls/diceTerms/fateDie';

// settings

import './types/core/settings/clientSettings';
import './types/core/settings/worldSettingsStorage';

// webRTC

import './types/core/webRtc/avMaster';
import './types/core/webRtc/avSettings';

// Framework

import './types/framework/collection';
import './types/framework/compendium';
import './types/framework/entity';
import './types/framework/entityCollection';
import './types/framework/userTargets';

import './types/framework/entities/activeEffect';
import './types/framework/entities/actor';
import './types/framework/entities/chatMessage';
import './types/framework/entities/combat';
import './types/framework/entities/embeddedEntity';
import './types/framework/entities/folder';
import './types/framework/entities/item';
import './types/framework/entities/journal';
import './types/framework/entities/macro';
import './types/framework/entities/playlist';
import './types/framework/entities/rollTable';
import './types/framework/entities/scene';
import './types/framework/entities/user';

// PIXI

import './types/pixi/canvas';
import './types/pixi/canvasLayer';
import './types/pixi/doorControl';
import './types/pixi/lightingLayer';
import './types/pixi/mouseInteractionManager';
import './types/pixi/normalizedRectangle';
import './types/pixi/placeablesLayer';
import './types/pixi/pointSource';
import './types/pixi/preciseText';
import './types/pixi/quadtree';
import './types/pixi/sightLayer';
import './types/pixi/textureLoader';

import './types/pixi/helpers/controlIcon';
import './types/pixi/helpers/ray';
import './types/pixi/helpers/ruler';

import './types/pixi/placeableObjects/ambientLight';
import './types/pixi/placeableObjects/ambientSound';
import './types/pixi/placeableObjects/drawing';
import './types/pixi/placeableObjects/measuredTemplate';
import './types/pixi/placeableObjects/note';
import './types/pixi/placeableObjects/placeableObject';
import './types/pixi/placeableObjects/tile';
import './types/pixi/placeableObjects/token';
import './types/pixi/placeableObjects/wall';

import './types/pixi/shaders/abstractBaseShader';
import './types/pixi/shaders/standardIlluminationShader';
import './types/pixi/shaders/standardColorationShader';
import './types/pixi/shaders/torchIlluminationShader';
import './types/pixi/shaders/torchColorationShader';
import './types/pixi/shaders/pulseIlluminationShader';
import './types/pixi/shaders/pulseColorationShader';
import './types/pixi/shaders/energyFieldColorationShader';
import './types/pixi/shaders/chromaColorationShader';
import './types/pixi/shaders/waveIlluminationShader';
import './types/pixi/shaders/waveColorationShader';
import './types/pixi/shaders/fogColorationShader';
import './types/pixi/shaders/sunburstIlluminationShader';
import './types/pixi/shaders/sunburstColorationShader';
import './types/pixi/shaders/lightDomeColorationShader';
import './types/pixi/shaders/emanationColorationShader';
import './types/pixi/shaders/ghostLightIlluminationShader';
import './types/pixi/shaders/ghostLightColorationShader';
import './types/pixi/shaders/hexaDomeColorationShader';
import './types/pixi/shaders/roilingIlluminationShader';
import './types/pixi/shaders/blackHoleIlluminationShader';

// UI

import './types/ui/activeEffectConfig';
import './types/ui/contextMenu';
import './types/ui/dragDrop';
import './types/ui/draggable';
import './types/ui/notifications';
import './types/ui/searchFilter';
import './types/ui/tabs';

// --

import './types/constants';
import './types/features';
import './types/game';
import './types/handlebars';
import './types/mersenneTwister';
import './types/prototypes';
import './types/templateUtils';
import './types/types';
import './types/utils';
import './types/actorTokenHelpers';

// Utility types

import './types/typesUtils';
