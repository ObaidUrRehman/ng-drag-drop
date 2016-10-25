# Angular 2 Drag & Drop
Angular 2 Drag and Drop based on HTML5 with no external dependencies.

**This package is under active development please check back in a few days**

## Installation
```bash
npm install ng2-drag-drop --save dev
```

## Usage
#####Update your SystemJS config:
If you use SystemJs as your module loader then you will need to update the config to load the `ng2-drag-drop` module.
```bash
System.config({
    map: {
        'ng2-drag-drop': 'node_modules/ng2-drag-demo'
    },
    packages: {
        'ng2-drag-drop':  { main: 'index.js',  defaultExtension: 'js' },
    }
});
```
#####Import the `Ng2DragDropModule`

You need to import the `Ng2DragDropModule` in the module of your app that you want to use.

```bash
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DemoComponent} from "./components/demo-component";
import {Ng2DragDropModule} from "ng2-drag-drop";


@NgModule({
  imports: [BrowserModule, Ng2DragDropModule],
  declarations: [DemoComponent],
  bootstrap: [DemoComponent]
})
export class AppModule {}
```

#####Use the `draggable` & `droppable` directives
Place the `draggable` directive on an element that you want to be draggable. Here is how you make a List item draggable:

```bash
<ul>
  <li draggable>Coffee</li>
  <li draggable>Tea</li>
  <li draggable>Milk</li>
</ul>               
```

Similarly use the `droppable` directive on an element where you want to drop `draggable`:
 
 ```bash
 <div droppable>
   <p>Drop items here</p>
 </div>               
 ```

#####Add visual cues
Both the `draggable` & `droppable` directives take a `[dragOverClass]` input. You can pass a class name to it that will be applied when the `draggable` item is being dragged and the `droppable` is under the mouse:
 
 ```bash
 <div droppable [dragOverClass]="'drag-target-border'">
   <p>Drop items here</p>
 </div>               
 ```

#####Restrict Drop
You can use the `dropScope` property to restrict user from dropping a draggable element into a `droppable`.
 Its a string property that is common on both directives and must match in both to indicate compatible drag-drop zones.
 In the following example, only the `draggable` with the `drink` dropScope can be dropped on the `droppable`.
 
```bash
<ul>
  <li draggable [dropScope]="'drink'">Coffee</li>
  <li draggable [dropScope]="'drink'">Tea</li>
  <li draggable [dropScope]="'meal'">Biryani</li>
  ...
</ul>               
```
 
 
```bash
<div droppable [dropScope]="'drink'" [dragOverClass]="'drag-target-border'">
  <p>Only Drinks can be dropped in the above container</p>
</div>               
```
  
#####Transfer Data via Drag Drop
You can transfer data from the `draggable` to the `droppable` via the `dragData` property on the `draggable` directive. 
 The data will be received in the `(onDrop)` event of the `droppable`:

```bash
import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: `
<h3>Transfer Data via Drag Drop</h3>
<div class="row">
    <div class="col-sm-3">
        <ul class="list-group">
            <li draggable *ngFor="let item of items" [dragData]="item" class="list-group-item">{{item.name}}</li>
        </ul>
    </div>
    
    <div class="col-sm-3">
    <div class="panel panel-default" droppable (onDrop)="onItemDrop($event)">
        <div class="panel-heading">Drop Items here</div>
            <div class="panel-body">
                <li *ngFor="let item of droppedItems" class="list-group-item">{{item.name}}</li>
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent {
    items = [
            {name: "Apple", type: "fruit"},
            {name: "Carrot", type: "vegetable"},
            {name: "Orange", type: "fruit"}];
            
    onItemDrop(e: any) {
        // Get the dropped data here
        this.droppedItems.push(e.dragData);
    }
    constructor() { }
}             
```





