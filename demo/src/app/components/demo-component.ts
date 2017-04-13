import {Component} from '@angular/core';

@Component({
  selector: 'demo-app',
  templateUrl: 'app/components/demo-component.html',
  styles: [`
    div.scroll-list {
      overflow: auto;
      max-height: 70vh;
    }

    .drag-over-border {
      border: #ff525b dashed 2px;
    }

    .drag-hint-border {
      border: #ffc100 dashed 2px;
      /*transition: all .2s ease-in-out;*/
      /*transform: scale(1.05);*/
    }

    .drag-target-border {
      border: #00bfff dashed 2px;
    }

    .drag-target-border-green {
      border: #3c763d dashed 2px;
      
    }
    
    .drag-handle {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
    }

    .drag-handle:active { 
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
    }
  `
  ]
})
export class DemoComponent {

  vegetables = [
    {name: "Carrot", type: "vegetable"},
    {name: "Onion", type: "vegetable"},
    {name: "Potato", type: "vegetable"},
    {name: "Capsicum", type: "vegetable"}];

  fruits = [
    {name: "Apple", type: "fruit"},
    {name: "Orange", type: "fruit"},
    {name: "Mango", type: "fruit"},
    {name: "Banana", type: "fruit"},
    {name: "Pear", type: "fruit"}];

  list1 = [
    {name: 'Toyota'},
    {name: 'Bugati'},
    {name: 'Suzuki'},
    {name: 'Honda'},
    {name: 'BMW'}
  ];

  list2 = [
    {name: 'Mercedes'},
  ];

  droppedFruits = [];
  droppedVegetables = [];
  droppedItems = [];

  onFruitDrop(e: any) {
    this.droppedFruits.push(e.dragData);
    this.removeItem(e.dragData, this.fruits);
  }

  onVegetableDrop(e: any) {
    this.droppedVegetables.push(e.dragData);
    this.removeItem(e.dragData, this.vegetables);
  }

  onAnyDrop(e: any) {
    this.droppedItems.push(e.dragData);

    if (e.dragData.type === 'vegetable')
      this.removeItem(e.dragData, this.vegetables);
    else
      this.removeItem(e.dragData, this.fruits);
  }

  onList1Drop(e: any) {
    this.list1.push(e.dragData);
    this.removeItem(e.dragData, this.list2)
  }

  onList2Drop(e: any) {
    this.list2.push(e.dragData);
    this.removeItem(e.dragData, this.list1)
  }

  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
  }
}
