const express = require('express');
const config = require('config')
const app = express();
const mongoose = require('mongoose');

const PORT = config.get('port') || 6000


app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t/', require('./routes/redirect.routes'));

async function start () {
    try {
       await mongoose.connect(config.get('mongoURI'), {
        useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true  
       })
       app.listen(PORT, () => console.log(`App has been started on port ${PORT}` ))
    } catch (error) {
      console.log('Server error', error.message) 
      process.exit(1) 
    }
}


start()