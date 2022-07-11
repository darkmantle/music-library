import { OAuth } from 'disconnect';
import type { NextApiRequest, NextApiResponse } from 'next';
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
var Discogs = require('disconnect').Client;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    var oAuth: OAuth = new Discogs().oauth();
	oAuth.getRequestToken(
		'venostPFhLXJPtnCzOsk', 
		'nWIJzmJgaWYDQjydDqSZQduTrzOLvOvv', 
		'http://localhost:3000/api/auth/callback', 
		function(err, requestData){
            localStorage.setItem("OTS", JSON.stringify(requestData));
            res.status(200).json(requestData);
		}
	);
}
