const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: 'c43f4eebe7c54d3a9c60c2bf1b13caa2'});

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, adb) => {
    const{id} = req.body;
    adb('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => {
        res.status(400).json('unable to get entries')
    })
}

module.exports = { 
    handleImage: handleImage,
    handleApiCall: handleApiCall
}
