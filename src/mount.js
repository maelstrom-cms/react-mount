import React, { Component } from 'react'
import { render } from 'react-dom'
import unCloak from './unCloak';

let cloakClass = 'cloak';

export const setCloakClass = function (className) {
    cloakClass = className;
};

const Mount = function (components) {
    const items = {};

    Object.keys(components).forEach(name => {
        let component = components[name];

        // Only register it once.
        if (items[name]) {
            return
        }

        items[name] = component;

        Array.from(document.querySelectorAll(`[data-mount="${name}"]`)).forEach(async element => {
            const $el = element.cloneNode(true),
                code = component.toLocaleString();

            if (
                code.indexOf('then(__webpack_require') !== -1 ||
                code.indexOf('function(){return') === 0
            ) {
                const lazyLoadedComponent = await component();
                component = lazyLoadedComponent.default;
            }

            render(
                React.createElement(component, { ...element.dataset, $el }),
                element
            )
        })
    });

    unCloak(cloakClass);
};

export default Mount;
