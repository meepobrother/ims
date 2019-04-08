import { createBrowserHistory, History, Action, Location, Pathname } from 'history';
import queryString, { ParsedQuery } from 'query-string';
export const history: History = createBrowserHistory();
let currentLocation = history.location;
const scrollPositionsHistory = {};
const context: {
    pathname?: Pathname,
    query?: ParsedQuery
} = {};
export const onLocationChange = (location: Location, action: Action) => {
    scrollPositionsHistory[currentLocation.key] = {
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset,
    };
    currentLocation = location;
    try {
        context.pathname = location.pathname;
        context.query = queryString.parse(location.search);
        
    } catch (e) { }
    console.log({ action })
}
history.listen(onLocationChange);
