import React, { Component } from 'react'
import { render } from 'react-dom'
import unCloak from './unCloak';

let cloakClass = 'cloak';

export const setCloakClass = function (className) {
    cloakClass = className;
};

const Mount = function (components) {
    const items = [];

    Object.keys(components).forEach(name => {
        const component = components[name];

        // Only register it once.
        if (items[name]) {
            return
        }

        items[name] = component;

        Array.from(document.querySelectorAll(`[data-mount="${name}"]`)).forEach(element => {
            const $el = element.cloneNode(true);

            render(
                React.createElement(component, { ...element.dataset, $el }),
                element
            )
        })
    });

    unCloak(cloakClass);
};

export default Mount;
