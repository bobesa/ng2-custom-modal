import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModalHelperService} from './modal-helper.service';

/**
 * Used for showing overlay/backdrop behind the Modal(s)
 *
 * When clicked should call close() on top-most modal
 */
@Component({
    selector: 'modal-content',
    template: ''
})
export class ModalContent implements OnInit {

    constructor(
        private viewContainer: ViewContainerRef,
        private modalService: ModalHelperService
    ) {}

    ngOnInit() {
        // Set root container on service
        this.modalService.rootViewContainer = this.viewContainer;
    }
}
