// ==UserScript==
// @name         Desmos Local
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Allow for saving Desmos graphs as local JSONs as well as using URL parameters to save graphs (as opposed to a hash stored on Desmos' servers)
// @author       Tyrcnex
// @match        https://*.desmos.com/calculator*
// @match        https://*.desmos.com/geometry*
// @match        https://*.desmos.com/3d*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let code;
    fetch('https://raw.githubusercontent.com/Tyrcnex/tampermonkey-desmoslocal/main/index.js').then(e => e.text()).then(e => {
        code = e;
        const script = document.createElement("script");
        script.type = "module";
        script.innerHTML = code;
        document.body.appendChild(script);
    });
})();
