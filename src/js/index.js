// Import CSS
import 'src/css/tailwind.scss';

// Dynamic imports
Object.keys(window.components).forEach((key) => {
    if (document.querySelector(window.components[key])) {
        switch (key) {
            case 'reactComponent':
                import(/* webpackChunkName: "reactComponent" */ 'src/components/reactComponent/Init.jsx').then((f) => f.init());
                break;
            case 'vanillaComponent':
                import(/* webpackChunkName: "vanillaComponent" */ 'src/components/vanillaComponent/Init.js').then((f) => f.init());
                break;
        }
    }
});
