/**
 * Created by orehman on 2/22/2017.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Ng2DragDropService {
    dragData: any;
    scope: string | Array<string>;
    onDragStart = new Subject<any>();
    onDragEnd = new Subject<any>();

    constructor() {
    }
}
@Injectable()
export class Ng2SortableService {
    sortableItems: Array<any> = [];
    sortIndex: number;
    dragItem;
}
