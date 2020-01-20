import React, { Component } from 'react'
import { render } from 'react-dom'
import unCloak from './unCloak';

const Mount = function (components) {
    this.cloakClass = 'cloak';

    this.setCloakClass = function (className) {
        this.cloakClass = className;
    };

    this.items = [];

    Object.keys(components).forEach(name => {
        const component = components[name];

        // Only register it once.
        if (this.items[name]) {
            return
        }

        this.items[name] = component;

        Array.from(document.querySelectorAll(`[data-mount="${name}"]`)).forEach(element => {
            const $el = element.cloneNode(true);

            render(
                React.createElement(component, { ...element.dataset, $el }),
                element
            )
        })
    });

    unCloak(this.cloakClass);
};

export default Mount;
