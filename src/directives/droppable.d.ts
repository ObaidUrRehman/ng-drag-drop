import { ElementRef, EventEmitter } from '@angular/core';
import { DropEvent } from "../shared/drop-event.model";
export declare class Droppable {
    protected el: ElementRef;
    onDragEnter: EventEmitter<any>;
    onDragOver: EventEmitter<any>;
    onDragLeave: EventEmitter<any>;
    onDrop: EventEmitter<DropEvent>;
    dragOverClass: string;
    dropScope: string;
    constructor(el: ElementRef);
    dragEnter(e: any): void;
    dragOver(e: any): void;
    dragLeave(e: any): void;
    drop(e: any): void;
    allowDrop(e: any): boolean;
}
