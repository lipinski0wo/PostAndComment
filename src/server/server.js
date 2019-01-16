import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'


import './models/User'
import './models/Post'
import mongoose_config from './config/mongoose'
import { initialize as passport_initialize } from './config/passport'


import user_route from './routes/api/user/'
import post_route from './routes/api/post/'


const port = process.env.PORT || 4000
const app = express()


mongoose
  .connect(mongoose_config.uri, mongoose_config.params)
  .then(() => { console.log(`mongoose connected`) })
  .catch(err => console.log(`mongoose errored`))


app.use(passport.initialize())

passport_initialize()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/api/user', user_route)
app.use('/api/post', post_route)


app.listen(port, () => console.log(`server running on port ${port}`))
