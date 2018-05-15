/**
 * Created by orehman on 2/22/2017.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NgDragDropService {
    dragData: any;
    scope: string | Array<string>;
    onDragStart = new Subject<any>();
    onDragEnd = new Subject<any>();

    constructor() {
    }
}
