import {Component} from '@angular/core';
import {DropEvent} from "../shared/drop-event.model";

@Component({
    selector: 'demo-app',
    templateUrl: 'src/demo/components/demo-component.html',
    styles: [`
    div.scroll-list {
      overflow: auto;
      max-height: 70vh;
    }
    
    .drag-over-border {
      border: #ff525b dashed 2px;
    }
    
    .drag-target-border {
       border: #00bfff dashed 2px;
    }
   `
    ]
})
export class DemoComponent {

    items = [
        {name: "Apple", type: "fruit"},
        {name: "Carrot", type: "vegetable"},
        {name: "Orange", type: "fruit"},
        {name: "Mango", type: "fruit"},
        {name: "Onion", type: "vegetable"},
        {name: "Potato", type: "vegetable"},
        {name: "Banana", type: "fruit"},
        {name: "Guava", type: "fruit"},
        {name: "Pear", type: "fruit"},
        {name: "Capsicum", type: "vegetable"}];

    droppedFruits = [];
    droppedVegetables = [];

    onFruitDrop(e: DropEvent) {
        this.droppedFruits.push(e.dragData);
        this.removeItem(e.dragData);
    }

    onVegetableDrop(e: DropEvent) {
        this.droppedVegetables.push(e.dragData);
        this.removeItem(e.dragData);
    }

    removeItem(item: any) {
        let index = this.items.map((e)=> {
            return e.name
        }) .indexOf(item.name);
        this.items.splice(index, 1);
    }
}
