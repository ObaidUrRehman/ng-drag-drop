import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
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
export class Draggable {
    /**
     * The data that will be avaliable to the droppable directive on its `onDrop()` event.
     */
    @Input() dragData;

    /**
     * The selector that defines the drag Handle. If defined drag will only be allowed if dragged from the selector element.
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
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    @Input() dragClass: string;

    /**
     * The url to image that will be used as custom drag image when the draggable is being dragged.
     */
    @Input() dragImage: string;

    /**
     * Defines if drag is enabled. `true` by default.
     */
    @Input() dragEnabled = true;

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


    constructor(protected el: ElementRef, private ng2DragDropService: Ng2DragDropService) {
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
}
