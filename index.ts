export * from './src/modal.directive';
export * from './src/modal-content.component';
export * from './src/modal-helper.service';
export * from './src/modal-holder.directive';

import { ModalDirective } from './src/modal.directive';
import { ModalContent } from './src/modal-content.component';
import { ModalHolder } from './src/modal-holder.directive';

export const MODAL_DECLARATIONS = [
    ModalDirective,
    ModalContent,
    ModalHolder,
];

import { ModalHelperService } from './src/modal-helper.service';

export const MODAL_PROVIDERS = [
    ModalHelperService
];
