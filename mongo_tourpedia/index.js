const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://baptisteqnt:zbUZ6yV5CmXtl9zn@cluster0.rsqgo3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function run() {
    try {
      await client.connect();
      const db = client.db('Exercice_loki');
      const collection = db.collection('tour_pedia');
      console.log("Connexion ok"); 
      
    //   await listeVillesHorsParis(collection);
    //   await listeVillesHorsParisAggregate(collection);
    //   await nombreRestaurants(collection);
    await nombreOccurrencesVille(collection)
    
  
    } catch (err) {
      console.error("Erreur de connexion ou d'exécution :", err);
    } finally {
      await client.close();
    }
}

async function listeVillesHorsParis(collection) {
    console.log("Villes autres que Paris:");
  
    const villes = await collection.find({ "location.city": { $ne: "Paris" } }, { projection: { "location.city": 1, _id: 0 } }).toArray();
    console.log(villes);
}

async function listeVillesHorsParisAggregate(collection) {
    console.log("Villes autres que Paris (aggregate):");
  
    const villes = await collection.aggregate([
      { $match: { "location.city": { $ne: "Paris" } } },
      { $project: { "location.city": 1, _id: 0 } }
    ]).toArray();
    console.log(villes);
}

async function nombreRestaurants(collection) {
    console.log("Nombre de 'restaurant' en category:");
    const count = await collection.countDocuments({ category: "restaurant" });
    console.log("Restaurants :", count);
}

async function nombreOccurrencesVille(collection) {
    console.log("Nombre d'occurrences de Marseille:");
  
    const result = await collection.aggregate([
      { $match: { "location.city": "Marseille" } },
      { $group: { _id: "$location.city", total: { $sum: 1 } } }
    ]).toArray();
    console.log(result);
}
  
  
  
  
  
  run();