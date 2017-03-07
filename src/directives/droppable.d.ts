import { ElementRef, EventEmitter } from '@angular/core';
import { DropEvent } from "../shared/drop-event.model";
import { Ng2DragDropService } from "../services/ng2-drag-drop.service";
export declare class Droppable {
    protected el: ElementRef;
    private ng2DragDropService;
    /**
     *  Event fired when Drag dragged element enters a valid drop target.
     */
    onDragEnter: EventEmitter<any>;
    /**
     * Event fired when an element is being dragged over a valid drop target
     */
    onDragOver: EventEmitter<any>;
    /**
     * Event fired when a dragged element leaves a valid drop target.
     */
    onDragLeave: EventEmitter<any>;
    /**
     * Event fired when an element is dropped on a valid drop target.
     */
    onDrop: EventEmitter<DropEvent>;
    /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    dragOverClass: string;
    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    dropScope: string | Array<string>;
    constructor(el: ElementRef, ng2DragDropService: Ng2DragDropService);
    dragEnter(e: any): void;
    dragOver(e: any): void;
    dragLeave(e: any): void;
    drop(e: any): void;
    allowDrop(e: any): boolean;
}
