// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Database, DiscogsError } from 'disconnect';
import type { NextApiRequest, NextApiResponse } from 'next';
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
var Discogs = require('disconnect').Client;


type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let ad = JSON.parse(localStorage.getItem("accessData"));
    var db: Database = new Discogs(ad).database();

    try {
        const searchRes = await db.search({ [req.body.type]: req.body.query});
        return res.json(searchRes);
    } catch (e) {
        throw e;
    }
}
