import {Component} from '@angular/core';
import {DropEvent} from 'ng-drag-drop';

@Component({
  selector: 'default-css',
  templateUrl: 'app/default-css/default-css.component.html',
  styles: []
})
export class DefaultCssComponent {

  list1 = [
    {name: 'Visual Studio Code'},
    {name: 'WebStorm'},
    {name: 'Sublime'},
    {name: 'Atom'}
  ];

  list2 = [];

  onDrop(e: DropEvent) {
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
