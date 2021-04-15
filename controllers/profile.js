const handleProfile = (req, res, db) => {
    const { id } = req.params
    db.select('*').from('users').where({ id })
        .then(user => user.length ? res.json(user[0]) : res.status(400).json('user not found!'))
        .catch(err => res.status(400).json('error finding user!'))
}

module.exports = {
    handleProfile
}