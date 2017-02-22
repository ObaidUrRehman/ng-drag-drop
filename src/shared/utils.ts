/**
 * Created by orehman on 2/22/2017.
 */

export class Utils {
    /**
     * Polyfill for element.matches.
     * See: https://developer.mozilla.org/en/docs/Web/API/Element/matches#Polyfill
     * @param element
     */
    public static matches(element: any, selectorName: string): boolean {

        let proto :any = Element.prototype;

        var func =
            proto['matches'] ||
            proto.matchesSelector ||
            proto.mozMatchesSelector ||
            proto.msMatchesSelector ||
            proto.oMatchesSelector ||
            proto.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {
                }
                return i > -1;
            };

        return func.call(element, selectorName);
    }
}