import {shellCommand} from 'cerebro-tools'
import _ from 'lodash';

export const getAllIds = () => {
    return new Promise((resolve, reject) => {
        shellCommand(`xdotool search --onlyvisible --name ''`).then(ids => {
            resolve(ids.split("\n"));
        }, e => reject());
    });
}

export const getAllWindows = (ids) => {
    const promises = ids.map(id => (
        new Promise((resolve, reject) => {
            if (id != '') {
                shellCommand(`xdotool getwindowname ${id}`).then(name => {
                    resolve({
                        id: id,
                        name: name
                    });
                }, e => { reject() })
            }
            else {
                resolve({name: "\n"})
            }
        })
    ))

    return Promise.all(promises).then(data => {
        return _.filter(data, window => {
            return window !== undefined && window.name != "\n";
        });
    })
}

export const openWindow = (window) => {
    return shellCommand(`xdotool windowactivate ${window.id}`);
}