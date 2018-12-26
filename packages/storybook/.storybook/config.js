import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
    name: 'React Native Web',
    url: 'https://necolas.github.io/react-native-web',
    goFullScreen: false,
    addonPanelInRight: false,
    showSearchBox: false,
    showAddonPanel: false,
    showStoriesPanel: true,
    hierarchyRootSeparator: /\|/,
});
// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);

const RNreq = require.context('../RNStories', true, /.stories.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
    RNreq.keys().forEach(filename => RNreq(filename));
}

configure(loadStories, module);
