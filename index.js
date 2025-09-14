import path from 'node:path'
import * as dotenv from 'dotenv'
dotenv.config({path:path.join(path.resolve(),'./src/config/.env.dev')})

import express from "express"
import bootstarb from "./src/app.controller.js"
const app =express()
const port=process.env.PORT||4000
bootstarb(app,express)
app.listen(port,()=>{
    console.log("server is running on port 3000")
})