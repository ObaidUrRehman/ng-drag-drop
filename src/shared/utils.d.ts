import { ElementRef } from "@angular/core";
/**
 * Created by orehman on 2/22/2017.
 */
export declare class Utils {
    /**
     * Polyfill for element.matches.
     * See: https://developer.mozilla.org/en/docs/Web/API/Element/matches#Polyfill
     * @param element
     */
    static matches(element: any, selectorName: string): boolean;
    /**
     * Applies the specified css class on nativeElement
     * @param elementRef
     * @param className
     */
    static addClass(elementRef: ElementRef, className: string): void;
    /**
     * Removes the specified class from nativeElement
     * @param elementRef
     * @param className
     */
    static removeClass(elementRef: ElementRef, className: string): void;
}
