const fs = require("fs");
const path = require("path");

function setModeFromPath(thePath) {
    var modelist = ace.require("ace/ext/modelist");
    var mode = modelist.getModeForPath(thePath).mode;
    editor.session.setMode(mode);
}

var absolutePath = "";

function openFile(filename) {

    setModeFromPath(filename);

    // check if file exists
    if (fs.existsSync(filename)) {
        console.log(`Reading from ${filename}`)
        let data = fs.readFileSync(filename, 'utf8');
        editor.setValue(data);
    } else {
        console.log("File Doesn\'t Exist. Creating new file.");
        fs.writeFile(filename, '', (err) => {
            if (err) {
                console.log(err)
            }
        })
    }
    absolutePath = path.resolve(filename);
    document.title = path.basename(absolutePath);

    editor.clearSelection();
}

openFile("example/pasta.md");


function init() {
    editor.setOptions({
        fontFamily: "Jetbrains Mono",
        fontSize: "16px"
    })
}

init();
