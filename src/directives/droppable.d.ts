import { ElementRef, EventEmitter } from '@angular/core';
import { DropEvent } from "../shared/drop-event.model";
export declare class Droppable {
    protected el: ElementRef;
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
    dropScope: string;
    constructor(el: ElementRef);
    dragEnter(e: any): void;
    dragOver(e: any): void;
    dragLeave(e: any): void;
    drop(e: any): void;
    allowDrop(e: any): boolean;
}
