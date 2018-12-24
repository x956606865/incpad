import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const style = {
    container: {
        width: '300px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
};
storiesOf('Button')
    .add('type', () => (
        <div style={style.container}>
            <Button type="primary" onClick={action('clicked')}>
                Primary
            </Button>
            <Button onClick={action('clicked')}>Default</Button>
            <Button onClick={action('clicked')} type="dashed">
                Dashed
            </Button>
            <Button onClick={action('clicked')} type="danger">
                Danger
            </Button>
        </div>
    ))
    .add('loading', () => (
        <div style={style.container}>
            <Button type="primary" loading>
                Loading
            </Button>
            <Button type="primary" size="small" loading>
                Loading
            </Button>
            <br />
            <Button type="primary" loading={true} onClick={action('clicked')}>
                Click me!
            </Button>
            <Button
                type="primary"
                icon="poweroff"
                loading={true}
                onClick={action('clicked')}
            >
                Click me!
            </Button>
            <br />
            <Button shape="circle" loading />
            <Button type="primary" shape="circle" loading />
        </div>
    ));
