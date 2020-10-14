const PORT = process.env.PORT || 8069;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Express
const app = express();

// CORS
if (process.env.NODE_ENV === 'cors') {
    app.use(cors());
}

if (process.env.NODE_ENV === 'restrict') {
    app.use(cors({
        origin: 'http://localhost:6969'
    }));
}

// Body Parser
app.use(bodyParser.json())

// cookie Age
const maxAge = 24 * 60 * 60 * 1000;

// some JSON data
const JSONdata = [
    {
      "_id": "5f833668e94616874f65f2db",
      "index": 3,
      "guid": "e85871c3-97c8-40db-b3dc-165ae49f4feb",
      "isActive": false,
      "balance": "$1,887.25",
      "picture": "http://placehold.it/32x32",
      "age": 21,
      "eyeColor": "brown",
      "name": "Campos Kane",
      "gender": "male",
      "company": "JETSILK",
      "email": "camposkane@jetsilk.com",
      "phone": "+1 (882) 511-2696"
    },
    {
      "_id": "5f8336684939a4c95ed13123",
      "index": 4,
      "guid": "b1e7ca09-a5e5-4c29-859e-3d269bec9cb8",
      "isActive": false,
      "balance": "$3,919.87",
      "picture": "http://placehold.it/32x32",
      "age": 20,
      "eyeColor": "green",
      "name": "Courtney Atkinson",
      "gender": "female",
      "company": "ANIVET",
      "email": "courtneyatkinson@anivet.com",
      "phone": "+1 (850) 473-2587"
    },
    {
      "_id": "5f833668b623c306077be745",
      "index": 5,
      "guid": "06d17390-5413-4fee-8389-cbeef6054763",
      "isActive": false,
      "balance": "$3,817.73",
      "picture": "http://placehold.it/32x32",
      "age": 21,
      "eyeColor": "blue",
      "name": "Juanita Stark",
      "gender": "female",
      "company": "NSPIRE",
      "email": "juanitastark@nspire.com",
      "phone": "+1 (831) 409-3428"
    }
]

app.get('/setCookieNormal', async (req, res, next) => {
    res.cookie('cookie-normal', 'normal', { maxAge })
    res.send(`Set Cookie: Max-Age=${maxAge}`)
})

app.get('/setCookieStrict', async (req, res, next) => {
    res.cookie('cookie-strict', 'strict', { maxAge, sameSite: 'strict' })
    res.send(`Set Cookie: Max-Age=${maxAge}, SameSite=Strict `)
})

app.get('/setCookieLax', async (req, res, next) => {
    res.cookie('cookie-lax', 'lax', { maxAge, sameSite: 'lax' })
    res.send(`Set Cookie: Max-Age=${maxAge}, SameSite=Lax`)
})

app.get('/setCookieNone', async (req, res, next) => {
    res.cookie('cookie-none', 'none', { maxAge, sameSite: 'none' })
    res.send(`Set Cookie: Max-Age=${maxAge}, SameSite=None`)
})

app.get('/setCookieSecure', async (req, res, next) => {
    res.cookie('cookie-secure', 'secure', { maxAge, secure: true })
    res.send(`Set Cookie: Max-Age=${maxAge}, Secure=true`)
})

app.get('/clearCookieSecure', async (req, res, next) => {
    res.clearCookie('cookie-secure')
    res.send(`Clear Cookie: Secure=true`)
})

app.get('/setCookieOnly', async (req, res, next) => {
    res.cookie('cookie-only', 'http-only', { maxAge, httpOnly: true })
    res.send(`Set Cookie: Max-Age=${maxAge}, HttpOnly=true`)
})

app.get('/getHeaders', async (req, res, next) => {
    // send back headers
    res.send(req.headers)
})

app.get('/getJSON', async (req, res, next) => {
    res.send(JSONdata)
})

app.get('/getJSONP', async (req, res, next) => {
    res.jsonp(JSONdata)
})

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));