import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { withKnobs, boolean } from '@storybook/addon-knobs';

const prefix = 'React|';
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
storiesOf(`${prefix}Button`)
    .addDecorator(withKnobs)
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
            <Button type="primary" loading={boolean('loading', true)}>
                Loading
            </Button>
            <Button
                type="primary"
                size="small"
                loading={boolean('loading', true)}
            >
                Loading
            </Button>
            <br />
            <Button
                type="primary"
                loading={boolean('loading', true)}
                onClick={action('clicked')}
            >
                Click me!
            </Button>
            <Button
                type="primary"
                icon="poweroff"
                loading={boolean('loading', true)}
                onClick={action('clicked')}
            >
                Click me!
            </Button>
            <br />
            <Button shape="circle" loading={boolean('loading', true)} />
            <Button
                type="primary"
                shape="circle"
                loading={boolean('loading', true)}
            />
        </div>
    ))
    .add('withIcon', () => (
        <div style={style.container}>
            <Button type="primary" shape="circle" icon="search" />
            <Button type="primary" icon="search">
                Search
            </Button>
            <Button shape="circle" icon="search" />
            <Button icon="search">Search</Button>
            <br />
            <Button shape="circle" icon="search" />
            <Button icon="search">Search</Button>
            <Button type="dashed" shape="circle" icon="search" />
            <Button type="dashed" icon="search">
                Search
            </Button>
        </div>
    ));
