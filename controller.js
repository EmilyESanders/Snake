const colorModes = document.getElementById("color-modes");

const colorModeScripts = {
    "classic-mode": "classic-mode.js",
    "dark-mode": "dark-mode.js",
    "primary-color-mode": "primary-color-mode.js",
    "dreamy-mode": "dreamy-mode.js",
    "forest-mode": "forest-mode.js",
};

function loadColorModeScript(){
    const selectedColors = colorModes.value;
    const scriptToLoad = colorModeScripts[selectedColors];

    if (scriptToLoad){
        const scriptElement = document.createElement("script");
        scriptElement.src = scriptToLoad;
        document.body.appendChild(scriptElement);
    }
}

colorModes.addEventListener("change", loadColorModeScript);

loadColorModeScript();