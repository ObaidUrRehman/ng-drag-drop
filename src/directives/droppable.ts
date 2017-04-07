import {Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {DropEvent} from "../shared/drop-event.model";
import {Ng2DragDropService} from "../services/ng2-drag-drop.service";
import {Utils} from "../shared/utils";

@Directive({
    selector: '[droppable]'
})
export class Droppable implements OnInit {

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
     * CSS class that is applied when a compatible draggable is being dragged over this droppable.
     */
    @Input() dragOverClass: string;

    /**
     * CSS class applied on this droppable when a compatible draggable item is being dragged.
     * This can be used to visually show allowed drop zones.
     */
    @Input() dragHintClass: string;

    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    @Input() dropScope: string | Array<string> = 'default';

    constructor(protected el: ElementRef, private ng2DragDropService: Ng2DragDropService) {
    }

    ngOnInit() {
        this.ng2DragDropService.onDragStart.subscribe(() => {
            console.log("DragStart Fired");
            if (this.allowDrop()) {
                Utils.addClass(this.el, this.dragHintClass);
            }
        });

        this.ng2DragDropService.onDragEnd.subscribe(() => {
            Utils.removeClass(this.el, this.dragHintClass);
        });
    }

    ngOnDestroy() {
        this.ng2DragDropService.onDragStart.unsubscribe();
        this.ng2DragDropService.onDragEnd.unsubscribe();
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        this.onDragEnter.emit(e);
    }

    @HostListener('dragover', ['$event'])
    dragOver(e) {
        if (this.allowDrop()) {
            Utils.addClass(this.el, this.dragOverClass);
            e.preventDefault();
            this.onDragOver.emit(e);
        }
    }

    @HostListener('dragleave', ['$event'])
    dragLeave(e) {
        Utils.removeClass(this.el, this.dragOverClass);
        e.preventDefault();
        this.onDragLeave.emit(e);
    }

    @HostListener('drop', ['$event'])
    drop(e) {
        Utils.removeClass(this.el, this.dragOverClass);
        e.preventDefault();
        e.stopPropagation();

        this.ng2DragDropService.onDragEnd.next();
        this.onDrop.emit(new DropEvent(e, this.ng2DragDropService.dragData));
    }

    allowDrop(): boolean {
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
                        function (item) {
                            return this.ng2DragDropService.scope.indexOf(item) !== -1;
                        }).length > 0;
        }

        return allowed;
    }
}
