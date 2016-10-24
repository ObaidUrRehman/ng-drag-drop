import {Directive, ElementRef, HostListener, Input, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: '[draggable]',
    host: {
        '[draggable]': 'true'
    }
})
export class Draggable {
    @Input() dragData;
    @Input() dragEffect = 'move';
    @Input() dragScope: string = 'default';
    @Input() dragOverClass: string;

    @Output() onDragStart: EventEmitter<any> = new EventEmitter();
    @Output() onDrag: EventEmitter<any> = new EventEmitter();
    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();


    @HostListener('dragstart', ['$event'])
    dragStart(e) {
        e.target.classList.add(this.dragOverClass);
        e.dataTransfer.setData('application/json', JSON.stringify(this.dragData));
        e.dataTransfer.setData(this.dragScope, this.dragScope);
        e.stopPropagation();
        this.onDragStart.emit(e);
    }

    @HostListener('drag', ['$event'])
    drag(e) {
        this.onDrag.emit(e)
    }

    @HostListener('dragend', ['$event'])
    dragEnd(e) {
        e.target.classList.remove(this.dragOverClass);
        this.onDragEnd.emit(e);
        e.stopPropagation();
        e.preventDefault();
    }
}
