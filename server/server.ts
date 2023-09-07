import express from "express";
import SpotifyWebApi from 'spotify-web-api-node';
import Global from './Global/Global';


const app = express();

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirect_uri: Global.redirect_uri,
        client_id: Global.client_id,
        client_secret: Global.client_secret, 
    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(
        (data) => {
          res.json({
            accessToken: data.body.access.token,
            refreshToken: data.body.refresh.token,
            expiresIn: data.body.expires_in
          })
        })
        .catch(() => {
            res.sendStatus(400)
        })

})

