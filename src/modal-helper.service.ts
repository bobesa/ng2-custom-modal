import {Injectable, ViewContainerRef} from '@angular/core';
import {Modal} from './modal.directive';

import * as Rx from 'rxjs';

/**
 * Handles Modal queue and provides viewController based on ModalContent
 */
@Injectable()
export class ModalHelperService {
    private _current: Modal = null;
    private changes$: Rx.Observable<Modal>;
    private changesObserver: Rx.Observer<Modal>;
    public rootViewContainer: ViewContainerRef;

    constructor() {
        this.changes$ = Rx.Observable.create(observer => {
            this.changesObserver = observer;
            this.changesObserver.next(this._current);
            return () => this.changesObserver = null;
        }).share();
    }

    get current(): Modal {
        return this._current;
    }

    get changes(): Rx.Observable<Modal> {
        return this.changes$;
    }

    closeTopMost() {
        if (!!this._current) {
            this._current.closeByBackdrop();
        }
    }

    show(modal: Modal) {
        this._current = modal;
        if (!!this.changesObserver) this.changesObserver.next(this._current);
    }

    dismiss(modal: Modal) {
        if (!!this._current) {
            this._current = null;
            if (!!this.changesObserver) this.changesObserver.next(this._current);
        }
    }
}
