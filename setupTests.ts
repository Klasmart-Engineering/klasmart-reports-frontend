import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';
import resizeObserverPolyfill from "resize-observer-polyfill"

window.ResizeObserver = resizeObserverPolyfill;
