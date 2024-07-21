import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.json({'message': 'Welcome to a WebContainers app! 🥳'});
});

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
