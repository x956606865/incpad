function doWrap(func, options) {
    const option = Object.assign(
        {
            before: () => {},
            after: () => {},
            func,
            context: null,
        },
        options
    );
    return function(...args) {
        const context = option.context;
        if (context) {
            option.before = option.before.bind(context);
            option.after = option.after.bind(context);
        }
        return new Promise(resolve => {
            resolve(option.before(...args));
        })
            .then(() => option.func(...args))
            .then(data =>
                Promise.resolve(option.after(...args)).then(() => data)
            );
    };
}

function doWrapAndPipeData(func, options) {
    const option = Object.assign(
        {
            before: () => {},
            after: () => {},
            func,
            context: null,
        },
        options
    );
    return function(...args) {
        const context = option.context;
        if (context) {
            option.before = option.before.bind(context);
            option.after = option.after.bind(context);
        }
        console.log('start');
        return Promise.resolve(option.before(...args))
            .then(data => option.func(data))
            .then(data => {
                console.log('end');
                return option.after(data);
            });
    };
}

module.exports = {
    doWrap,
    doWrapAndPipeData,
};
