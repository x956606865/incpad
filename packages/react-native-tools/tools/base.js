const { Platform, Dimensions } = require('react-native');

function isAndroid() {
    return Platform.OS === 'android';
}

function isIOS() {
    return Platform.OS === 'ios';
}

function isIphoneX() {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
    return (
        isIOS() &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    );
}

module.exports = {
    isAndroid,
    isIOS,
    isIphoneX,
};
