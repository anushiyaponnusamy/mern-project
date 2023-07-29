const express=require('express');
const cors = require('cors');
const connectToMongoDb=require('./databaseConnection')
const notesRouter=require('./src/notes/route')
const userRouter=require('./src/user/route')
const likesRouter=require('./src/postlikes/route')
const postRouter=require('./src/userpost/route');
const uploadMiddleware = require('./uploadImage');
const videoUploadMiddleware = require('./uploadVideo');
connectToMongoDb();
const app = express()
app.use(cors());
const port = 3001

app.use(express.json());    
// cloudinary.config({ 
//   cloud_name: 'ddaf8ftoj', 
//   api_key: '576789522748994', 
//   api_secret: '9G4HAkps8MsWp9FYa57nUo-aPJw' 
// });
app.use('/user',userRouter)
app.use('/notes',notesRouter)
app.use('/likes',likesRouter)
app.use('/post',postRouter)
app.get('/', (req, res) => {
  res.send('working!')
})


app.post('/uploadImage', uploadMiddleware, (req, res) => {
  const imageUrl = req.imageUrl;
  console.log(imageUrl)
  res.send(imageUrl)
});


app.post('/uploadVideo', videoUploadMiddleware, (req, res) => {
  const videoUrl = req.videoUrl;
  console.log(videoUrl)
  res.send(videoUrl)
});
app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})