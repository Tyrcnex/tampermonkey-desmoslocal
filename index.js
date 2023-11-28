import {
    buildConfigFromGlobals,
    rawToText,
    textToRaw
} from "https://unpkg.com/@desmodder/text-mode-core@0.1.1/index.js";

const waitForCalc = () => {
    if (typeof Calc === 'undefined') {
        setTimeout(waitForCalc, 1000);
    } else {
        const cfg = buildConfigFromGlobals(Desmos, Calc);
        let urlParams = new URLSearchParams(window.location.search);
        let rawParam = urlParams.get('d');
        if (rawParam) {
            let decoded = decodeURIComponent(rawParam);
            let rawJSON = JSON.parse(textToRaw(decoded));
            Calc.setState(rawJSON);
        }

        let saveContainer = document.getElementsByClassName('save-btn-container')[0];
        let clonableContainer = saveContainer.firstChild;
        
        const download = (filename, text) => {
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
        
        const setURL = () => {
            let text = rawToText(cfg, Calc.getState());
            text = encodeURIComponent(text);
            history.pushState({ data: 'data' }, "", `?d=${text}`);
        }
        
        let saveFileContainer = clonableContainer.cloneNode(true);
        let saveFileButton = saveFileContainer.firstChild;
        saveFileButton.classList.remove("dcg-disabled");
        saveFileButton.classList.add("dcg-btn-primary");
        saveFileButton.innerHTML = "Save File";
        saveFileButton.onclick = () => {
            download(`graph.json`, JSON.stringify(Calc.getState(), null, 4));
            setURL();
        }
        saveContainer.appendChild(saveFileContainer);
        
        let setURLContainer = clonableContainer.cloneNode(true);
        let setURLButton = setURLContainer.firstChild;
        setURLButton.classList.remove("dcg-disabled");
        setURLButton.classList.add("dcg-btn-primary");
        setURLButton.innerHTML = "Set URL";
        setURLButton.onclick = () => {
            setURL().then(() => {
                alert("URL parameter adjusted!");
            });
        }
        saveContainer.appendChild(setURLContainer);
    }
}
waitForCalc();
