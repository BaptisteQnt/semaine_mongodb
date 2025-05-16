const { default: mongoose } = require("mongoose");
const modelBlog = require("./src/models/model-blog");

async function main() {
    try {
        await mongoose.connect("mongodb+srv://baptisteqnt:zbUZ6yV5CmXtl9zn@cluster0.rsqgo3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('connexion ok');

        const result = await modelBlog.create({
            titre: "mon premier titre de blog",
            description: "ma premiere description de blog",
        });

        console.log('resultat: ', result);

    } catch (error) {
        console.error('erreur de connexion: ', error);
    }
    return "ok";
}

main();