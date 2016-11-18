import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModalHelperService} from './modal-helper.service';

/**
 * Works as an anchor for displaying the Modals
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
