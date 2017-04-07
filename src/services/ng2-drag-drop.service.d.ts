import { Subject } from 'rxjs/Subject';
export declare class Ng2DragDropService {
    dragData: any;
    scope: string | Array<string>;
    onDragStart: Subject<any>;
    onDragEnd: Subject<any>;
    constructor();
}
