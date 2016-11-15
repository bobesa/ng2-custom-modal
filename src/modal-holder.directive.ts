import {
    EventEmitter,
    Output,
    Directive,
    OnDestroy,
    OnInit
} from '@angular/core';
import {ModalHelperService} from './modal-helper.service';
import {Modal} from './modal.directive';

import {Subscription} from 'rxjs';

/**
 * Used for providing events on top of Modal state in service
 */
@Directive({
    selector: '[modal-holder],[modalHolder]'
})
export class ModalHolder implements OnInit, OnDestroy {
    @Output() private onShow: EventEmitter<Modal> = new EventEmitter();
    @Output() private onClose: EventEmitter<Modal> = new EventEmitter();
    @Output() private onBeforeClose: EventEmitter<Modal> = new EventEmitter();

    private subscription: Subscription;
    private modal: Modal = null;

    constructor(private modalService: ModalHelperService) {}

    ngOnInit() {
        // Subscribe to modal changes
        this.subscription = this.modalService.changes.subscribe(modal => {
            if (modal != null) {
                this.modal = modal;
                this.onShow.emit(this.modal);
                modal.onClosing.subscribe(() => this.onBeforeClose.emit(this.modal));
            } else {
                this.onClose.emit(this.modal);
                this.modal = null;
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
