import {
    EventEmitter,
    Input,
    Renderer,
    Directive,
    TemplateRef,
    EmbeddedViewRef,
    ViewContainerRef,
} from '@angular/core';

import {ModalHelperService} from './modal-helper.service';

// Defines how long does it take to remove it after closing
export const MODAL_CLOSING_DELAY = 300;

/**
 * Helper class used to deliver various attributes & data (which is passed to template)
 */
export class Modal {
    private _directive: ModalDirective;
    private _closing: boolean = false;

    public onClosing: EventEmitter<any> = new EventEmitter();

    constructor(public data: any) {}

    get isClosable(): boolean {
        return true;
    }

    get directive(): ModalDirective {
        return this._directive;
    }
    set directive(directive: ModalDirective) {
        this._directive = directive;
    }

    get closing(): boolean {
        return this._closing;
    }
    set closing(val: boolean) {
        this._closing = val;
    }

    // Override this method if you want something else to happen
    closeByBackdrop() {
        this.close();
    }

    close() {
        if (!!this.directive) {
            this.directive.close();
        }
    }
}

export class NonClosableModal extends Modal {
    constructor(data: any) {
        super(data);
    }

    get isClosable(): boolean {
        return false;
    }

    close() {
        // Does not do anything
    }
}

/**
 * Directive used to display modals and still use templating system
 *
 * Use in templates:
 * <div *modal="let internalProperty from someValue">...</div>
 *
 * Additional properties passed:
 * let closeFunc = close // Used for closing the modal on demand from template, just call closeFunc()
 * let modalInstance = modal // Actual instance of Modal class
 *
 * :internalProperty is name you choose inside of the <element> block
 * can be used same way as in *ngFor for example
 * Note: Don't forget the use `let` keyword before the name of property
 *
 * :someValue is property that can be set from anywhere (code, events...)
 * this property should be Modal class, but can be anything (and will be transformed to Modal)
 */
@Directive({
    selector: '[modal],[modalFrom]'
})
export class ModalDirective {
    private view: EmbeddedViewRef<any> = null;
    private values: any = {};

    constructor(
        private modalService: ModalHelperService,
        public renderer: Renderer,
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>
    ) {}

    close() {
        const modal: Modal = this.values['modal'];
        if (!!modal && !modal.closing) {
            modal.closing = true;
            modal.onClosing.emit();
            setTimeout(() => {
                this.modalService.dismiss(modal);
                this.modalService.rootViewContainer.clear();
                this.view = null;
            }, MODAL_CLOSING_DELAY);
        }
    }

    @Input() set modalFrom(modal: any) {
        if (typeof modal !== 'undefined' && modal != null) {
            // Check if view is created
            // If not create a new one
            if (!(this.view !== undefined && this.view !== null)) {
                this.view = this.modalService.rootViewContainer.createEmbeddedView(this.templateRef, this.values);
            }

            // Check if value is Modal class
            // transform if not
            if (!(modal instanceof Modal)) {
                modal = new Modal(modal);
            }
            modal.directive = this;

            // Set template variable
            this.values['$implicit'] = modal.data;
            this.values['modal'] = modal;
            this.values['close'] = () => { this.close(); };

            // Reset styling for the dom
            const viewDom = this.view.rootNodes[0];
            const r = this.renderer;
            // TODO: @Dave add classes for the modal here
            // r.setElementClass(viewDom, 'modal', true);

            // Add this instance to modal
            this.modalService.show(modal);
        } else {
            this.close();
        }
    }
}
