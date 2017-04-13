import fetch from 'isomorphic-fetch';

export const fetchWrapper = (url, options) =>
    new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => response.json().then(json => ({
                json,
                response,
            })))
            .then(({ response, json }) => {
                if (!response.ok) {
                    const error = {
                        ...json,
                        status: response.status,
                    };

                    return reject(error);
                }

                return resolve(json);
            })
            .catch((err) => {
                reject(err);
            });
    });
