import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react';

const prefix = 'ReactNative|';
storiesOf(`${prefix}Demo/test`, module).add('to Storybook2', () => (
    <Text>test content</Text>
));
