const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://baptisteqnt:zbUZ6yV5CmXtl9zn@cluster0.rsqgo3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        const db = client.db('mediaDB');
        const collection = db.collection('medias');

        await collection.insertMany([
            { type: 'DVD', title: 'Inception', author: 'Christopher Nolan' },
            { type: 'CD', title: 'Thriller', author: 'Michael Jackson' },
            { type: 'Manga', title: 'Naruto', author: 'Masashi Kishimoto' },
            { type: 'Book', title: '1984', author: 'George Orwell' },      
        ]);
        console.log('media inserer');

        const mangas = await collection.find({ type: 'Manga' }).toArray();
        console.log('Mangas:', mangas);

        const livresTitres = await collection.find({ type: 'Book' }).project({ title: 1, _id: 0 }).toArray();
        console.log('Livres titres:', livresTitres);

        await collection.updateOne(
            { title: '1984'},
            { $set: { title: '1984 - Special Edition' }}
        );
        console.log('Livre mis à jour');
        
        await collection.deleteMany({ type: { $in: ['CD', 'DVD']}});
        console.log('CD et DVD supprimés');

        const all = await collection.find().toArray();
        console.log('all média:', all);
    } catch (err) {
        console.error('Erreur:', err);
    } finally {
        await client.close();
    }
}
main();