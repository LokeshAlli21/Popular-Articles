// importing all the required packages...
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

// initializing port number
const port = 3000;

// running applincation with express
const app = express();

// declaring public folder as static with experss
app.use(express.static('public'));

// intializing body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));

// initializing the apikey with my own API key
const apiKey  = 'KobCCfAWx3Enygj1pIb6vGx03WxNb8R4';

// this is the base url of the NYT.com site for api
const baseUrl = 'https://api.nytimes.com/svc/mostpopular/v2/';

// get at home route
app.get('/',async (req, res) => {
    // res.render('index.ejs');

    try{ // if get's an error as too many requests then execute following code and comment this out
        const response = await axios.get('https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=KobCCfAWx3Enygj1pIb6vGx03WxNb8R4');
        res.render('index.ejs', {data: response.data});
        // res.send(data);
    } catch(err){
        console.error(err.response);
    }


    // const makeRequestWithRetry = async (url, maxRetries = 3, delay = 1000) => {
    //     for (let i = 0; i < maxRetries; i++) {
    //         try {
    //             const response = await axios.get(url);
    //             return response.data;
    //         } catch (error) {
    //             if (error.response && error.response.status === 429) {
    //                 // Rate limit exceeded, wait for some time before retrying
    //                 await new Promise(resolve => setTimeout(resolve, delay));
    //             } else {
    //                 // Other types of errors, throw the error
    //                 throw error;
    //             }
    //         }
    //     }
    //     throw new Error('Max retries reached. Unable to make successful request.');
    // };

    // makeRequestWithRetry(`${baseUrl}emailed/7.json?api-key=${apiKey}`)
    //     .then(data => res.render('index.ejs', {data: data}))
    //     .catch(error => console.error(error));

        
});

// post at /search with user specified type and period
app.post('/search',async (req, res) => {
    const type = req.body.type; 
    const period = req.body.period;
    let sharedOnFB = '';

    // const options = {
    //     type:type,
    //     period: period,
    //     sharedOnFB: req.body.sharedOnFB
    // };
    
    if (req.body.sharedOnFB) { //checking if the user is wanted most shared artiles on facebook or not
        sharedOnFB = '/facebook';
    }

    // console.log(baseUrl + type + '/' + period + sharedOnFB + '.json?api-key=' + apiKey);

    // res.redirect('/');

    try{
        const response = await axios.get(baseUrl + type + '/' + period + sharedOnFB + '.json?api-key=' + apiKey);
        res.render('index.ejs', {data: response.data});
    } catch(err){
        console.error(err.response);
    }

});

// app is listening on port 3000
app.listen(port, () => {
    console.log(`server is started on port ${port}`); // message for server starting
});