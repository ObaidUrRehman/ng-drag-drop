import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, HostBinding, Renderer2, NgZone, OnDestroy } from '@angular/core';
import { NgDragDropService } from '../services/ng-drag-drop.service';
import { DomHelper } from '../shared/dom-helper';

@Directive({
    selector: '[draggable]'
})
/**
 * Makes an element draggable by adding the draggable html attribute
 */
export class Draggable implements OnInit, OnDestroy {
    /**
     * The data that will be avaliable to the droppable directive on its `onDrop()` event.
     */
    @Input() dragData;

    /**
     * The selector that defines the drag Handle.
     * If defined drag will only be allowed if dragged from the selector element.
     */
    @Input() dragHandle: string;

    /**
     * Currently not used
     */
    @Input() dragEffect = 'move';

    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    @Input() dragScope: string | Array<string> = 'default';

    /**
     * The CSS class applied to a draggable element. If a dragHandle is defined then its applied to that handle
     * element only. By default it is used to change the mouse over pointer.
     */
    @Input() dragHandleClass = 'drag-handle';

    /**
     * CSS class applied on the source draggable element while being dragged.
     */
    @Input() dragClass = 'drag-border';

    /**
     * CSS class applied on the drag ghost when being dragged.
     */
    @Input() dragTransitClass = 'drag-transit';

    /**
     * The url to image that will be used as custom drag image when the draggable is being dragged.
     */
    @Input() set dragImage(value: string) {
        this._dragImage = value;
        this.dragImageElement = new Image();
        this.dragImageElement.src = this.dragImage;
    }

    get dragImage() {
        return this._dragImage;
    }

    /**
     * Defines if drag is enabled. `true` by default.
     */
    @HostBinding('draggable')
    @Input() set dragEnabled(value: boolean) {
        this._dragEnabled = value;
        this.applyDragHandleClass();
    };

    get dragEnabled() {
        return this._dragEnabled;
    }

    /**
     * Event fired when Drag is started
     */
    @Output() onDragStart: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired while the element is being dragged
     */
    @Output() onDrag: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when drag ends
     */
    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();

    /**
     * @private
     * Keeps track of mouse over element that is used to determine drag handles
     */
    mouseDownElement: any;

    /**
     * @private
     * Backing field for the dragEnabled property
     */
    _dragEnabled = true;

    /**
     * @private
     * Backing field for the dragImage property
     */
    _dragImage: string;

    /**
     * @private
     * Image element for the dragImage
     */
    dragImageElement: HTMLImageElement;

    /**
     * @private
     * Function for unbinding the drag listener
     */
    unbindDragListener: Function;

    constructor(protected el: ElementRef, private renderer: Renderer2,
        private ng2DragDropService: NgDragDropService, private zone: NgZone) {
    }

    ngOnInit() {
        this.applyDragHandleClass();
    }

    ngOnDestroy() {
        this.unbindDragListeners();
    }

    @HostListener('dragstart', ['$event'])
    dragStart(e) {
        if (this.allowDrag()) {

            // This is a kludgy approach to apply CSS to the drag helper element when an image is being dragged.
            DomHelper.addClass(this.el, this.dragTransitClass);
            setTimeout(() => {
                DomHelper.addClass(this.el, this.dragClass);
                DomHelper.removeClass(this.el, this.dragTransitClass);
            }, 10);

            this.ng2DragDropService.dragData = this.dragData;
            this.ng2DragDropService.scope = this.dragScope;

            // Firefox requires setData() to be called otherwise the drag does not work.
            // We don't use setData() to transfer data anymore so this is just a dummy call.
            if (e.dataTransfer != null) {
                e.dataTransfer.setData('text', '');
            }

            // Set dragImage
            if (this.dragImage) {
                e.dataTransfer.setDragImage(this.dragImageElement, 0, 0);
            }

            e.stopPropagation();
            this.onDragStart.emit(e);
            this.ng2DragDropService.onDragStart.next();

            this.zone.runOutsideAngular(() => {
                this.unbindDragListener = this.renderer.listen(this.el.nativeElement, 'drag', (dragEvent) => {
                    this.drag(dragEvent);
                });
            });
        } else {
            e.preventDefault();
        }
    }

    drag(e) {
        this.onDrag.emit(e);
    }

    @HostListener('dragend', ['$event'])
    dragEnd(e) {
        this.unbindDragListeners();
        DomHelper.removeClass(this.el, this.dragClass);
        this.ng2DragDropService.onDragEnd.next();
        this.onDragEnd.emit(e);
        e.stopPropagation();
        e.preventDefault();
    }

    @HostListener('mousedown', ['$event'])
    @HostListener('touchstart', ['$event'])
    mousedown(e) {
        this.mouseDownElement = e.target;
    }

    private allowDrag() {
        if (this.dragHandle) {
            return DomHelper.matches(this.mouseDownElement, this.dragHandle) && this.dragEnabled;
        } else {
            return this.dragEnabled;
        }
    }

    private applyDragHandleClass() {
        let dragElement = this.getDragHandleElement();

        if (!dragElement) {
            return;
        }

        if (this.dragEnabled) {
            DomHelper.addClass(dragElement, this.dragHandleClass);
        } else {
            DomHelper.removeClass(this.el, this.dragHandleClass);
        }
    }

    private getDragHandleElement() {
        let dragElement = this.el;
        if (this.dragHandle) {
            dragElement = this.el.nativeElement.querySelector(this.dragHandle);
        }

        return dragElement;
    }

    unbindDragListeners() {
        if (this.unbindDragListener) {
            this.unbindDragListener();
        }
    }
}
