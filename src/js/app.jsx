import React, {useState, useEffect} from 'react';
import {ChromePicker} from 'react-color';
import {getCSSVariables, buildCSS} from './helpers';
import PropTypes from 'prop-types';

export const App = ({ctwSetings}) => {
    // eslint-disable-next-line no-unused-vars
    const [ctwSetingsState, setCtwSetingsState] = useState(ctwSetings);
    const [expanded, setExpanded] = useState(false);
    const [colorType, setColorType] = useState('regular');
    const [colors, setColors] = useState({});
    const [currentSelector, setCurrentSelector] = useState(null);
    const [currentVar, setCurrentVar] = useState(null);
    const [fatalError, setFatalError] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [canLoad, setCanLoad] = useState(false);
    const [reset, setReset] = useState(false);

    const getColorsFromPage = (ctwSetingsState) => {
        if (ctwSetingsState?.selectors && Array.isArray(ctwSetingsState.selectors)) {
            setColors(
                ctwSetingsState.selectors.reduce((acc, selector) => {
                    acc[selector] = getCSSVariables(selector, ctwSetingsState);
                    return acc;
                }, {}),
            );
        } else {
            setFatalError('ctwSetings.selectors is not an array or it does not exist.');
        }
    };

    useEffect(() => {
        // Get colors
        getColorsFromPage(ctwSetingsState);

        // Check can load
        localStorage.getItem('ctwColors') && setCanLoad(true);
    }, []);

    useEffect(() => {
        if (!document.getElementById('cswCustomColors')) {
            const newStyleElement = document.createElement('style');
            newStyleElement.id = 'cswCustomColors';
            document.body.appendChild(newStyleElement);
        }
        const styleElement = document.getElementById('cswCustomColors');
        styleElement.innerHTML = buildCSS(colors);
    }, [colors]);

    useEffect(() => {
        setTimeout(() => {
            setSaved(false);
        }, 1000);
    }, [saved]);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(false);
        }, 1000);
    }, [loaded]);

    useEffect(() => {
        setTimeout(() => {
            setReset(false);
        }, 1000);
    }, [reset]);

    return (
        <section className={`twctw-fixed twctw-z-[5000] twctw-top-1/2 twctw-transition-all -twctw-translate-y-1/2 twctw-flex twctw-flex-row ${expanded ? 'twctw-right-0' : '-twctw-right-52'}`}>
            <button
                className={`twctw-w-10 twctw-h-10 twctw-bg-white twctw-p-3 twctw-flex twctw-items-center twctw-justify-center twctw-rounded twctw-shadow-lg hover:twctw-bg-slate-800 hover:twctw-fill-white twctw-transition-all twctw-fixed -twctw-top-12 ${!expanded ? 'twctw-right-56' : 'twctw-right-2 -twctw-top-24'}`}
                onClick={() => {
                    setExpanded(!expanded);
                }}
            >
                {!expanded && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M162.4 6c-1.5-3.6-5-6-8.9-6h-19c-3.9 0-7.5 2.4-8.9 6L104.9 57.7c-3.2 8-14.6 8-17.8 0L66.4 6c-1.5-3.6-5-6-8.9-6H48C21.5 0 0 21.5 0 48V224v22.4V256H9.6 374.4 384v-9.6V224 48c0-26.5-21.5-48-48-48H230.5c-3.9 0-7.5 2.4-8.9 6L200.9 57.7c-3.2 8-14.6 8-17.8 0L162.4 6zM0 288v32c0 35.3 28.7 64 64 64h64v64c0 35.3 28.7 64 64 64s64-28.7 64-64V384h64c35.3 0 64-28.7 64-64V288H0zM192 432a16 16 0 1 1 0 32 16 16 0 1 1 0-32z" />
                    </svg>
                )}
                {expanded && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
                    </svg>
                )}
            </button>

            {expanded && (
                <>
                    {/* Save */}
                    <button
                        className={`twctw-w-10 twctw-h-10 twctw-p-3 twctw-flex twctw-items-center twctw-justify-center twctw-rounded twctw-shadow-lg hover:twctw-bg-slate-800 hover:twctw-fill-white twctw-transition-all twctw-fixed -twctw-top-12 twctw-right-[6.5rem] ${saved ? 'twctw-bg-green-400 hover:twctw-bg-green-400 twctw-fill-white' : 'twctw-bg-white'}`}
                        title="Save"
                        disabled={saved}
                        onClick={() => {
                            !saved &&
                                (() => {
                                    try {
                                        localStorage.setItem('ctwColors', JSON.stringify(colors));
                                        setSaved(true);
                                        setCanLoad(true);
                                    } catch (e) {
                                        console.error(e);
                                    }
                                })();
                        }}
                    >
                        {!saved ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                        )}
                    </button>

                    {/* Load */}
                    <button
                        className={`twctw-w-10 twctw-h-10 twctw-p-3 twctw-flex twctw-items-center twctw-justify-center twctw-rounded twctw-shadow-lg hover:twctw-bg-slate-800 hover:twctw-fill-white twctw-transition-all twctw-fixed -twctw-top-12 twctw-right-14 disabled:twctw-opacity-30 ${loaded ? 'twctw-bg-green-400 hover:twctw-bg-green-400 twctw-fill-white' : 'twctw-bg-white'}`}
                        title="Load"
                        disabled={!canLoad || loaded}
                        onClick={() => {
                            !loaded &&
                                (() => {
                                    try {
                                        setColors(JSON.parse(localStorage.getItem('ctwColors')));
                                        setLoaded(true);
                                    } catch (e) {
                                        console.error(e);
                                    }
                                })();
                        }}
                    >
                        {!loaded ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                        )}
                    </button>

                    {/* Reset */}
                    <button
                        className={`twctw-w-10 twctw-h-10 twctw-p-3 twctw-flex twctw-items-center twctw-justify-center twctw-rounded twctw-shadow-lg hover:twctw-bg-slate-800 hover:twctw-fill-white twctw-transition-all twctw-fixed -twctw-top-12 twctw-right-2 disabled:twctw-opacity-30 ${reset ? 'twctw-bg-green-400 hover:twctw-bg-green-400 twctw-fill-white' : 'twctw-bg-white'}`}
                        title="Reset"
                        disabled={reset}
                        onClick={() => {
                            !loaded &&
                                (() => {
                                    try {
                                        localStorage.removeItem('ctwColors');
                                        setReset(true);
                                        setCanLoad(false);
                                        document.getElementById('cswCustomColors').innerHTML = '';
                                        getColorsFromPage(ctwSetingsState);
                                    } catch (e) {
                                        console.error(e);
                                    }
                                })();
                        }}
                    >
                        {!reset ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                        )}
                    </button>
                </>
            )}
            {!fatalError ? (
                <>
                    <div className={`${currentSelector && currentVar && expanded ? 'twctw-mr-2' : 'twctw-hidden'}`}>
                        <ChromePicker
                            color={colors?.[currentSelector]?.[colorType]?.[currentVar] || '#000'}
                            onChangeComplete={(c) => {
                                const newColors = structuredClone(colors);
                                newColors[currentSelector][colorType][currentVar] = c.hex;
                                setColors(newColors);
                            }}
                        />
                    </div>
                    <div className="twctw-shadow-lg">
                        <ul className="twctw-list-none twctw-m-0 twctw-p-0 twctw-text-xs twctw-bg-white twctw-border twctw-max-h-[40vh] twctw-w-48 twctw-overflow-x-auto twctw-overflow-y-auto">
                            {Object.keys(colors).map((selector, i) => {
                                return (
                                    <li key={`cs_${i}`}>
                                        <div className="twctw-font-bold twctw-p-1 twctw-w-32 twctw-text-ellipsis twctw-overflow-hidden twctw-text-nowrap twctw-text-[#000000]" title={selector}>
                                            {selector}
                                        </div>
                                        {Object.keys(colors[selector].hightlighted).length ? (
                                            <ul className="twctw-list-none twctw-m-0 twctw-p-0 twctw-pl-3 twctw-flex twctw-flex-row twctw-w-40 twctw-flex-wrap twctw-gap-2 twctw-pb-2 twctw-bg-slate-200 twctw-pt-2 twctw-mb-2">
                                                {Object.keys(colors[selector].hightlighted).map((cssVar, j) => {
                                                    return (
                                                        <li key={`cs_${i}_cv_${j}`} className="twctw-w-16 twctw-h-16 twctw-p-0 twctw-m-0">
                                                            <button
                                                                className={`twctw-w-full twctw-h-full ${currentSelector === selector && currentVar === cssVar ? 'twctw-border-4 twctw-border-offset-1 twctw-border-pink-700' : ''}`}
                                                                onClick={() => {
                                                                    setColorType('hightlighted');
                                                                    setCurrentSelector(selector);
                                                                    if (currentSelector === selector) {
                                                                        setCurrentVar(currentVar !== cssVar ? cssVar : null);
                                                                    } else {
                                                                        setCurrentVar(cssVar);
                                                                    }
                                                                }}
                                                                style={{backgroundColor: colors[selector].hightlighted[cssVar]}}
                                                                title={cssVar}
                                                            ></button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        ) : ''}
                                        <ul className="twctw-list-none twctw-m-0 twctw-p-0 twctw-pl-3 twctw-flex twctw-flex-row twctw-w-40 twctw-flex-wrap twctw-gap-2 twctw-pb-2">
                                            {Object.keys(colors[selector].regular).map((cssVar, j) => {
                                                return (
                                                    <li key={`cs_${i}_cv_${j}`} className="twctw-w-16 twctw-h-16 twctw-p-0 twctw-m-0">
                                                        <button
                                                            className={`twctw-w-full twctw-h-full ${currentSelector === selector && currentVar === cssVar ? 'twctw-border-4 twctw-border-offset-1 twctw-border-pink-700' : ''}`}
                                                            onClick={() => {
                                                                setColorType('regular');
                                                                setCurrentSelector(selector);
                                                                if (currentSelector === selector) {
                                                                    setCurrentVar(currentVar !== cssVar ? cssVar : null);
                                                                } else {
                                                                    setCurrentVar(cssVar);
                                                                }
                                                            }}
                                                            style={{backgroundColor: colors[selector].regular[cssVar]}}
                                                            title={cssVar}
                                                        ></button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                        <textarea value={buildCSS(colors)} className="twctw-text-xs twctw-w-full twctw-min-h-16 twctw-p-2 twctw-bg-slate-100 twctw-text-[#000000]" onChange={() => {}}></textarea>
                    </div>
                </>
            ) : (
                <p>{fatalError}</p>
            )}
        </section>
    );
};

App.propTypes = {
    ctwSetings: PropTypes.object,
};
