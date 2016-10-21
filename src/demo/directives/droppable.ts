/**
 * Created by orehman on 9/20/2016.
 */

import {Directive, ElementRef, HostListener, Input, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: '[droppable]',
    host: {
        '[draggable]': 'true'
    }
})
export class Droppable {

    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();
    @Output() onDrop: EventEmitter<any> = new EventEmitter();
    @Output() onDragOver: EventEmitter<any> = new EventEmitter();

    @Input() dragOverClass = 'tree-editor-drag-over';


    /**
     * This is the scope that determines if drop is allowed.
     * To allow drop the draggable scope must match the droppable scope
     */
    @Input() dropScope: string = 'default';

    constructor(protected el: ElementRef) {
    }

    @HostListener('drop', ['$event'])
    drop(e) {
        e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        e.stopPropagation();
        let data = JSON.parse(e.dataTransfer.getData('application/json'));
        this.onDrop.emit({e: e, data: data});
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(event) {
        event.preventDefault();
        event.stopPropagation();
        this.onDragEnter.emit(event);
    }

    @HostListener('dragleave', ['$event'])
    dragLeave(e) {
        e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        this.onDragLeave.emit(e);
    }

    @HostListener('dragover', ['$event'])
    dragOver(e) {
        if (this.allowDrop(e)) {
            e.target.classList.add(this.dragOverClass);
            e.preventDefault();
            this.onDragOver.emit(e);
        }
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
