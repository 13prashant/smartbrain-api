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

module.exports = {
    handleImage
}