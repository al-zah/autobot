import fetch from 'isomorphic-fetch';

export const fetchWrapper = (url, options) =>
    new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => response.json().then(json => ({
                json,
                response,
            })))
            .then((props) => {
                if (!props || !props.response) {
                    console.log(`props: ${JSON.stringify(props)}`);

                    return console.error(`FAIL on url: ${url}`);
                }
                if (!props.response.ok) {
                    const error = {
                        ...props.json,
                        status: props.response.status,
                    };

                    return reject(error);
                }

                return resolve(props.json);
            })
            .catch((err) => {
                reject(err);
            });
    });
