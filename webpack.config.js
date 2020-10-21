module.exports = function () {
    let env;
    env = process.env.NODE_ENV;

    if (process.env.NODE_ENV === undefined) {
        env = 'dev';
    }

    return require(`./config/webpack.${env}.js`)
};
