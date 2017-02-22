import {Directive, ElementRef, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {DropEvent} from "../shared/drop-event.model";
import {Ng2DragDropService} from "../services/ng2-drag-drop.service";

@Directive({
    selector: '[droppable]',
    host: {
        '[draggable]': 'false'
    }
})
export class Droppable {

    /**
     *  Event fired when Drag dragged element enters a valid drop target.
     */
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when an element is being dragged over a valid drop target
     */
    @Output() onDragOver: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when a dragged element leaves a valid drop target.
     */
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when an element is dropped on a valid drop target.
     */
    @Output() onDrop: EventEmitter<DropEvent> = new EventEmitter();

    /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    @Input() dragOverClass: string;

    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    @Input() dropScope: string | Array<string> = 'default';

    constructor(protected el: ElementRef, private ng2DragDropService: Ng2DragDropService) {
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        this.onDragEnter.emit(e);
    }

    @HostListener('dragover', ['$event'])
    dragOver(e) {
        if (this.allowDrop(e)) {
            if (e.target.classList != undefined && e.target.classList != null)
                e.target.classList.add(this.dragOverClass);

            e.preventDefault();
            this.onDragOver.emit(e);
        }
    }

    @HostListener('dragleave', ['$event'])
    dragLeave(e) {
        if (e.target.classList != undefined && e.target.classList != null)
            e.target.classList.remove(this.dragOverClass);

        e.preventDefault();
        this.onDragLeave.emit(e);
    }

    @HostListener('drop', ['$event'])
    drop(e) {
        if (e.target.classList != undefined && e.target.classList != null)
            e.target.classList.remove(this.dragOverClass);

        e.preventDefault();
        e.stopPropagation();

        this.onDrop.emit(new DropEvent(e, this.ng2DragDropService.dragData));
    }

    allowDrop(e): boolean {
        let allowed = false;

        if (typeof this.dropScope === "string") {
            if (typeof this.ng2DragDropService.scope === "string")
                allowed = this.ng2DragDropService.scope === this.dropScope;
            else if (this.ng2DragDropService.scope instanceof Array)
                allowed = this.ng2DragDropService.scope.indexOf(this.dropScope) > -1;
        }
        else if (this.dropScope instanceof Array) {
            if (typeof this.ng2DragDropService.scope === "string")
                allowed = this.dropScope.indexOf(this.ng2DragDropService.scope) > -1;
            else if (this.ng2DragDropService.scope instanceof Array)
                allowed = this.dropScope.filter(
                        (item) => {
                            return this.ng2DragDropService.scope.indexOf(item) !== -1;
                        }).length > 0;
        }

        return allowed;
    }
}
