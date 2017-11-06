import {Component} from '@angular/core';
import {DropEvent} from 'ng-drag-drop';

@Component({
  selector: 'delete-item',
  templateUrl: 'app/delete-item/delete-item.component.html',
  styles: [`
    div.scroll-list {
      overflow: auto;
      max-height: 70vh;
    }

    .drag-hint-scale {
      // border: #ffc100 dashed 2px;
      transition: all .1s ease-in-out;
      transform: scale(1.1);
    }
  `
  ]
})
export class DeleteItemComponent {

  deleteItems = [
    {name: 'Angular2'},
    {name: 'AngularJS'},
    {name: 'Vue'},
    {name: 'ReactJS'},
    {name: 'Backbone'}
  ];

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
