const Clarifai = require('clarifai')

const handleImage = (req, res, db) => {
    const { id } = req.body
    db('users')
        .where('id', '=', id)
        .increment(
            'entries', 1
        )
        .returning('entries')
        .then(entries => res.json(entries))
        .catch(err => res.status(400).json('could not update entries!'))
}

const handleApiCall = (req, res) => {
    // Clarifai
    const app = new Clarifai.App({
        apiKey: 'a65987dcb24a4d79bd58e3436249d61c'
    })

    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('could not connect with clarifai!'))
}

module.exports = {
    handleImage,
    handleApiCall
}