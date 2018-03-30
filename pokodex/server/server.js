import express from 'express';
import path from 'path';
import morgan from 'morgan';

const app = express();
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/')));


app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});



app.listen(3000, () => {
  console.log('Server running on PORT 3000');
});
