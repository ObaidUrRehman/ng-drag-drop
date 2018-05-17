import {Component} from '@angular/core';
import {DropEvent} from 'ng-drag-drop';

@Component({
  selector: 'demo-app',
  templateUrl: 'app/demo-component.html',
  styles: [`
    div.scroll-list {
      overflow: auto;
      max-height: 70vh;
    }

    .drag-over {
      border: #ff525b dashed 2px;
    }

    .drag-hint {
      border: #ffc100 dashed 2px;
      /*transition: all .2s ease-in-out;*/
      /*transform: scale(1.05);*/
    }

    .drag-hint-scale {
      // border: #ffc100 dashed 2px;
      transition: all .1s ease-in-out;
      transform: scale(1.1);
    }

    .drag-target-border {
      border: #00bfff dashed 2px;
    }

    .drag-target-border-green {
      border: #3c763d dashed 2px;
    }
  `
  ]
})
export class DemoComponent {

  vegetables = [
    {name: 'Carrot', type: 'vegetable'},
    {name: 'Onion', type: 'vegetable'},
    {name: 'Potato', type: 'vegetable'},
    {name: 'Capsicum', type: 'vegetable'}];

  fruits = [
    {name: 'Apple', type: 'fruit'},
    {name: 'Orange', type: 'fruit'},
    {name: 'Mango', type: 'fruit'},
    {name: 'Banana', type: 'fruit'}];

  list1 = [
    {name: 'Toyota'},
    {name: 'Bugati'},
    {name: 'Suzuki'}
  ];

  list2 = [
    {name: 'Mercedes'},
    {name: 'Honda'},
    {name: 'BMW'}
  ];

  deleteItems = [
    {name: 'Angular2'},
    {name: 'AngularJS'},
    {name: 'Vue'},
    {name: 'ReactJS'},
    {name: 'Backbone'}
  ];

  droppedFruits = [];
  droppedVegetables = [];
  droppedItems = [];
  fruitDropEnabled = true;
  dragEnabled = true;

  onFruitDrop(e: DropEvent) {
    this.droppedFruits.push(e.dragData);
    this.removeItem(e.dragData, this.fruits);
  }

  onVegetableDrop(e: DropEvent) {
    this.droppedVegetables.push(e.dragData);
    this.removeItem(e.dragData, this.vegetables);
  }

  onAnyDrop(e: DropEvent) {
    this.droppedItems.push(e.dragData);

    if (e.dragData.type === 'vegetable') {
      this.removeItem(e.dragData, this.vegetables);
    }
    else {
      this.removeItem(e.dragData, this.fruits);
    }
  }

  onList1Drop(e: DropEvent) {
    this.list1.push(e.dragData);
    this.removeItem(e.dragData, this.list2)
  }

  onList2Drop(e: DropEvent) {
    this.list2.push(e.dragData);
    this.removeItem(e.dragData, this.list1)
  }

  onDeleteDrop(e: DropEvent) {
    this.removeItem(e.dragData, this.deleteItems);
  }

  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
  }
}
