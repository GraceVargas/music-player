import dotenv from 'dotenv';
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import SpotifyWebApi from 'spotify-web-api-node';

dotenv.config()
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req: Request, res: Response) => {
    const code = req.body.code;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET, 
    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(
        (data) => {
          res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
          })
        })
        .catch((err) => {
            res.sendStatus(err)
        })

})

app.post('/refresh', (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET, 
    refreshToken
  });

  spotifyApi
  .refreshAccessToken()
  .then(
    (data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in
      })
      console.log(data)
    })
    .catch((err) => {
      res.sendStatus(err)
  })
})


app.listen(process.env.PORT);

