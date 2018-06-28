import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Ng2SortableService } from '../services/ng-drag-drop.service';
import { DomHelper} from '../shared/dom-helper';
import { SortableContainer } from './sortable-container.directive';

@Directive({
    selector: '[sortable]',
    host: {
        '[draggable]': 'true'
    }
})
export class Sortable implements OnInit {
    /**
     * Index of the item in the list.
     */
    @Input() sortIndex;

    /**
     * The drag item that can be sorted
     */
    @Input() sortItem: any;

    /**
     * The selector that defines the drag Handle.
     * If defined drag will only be allowed if dragged from the selector element.
     */
    @Input() dragHandle: string;

    /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    @Input() dragClass = 'drag-border';

    /**
     * CSS class that is applied when an item is being dragged over this sortable.
     */
    @Input() dragOverClass = 'drag-over-expand';

    /**
     * The CSS class applied to a draggable element. If a dragHandle is defined then its applied to that handle
     * element only. By default it is used to change the mouse over pointer.
     */
    @Input() dragHandleClass = 'drag-handle';

    /**
     * Defines if drag is enabled. `true` by default.
     */
    @Input()
    set dragEnabled(value: boolean) {
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

    constructor(
        protected el: ElementRef,
        private ng2SortableService: Ng2SortableService,
        private sortableContainer: SortableContainer) {
    }

    ngOnInit() {
        this.applyDragHandleClass();
    }

    @HostListener('dragstart', ['$event'])
    dragStart(e) {
        if (this.allowDrag()) {
            DomHelper.addClass(this.el, this.dragClass);
            this.ng2SortableService.sortIndex = this.sortIndex;
            this.ng2SortableService.dragItem = this.sortItem;

            if (this.sortableContainer) {
                this.ng2SortableService.sortableItems = this.sortableContainer.sortableItems;
            }

            // Firefox requires setData() to be called otherwise the drag does not work.
            // We don't use setData() to transfer data anymore so this is just a dummy call.
            if (e.dataTransfer != null) {
                e.dataTransfer.setData('text', '');
            }
            e.stopPropagation();
            this.onDragStart.emit(e);
        } else {
            e.preventDefault();
        }
    }

    @HostListener('drag', ['$event'])
    drag(e) {
        this.onDrag.emit(e);
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(e) {
        if (this.ng2SortableService.sortableItems.length && this.ng2SortableService.sortIndex != null && this.ng2SortableService.dragItem != null &&
            this.sortIndex !== this.ng2SortableService.sortIndex) {
            let sortItem = this.ng2SortableService.sortableItems[this.ng2SortableService.sortIndex];

            // Remove item
            let previousIndex = this.ng2SortableService.sortableItems.indexOf(this.ng2SortableService.dragItem);
            this.ng2SortableService.sortableItems.splice(previousIndex, 1);

            // Add item
            this.ng2SortableService.sortableItems.splice(this.sortIndex, 0, sortItem);

            // Update index
            this.ng2SortableService.sortIndex = this.sortIndex;
        }
        e.preventDefault();

        // DomHelper.addClass(this.el, this.dragOverClass);
    }

    @HostListener('dragleave', ['$event'])
    dragLeave(e) {
        DomHelper.removeClass(this.el, this.dragOverClass);
        e.preventDefault();
    }

    @HostListener('dragend', ['$event'])
    dragEnd(e) {
        DomHelper.removeClass(this.el, this.dragClass);
        DomHelper.removeClass(this.el, this.dragOverClass);
        this.onDragEnd.emit(e);
        e.stopPropagation();
        e.preventDefault();
    }

    @HostListener('mousedown', ['$event'])
    @HostListener('touchstart', ['$event'])
    mouseover(e) {
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
