import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DropEvent } from '../shared/drop-event.model';
import { Ng2DragDropService } from '../services/ng2-drag-drop.service';
import { DomHelper } from '../shared/dom-helper';

@Directive({
    selector: '[droppable]'
})
export class Droppable implements OnInit, OnDestroy {

    /**
     *  Event fired when Drag dragged element enters a valid drop target.
     */
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when an element is being dragged over a valid drop target
     */
    @Output() onDragOver: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when a dragged element leaves a valid drop target.
     */
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when an element is dropped on a valid drop target.
     */
    @Output() onDrop: EventEmitter<DropEvent> = new EventEmitter();

    /**
     * CSS class that is applied when a compatible draggable is being dragged over this droppable.
     */
    @Input() dragOverClass = 'drag-over-border';

    /**
     * CSS class applied on this droppable when a compatible draggable item is being dragged.
     * This can be used to visually show allowed drop zones.
     */
    @Input() dragHintClass = 'drag-hint-border';

    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    @Input() dropScope: string | Array<string> | Function  = 'default';

    /**
     * Defines if drop is enabled. `true` by default.
     */
    @Input() set dropEnabled(value: boolean) {
        this._dropEnabled = value;

        if (this._dropEnabled === true) {
            this.subscribeService();
        } else {
            this.unsubscribeService();
        }
    };

    get dropEnabled() {
        return this._dropEnabled;
    }

    /**
     * @private
     */
    dragStartSubscription: Subscription;

    /**
     * @private
     */
    dragEndSubscription: Subscription;

    /**
     * @private
     * Backing field for the dropEnabled property
     */
    _dropEnabled = true;

    /**
     * @private
     * Function for unbinding the drag enter listener
     */
    unbindDragEnterListener: Function;

    /**
     * @private
     * Function for unbinding the drag over listener
     */
    unbindDragOverListener: Function;

    /**
     * @private
     * Function for unbinding the drag leave listener
     */
    unbindDragLeaveListener: Function;

    constructor(protected el: ElementRef, private renderer: Renderer,
        private ng2DragDropService: Ng2DragDropService, private zone: NgZone) {
    }

    ngOnInit() {
        if (this.dropEnabled === true) {
            this.subscribeService();
        }
    }

    ngOnDestroy() {
        this.unsubscribeService();
        this.unbindDragListeners();
    }

    dragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        this.onDragEnter.emit(e);
    }

    dragOver(e) {
        if (this.allowDrop()) {
            DomHelper.addClass(this.el, this.dragOverClass);
            e.preventDefault();
            this.onDragOver.emit(e);
        }
    }

    dragLeave(e) {
        DomHelper.removeClass(this.el, this.dragOverClass);
        e.preventDefault();
        this.onDragLeave.emit(e);
    }

    @HostListener('drop', ['$event'])
    drop(e) {
        DomHelper.removeClass(this.el, this.dragOverClass);
        e.preventDefault();
        e.stopPropagation();

        this.ng2DragDropService.onDragEnd.next();
        this.onDrop.emit(new DropEvent(e, this.ng2DragDropService.dragData));
        this.ng2DragDropService.dragData = null;
        this.ng2DragDropService.scope = null;
    }

    allowDrop(): boolean {
        let allowed = false;

        /* tslint:disable:curly */
        /* tslint:disable:one-line */
        if (typeof this.dropScope === 'string') {
            if (typeof this.ng2DragDropService.scope === 'string')
                allowed = this.ng2DragDropService.scope === this.dropScope;
            else if (this.ng2DragDropService.scope instanceof Array)
                allowed = this.ng2DragDropService.scope.indexOf(this.dropScope) > -1;
        } else if (this.dropScope instanceof Array) {
            if (typeof this.ng2DragDropService.scope === 'string')
                allowed = this.dropScope.indexOf(this.ng2DragDropService.scope) > -1;
            else if (this.ng2DragDropService.scope instanceof Array)
                allowed = this.dropScope.filter(item => {
                    return this.ng2DragDropService.scope.indexOf(item) !== -1;
                }).length > 0;
        } else if (typeof this.dropScope === 'function') {
            allowed = this.dropScope(this.ng2DragDropService.dragData);
        }

        /* tslint:enable:curly */
        /* tslint:disable:one-line */

        return allowed && this.dropEnabled;
    }

    subscribeService() {
        this.dragStartSubscription = this.ng2DragDropService.onDragStart.subscribe(() => {
            if (this.allowDrop()) {
                DomHelper.addClass(this.el, this.dragHintClass);

                this.zone.runOutsideAngular(() => {
                    this.unbindDragEnterListener = this.renderer.listen(this.el.nativeElement, 'dragenter', (dragEvent) => {
                        this.dragEnter(dragEvent);
                    });
                    this.unbindDragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', (dragEvent) => {
                        this.dragOver(dragEvent);
                    });
                    this.unbindDragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', (dragEvent) => {
                        this.dragLeave(dragEvent);
                    });
                });
            }
        });

        this.dragEndSubscription = this.ng2DragDropService.onDragEnd.subscribe(() => {
            DomHelper.removeClass(this.el, this.dragHintClass);
            this.unbindDragListeners();
        });
    }

    unsubscribeService() {
        if (this.dragStartSubscription) {
            this.dragStartSubscription.unsubscribe();
        }
        if (this.dragEndSubscription) {
            this.dragEndSubscription.unsubscribe();
        }
    }

    unbindDragListeners() {
        if (this.unbindDragEnterListener) {
            this.unbindDragEnterListener();
        }
        if (this.unbindDragOverListener) {
            this.unbindDragEnterListener();
        }
        if (this.unbindDragLeaveListener) {
            this.unbindDragEnterListener();
        }
    }
}
