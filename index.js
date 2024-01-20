// import express from 'express'
const express = require('express')
// import fileUpload from 'express-fileupload'
const fileUpload = require('express-fileupload')
// import cors from 'cors'
const cors = require('cors')
const authRouter = require('./routers/auth-router.js')

const PORT = 5000

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))

app.use('/api', authRouter)

app.listen(PORT, () => {
  console.log('Server was started on port: ', PORT)
})
