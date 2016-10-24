import {Directive, ElementRef, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {DropEvent} from "../shared/drop-event.model";

@Directive({
    selector: '[droppable]',
    host: {
        '[draggable]': 'true'
    }
})
export class Droppable {

    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
    @Output() onDragOver: EventEmitter<any> = new EventEmitter();
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();
    @Output() onDrop: EventEmitter<DropEvent> = new EventEmitter();

    @Input() dragOverClass: string;
    @Input() dropScope: string = 'default';

    constructor(protected el: ElementRef) {
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(e) {
        event.preventDefault();
        event.stopPropagation();
        this.onDragEnter.emit(e);
    }

    @HostListener('dragover', ['$event'])
    dragOver(e) {
        if (this.allowDrop(e)) {
            e.target.classList.add(this.dragOverClass);
            e.preventDefault();
            this.onDragOver.emit(e);
        }
    }

    @HostListener('dragleave', ['$event'])
    dragLeave(e) {
        e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        this.onDragLeave.emit(e);
    }

    @HostListener('drop', ['$event'])
    drop(e) {
        e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        e.stopPropagation();
        let data;
        try {
            data = JSON.parse(e.dataTransfer.getData('application/json'));
        } catch (e) {
            data = e;
        }
        this.onDrop.emit(new DropEvent(e, data));
    }

    allowDrop(e): boolean {
        let allow = false;
        let types = e.dataTransfer.types;
        if (types && types.length) {
            for (let i = 0; i < types.length; i++) {
                if (types[i] == this.dropScope) {
                    allow = true;
                    break;
                }
            }
        }
        return allow;
    }
}
