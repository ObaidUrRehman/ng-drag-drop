import { ElementRef, EventEmitter } from '@angular/core';
import { Ng2DragDropService } from "../services/ng2-drag-drop.service";
export declare class Draggable {
    protected el: ElementRef;
    private ng2DragDropService;
    /**
     * The data that will be avaliable to the droppable directive on its `onDrop()` event.
     */
    dragData: any;
    /**
     * The selector that defines the drag Handle. If defined drag will only be allowed if dragged from the selector element.
     */
    dragHandle: string;
    /**
     * Currently not used
     */
    dragEffect: string;
    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    dragScope: string | Array<string>;
    /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    dragOverClass: string;
    /**
     * Event fired when Drag is started
     */
    onDragStart: EventEmitter<any>;
    /**
     * Event fired while the element is being dragged
     */
    onDrag: EventEmitter<any>;
    /**
     * Event fired when drag ends
     */
    onDragEnd: EventEmitter<any>;
    constructor(el: ElementRef, ng2DragDropService: Ng2DragDropService);
    dragStart(e: any): void;
    drag(e: any): void;
    dragEnd(e: any): void;
    mouseover(e: any): void;
    private allowDrag();
}
