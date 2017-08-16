import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Ng2SortableService } from '../services/ng2-drag-drop.service';

@Directive({
    'selector': '[sortable-container]'
})
export class SortableContainer {
    /**
     * The items that can be sorted
     */
    @Input() sortableItems: Array<any>;

    /**
     * Delete items on swap
     */
    @Input() deleteOnSwap = true;

    /**
     * Event fired when item is dragged to another list
     */
    @Output() onSwap: EventEmitter<any> = new EventEmitter();

    constructor(private sortableService: Ng2SortableService) {

    }

    @HostListener('dragleave', ['$event'])
    dragLeave(e) {
        e.preventDefault();
    }

    @HostListener('dragover', ['$event'])
    dragOver(e) {
        e.preventDefault();
    }

    @HostListener('drop', ['$event'])
    drop(e) {
        this.sortableService.sortableItems = [];
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(e) {
        if (this.sortableService.sortableItems.length) {
            let item = this.sortableService.dragItem;

            // If item does not exist. Mostly used for swap list
            if (item && this.sortableItems.indexOf(item) === -1) {

                if (this.deleteOnSwap) {
                    // Remove from previous list
                    let previousListIndex = this.sortableService.sortableItems.indexOf(item);
                    this.sortableService.sortableItems.splice(previousListIndex, 1);
                }

                // Add in current list
                this.sortableItems.splice(0, 0, item);

                // Update sort index where the item is added.
                this.sortableService.sortIndex = 0;

                // Swapped Item is emitted back
                this.onSwap.emit(item);
            }
        }

        this.sortableService.sortableItems = this.sortableItems;
        console.log('DragEnter', 'Container');
    }
}
