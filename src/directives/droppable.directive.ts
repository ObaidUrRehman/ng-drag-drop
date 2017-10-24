import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DropEvent } from '../shared/drop-event.model';
import { NgDragDropService } from '../services/ng-drag-drop.service';
import { DomHelper } from '../shared/dom-helper';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

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
     * Field for tracking drag state. Helps when
     * drag stop event occurs before the allowDrop()
     * can be calculated (async).
     */
    _isDragActive = false;

    /**
     * @private
     * Field for tracking if service is subscribed.
     * Avoids creating multiple subscriptions of service.
     */
    _isServiceActive = false;

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
        private ng2DragDropService: NgDragDropService, private zone: NgZone) {
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

    dragOver(e, result) {
        if (result) {
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

    allowDrop(): Observable<boolean> {
        let allowed: boolean | Observable<boolean> = false;

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
            if (allowed instanceof Observable) {
                return allowed.map(result => result && this.dropEnabled);
            }
        }

        /* tslint:enable:curly */
        /* tslint:disable:one-line */

        return Observable.of(allowed && this.dropEnabled);
    }

    subscribeService() {
        if (this._isServiceActive === true) {
            return;
        }
        this._isServiceActive = true;
        this.dragStartSubscription = this.ng2DragDropService.onDragStart.subscribe(() => {
            this._isDragActive = true;
            this.allowDrop().subscribe(result => {
                if (result && this._isDragActive) {
                    DomHelper.addClass(this.el, this.dragHintClass);

                    this.zone.runOutsideAngular(() => {
                        this.unbindDragEnterListener = this.renderer.listen(this.el.nativeElement, 'dragenter', (dragEvent) => {
                            this.dragEnter(dragEvent);
                        });
                        this.unbindDragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', (dragEvent) => {
                            this.dragOver(dragEvent, result);
                        });
                        this.unbindDragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', (dragEvent) => {
                            this.dragLeave(dragEvent);
                        });
                    });
                }
            });
        });

        this.dragEndSubscription = this.ng2DragDropService.onDragEnd.subscribe(() => {
            this._isDragActive = false;
            DomHelper.removeClass(this.el, this.dragHintClass);
            this.unbindDragListeners();
        });
    }

    unsubscribeService() {
        this._isServiceActive = false;
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
            this.unbindDragOverListener();
        }
        if (this.unbindDragLeaveListener) {
            this.unbindDragLeaveListener();
        }
    }
}
