const getCSSVariablesForSelector = (selector) => {
    const cssVariables = {};

    for (const stylesheet of document.styleSheets) {
        if (stylesheet.href && !stylesheet.href.startsWith(window.location.origin)) {
            continue;
        }

        try {
            for (const rule of stylesheet.cssRules) {
                if (rule.selectorText && rule.selectorText.includes(selector) && rule.style) {
                    for (const property of rule.style) {
                        if (property.startsWith('--')) {
                            cssVariables[property] = rule.style.getPropertyValue(property).trim();
                        }
                    }
                }
            }
        } catch (e) {
            console.error(`Could not access stylesheet: ${stylesheet.href}`, e);
        }
    }

    return cssVariables;
};

export const getCSSVariables = (selector, ctwSetingsState) => {
    // Get the first element that matches the selector
    const element = document.querySelector(selector);

    // Color regexes
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const rgbRegex = /^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/;
    const rgbaRegex = /^rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*(0|0?\.[0-9]+|1(\.0)?)\s*\)$/;

    // Check if the element exists
    if (element) {
        // Get the computed styles for the element
        //const styles = getComputedStyle(element);
        const cssVariables = getCSSVariablesForSelector(selector);
        // console.log(styles);
        // const cssVariables = {};
        const cssHighlighted = {};

        // Loop through the computed styles
        // for (let i = 0; i < styles.length; i++) {
        //     const property = styles[i];

        //     // Check if the property is a CSS variable
        //     if (property.startsWith('--')) {
        //         cssVariables[property] = styles.getPropertyValue(property).trim();
        //     }
        // }

        // Flip order
        const reversedKeys = Object.keys(cssVariables).reverse();
        const flippedCssVariables = {};
        reversedKeys.forEach((key) => {
            flippedCssVariables[key] = cssVariables[key];
        });

        // Filter out selectors by remove/keep regex
        if (ctwSetingsState?.selectorFilters?.['remove']) {
            Object.keys(flippedCssVariables).forEach((key) => {
                if (key.match(ctwSetingsState.selectorFilters['remove']) !== null) {
                    delete flippedCssVariables[key];
                }
            });
        }
        if (ctwSetingsState?.selectorFilters?.['keep']) {
            Object.keys(flippedCssVariables).forEach((key) => {
                if (key.match(ctwSetingsState.selectorFilters['keep']) === null) {
                    delete flippedCssVariables[key];
                }
            });
        }

        // Keep colors only
        Object.keys(flippedCssVariables).forEach((key) => {
            if (!hexRegex.test(flippedCssVariables[key]) && !rgbRegex.test(flippedCssVariables[key]) && !rgbaRegex.test(flippedCssVariables[key])) {
                delete flippedCssVariables[key];
            }
        });

        // Handle hightlighted
        Object.keys(flippedCssVariables).forEach((key) => {
            if (ctwSetingsState?.hightlight && Array.isArray(ctwSetingsState?.hightlight)) {
                if (ctwSetingsState.hightlight.indexOf(key) !== -1) {
                    cssHighlighted[key] = flippedCssVariables[key];
                    delete flippedCssVariables[key];
                }
            }
        });

        return {regular: flippedCssVariables, hightlighted: cssHighlighted};
    } else {
        console.error('Element not found for the given selector.');
        return null;
    }
};

export const buildCSS = (colors) => {
    const flattenColors = structuredClone(colors);
    Object.keys(flattenColors).forEach((selector) => {
        flattenColors[selector] = {...flattenColors[selector]['hightlighted'], ...flattenColors[selector]['regular']};
        delete flattenColors[selector]['hightlighted'];
        delete flattenColors[selector]['regular'];
    });

    return `${Object.keys(flattenColors)
        .map((selector) => {
            return `${selector} {
${Object.keys(flattenColors[selector])
    .map((cssVar) => {
        return `${cssVar}: ${flattenColors[selector][cssVar]};`;
    })
    .join('\n')}
}`;
        })
        .join('\n')}
`;
};
