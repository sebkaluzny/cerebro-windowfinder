import {shellCommand} from 'cerebro-tools'
import {getAllWindows, getAllIds, openWindow} from './linux';
import {search} from 'cerebro-tools'

const REFRESH_TIME = 2 * 1000;

let windowsList = [];

export const initializeAsync = (cb) => {
    getAllIds().then(ids => {
        getAllWindows(ids).then(windows => {
            cb(windows);
        });
    });

    setTimeout(() => {
        initializeAsync(cb);
    }, REFRESH_TIME);
}

export const fn = ({term, display}) => {
    const result = search(windowsList, term, el => el.name)
        .reverse()
        .map(window => {
            const {id, name} = window
            return {
                title: name,
                onSelect: () => {
                    const _window = window
                    openWindow(_window)
                }
            }
        });

    display(result);
}

export const onMessage = (results) => {
    windowsList = results;
}