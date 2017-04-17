import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { DropEvent } from "../shared/drop-event.model";
import { Ng2DragDropService } from "../services/ng2-drag-drop.service";
export declare class Droppable implements OnInit {
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
     * CSS class that is applied when a compatible draggable is being dragged over this droppable.
     */
    dragOverClass: string;
    /**
     * CSS class applied on this droppable when a compatible draggable item is being dragged.
     * This can be used to visually show allowed drop zones.
     */
    dragHintClass: string;
    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    dropScope: string | Array<string>;
    /**
     * Defines if drop is enabled. `true` by default.
     */
    dropEnabled: boolean;
    constructor(el: ElementRef, ng2DragDropService: Ng2DragDropService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    dragEnter(e: any): void;
    dragOver(e: any): void;
    dragLeave(e: any): void;
    drop(e: any): void;
    allowDrop(): boolean;
}
