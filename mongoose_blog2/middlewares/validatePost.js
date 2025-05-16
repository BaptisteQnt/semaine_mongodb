module.exports = (req, res, next) => {
    const { titre, description, auteur } = req.body;

    // Check if all fields are filled
    if (!titre || !description || !auteur) {
        return res.status(400).send('Tous les champs doivent être remplis');
    }

    // Check if the description is at least 20 characters long
    if (description.length < 20) {
        return res.status(400).send('La description doit contenir au moins 20 caractères');
    }

    next();
}