const app = require("./app");

// Setup Server
const port = 3000;
app.listen(port, listening);

function listening(){
    console.log("Server listening on port " + port);
}