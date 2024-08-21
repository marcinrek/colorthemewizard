// Imports
import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './app.jsx';
import 'src/css/tailwind.scss';

window.renderCTW = (ctwSetings) => {
    const wrapperId = ctwSetings?.ctwSettings?.appWrapperId || 'ctw';
    var react_app_wrapper = document.getElementById(wrapperId);

    // Don't run on a non-React page
    if (react_app_wrapper !== null) {
        const root = createRoot(react_app_wrapper);
        root.render(
            <aside>
                <App ctwSetings={ctwSetings} />
            </aside>,
        );
    }
};
