import { Component } from '@angular/core';

@Component({
    selector: 'sortable-demo',
    templateUrl: 'app/sortable-demo/sortable-demo.component.html',
})
export class SortableDemoComponent {

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

    container1 = [
        {name: 'Shirt'},
        {name: 'Tie'},
        {name: 'Pant'},
        {name: 'Shoe'}
    ]

    container2 = [];

}
