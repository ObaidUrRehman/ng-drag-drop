import {Directive, ElementRef, HostListener, Input, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: '[draggable]',
    host: {
        '[draggable]': 'true'
    }
})
/**
 * Makes an element draggable by adding the draggable html attribute
 */
export class Draggable {
    /**
     * The data that will be avaliable to the droppable directive on its `onDrop()` event. 
     */
    @Input() dragData;

    /**
     * Currently not used
     */
    @Input() dragEffect = 'move';

    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    @Input() dragScope: string = 'default';

    /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    @Input() dragOverClass: string;

    /**
     * Event fired when Drag is started
     */
    @Output() onDragStart: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired while the element is being dragged
     */
    @Output() onDrag: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when dragged ends
     */
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
