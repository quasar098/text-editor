/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

 function openFile(filename) {

    //Check if file exists
    if(fs.existsSync(filename)) {
       let data = fs.readFileSync(filename, 'utf8').split('\n');
       console.log(data);

    } else {
       console.log("File Doesn\'t Exist. Creating new file.")
       fs.writeFile(filename, '', (err) => {
          if(err) console.log(err)
       })
    }
 }

openFile("README.md");
