import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Ng2DragDropService } from '../services/ng2-drag-drop.service';
import { DomHelper } from '../shared/dom-helper';

@Directive({
    selector: '[draggable]',
    host: {
        '[draggable]': 'true'
    }
})
/**
 * Makes an element draggable by adding the draggable html attribute
 */
export class Draggable implements OnInit {
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
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    @Input() dragClass = 'drag-border';

    /**
     * The url to image that will be used as custom drag image when the draggable is being dragged.
     */
    @Input() dragImage: string;

    /**
     * Defines if drag is enabled. `true` by default.
     */
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
    mouseOverElement: any;

    /**
     * @private
     * Backing field for the dragEnabled property
     */
    _dragEnabled = true;


    constructor(protected el: ElementRef, private ng2DragDropService: Ng2DragDropService) {
    }

    ngOnInit() {
        this.applyDragHandleClass();
    }

    @HostListener('dragstart', ['$event'])
    dragStart(e) {
        if (this.allowDrag()) {
            DomHelper.addClass(this.el, this.dragClass);

            this.ng2DragDropService.dragData = this.dragData;
            this.ng2DragDropService.scope = this.dragScope;

            // Firefox requires setData() to be called otherwise the drag does not work.
            // We don't use setData() to transfer data anymore so this is just a dummy call.
            if (e.dataTransfer != null) {
                e.dataTransfer.setData('text', '');
            }

            // Set dragImage
            if (this.dragImage) {
                let img: HTMLImageElement = document.createElement('img');
                img.src = this.dragImage;
                e.dataTransfer.setDragImage(img, 0, 0);
            }

            e.stopPropagation();
            this.onDragStart.emit(e);
            this.ng2DragDropService.onDragStart.next();
        } else {
            e.preventDefault();
        }
    }

    @HostListener('drag', ['$event'])
    drag(e) {
        this.onDrag.emit(e);
    }

    @HostListener('dragend', ['$event'])
    dragEnd(e) {
        DomHelper.removeClass(this.el, this.dragClass);
        this.ng2DragDropService.onDragEnd.next();
        this.onDragEnd.emit(e);
        e.stopPropagation();
        e.preventDefault();
    }

    @HostListener('mouseover', ['$event'])
    mouseover(e) {
        this.mouseOverElement = e.target;
    }

    private allowDrag() {
        if (this.dragHandle) {
            return DomHelper.matches(this.mouseOverElement, this.dragHandle) && this.dragEnabled;
        } else {
            return this.dragEnabled;
        }
    }

    private applyDragHandleClass() {
        let dragElement = this.getDragHandleElement();
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
}
