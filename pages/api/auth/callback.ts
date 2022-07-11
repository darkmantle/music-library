import { OAuth } from 'disconnect';
import type { NextApiRequest, NextApiResponse } from 'next'
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
var Discogs = require('disconnect').Client;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    let ots = JSON.parse(localStorage.getItem("OTS"));

    var oAuth: OAuth = new Discogs(ots).oauth();
    oAuth.getAccessToken(
        req.query.oauth_verifier as string, // Verification code sent back by Discogs
        function (err, accessData) {
            if (!err) localStorage.setItem("accessData", JSON.stringify(accessData));
            res.redirect("/");
        }
    );

}
