const dotenv = require("dotenv")
dotenv.config()
const http = require("https")
const PORT = process.env.PORT || 3000
const app = require("./app")
const server = http.createServer(app)

server.listen(PORT)