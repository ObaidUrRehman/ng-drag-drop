import { EventEmitter } from '@angular/core';
export declare class Draggable {
    dragData: any;
    dragEffect: string;
    dragScope: string;
    dragOverClass: string;
    onDragStart: EventEmitter<any>;
    onDrag: EventEmitter<any>;
    onDragEnd: EventEmitter<any>;
    dragStart(e: any): void;
    drag(e: any): void;
    dragEnd(e: any): void;
}
