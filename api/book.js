const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

exports.config = {
    name: 'book-search',
    author: 'Metoushela',
    description: 'Search for books using Google Books API',
    method: 'get',
    category: 'books',
    link: ['/books?query=harry+potter']
};

exports.initialize = async function ({ req, res }) {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Ajoutez ?query=nom_du_livre" });
        }

        const response = await axios.get(GOOGLE_BOOKS_API, {
            params: {
                q: query,
                maxResults: 5, // Nombre de livres à afficher
                printType: "books",
                langRestrict: "fr" // Recherche en français
            }
        });

        const books = response.data.items?.map(book => ({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || ["Auteur inconnu"],
            description: book.volumeInfo.description || "Pas de description disponible",
            publishedDate: book.volumeInfo.publishedDate,
            thumbnail: book.volumeInfo.imageLinks?.thumbnail || "Pas d'image"
        })) || [];

        res.json({ books });
    } catch (error) {
        console.error("Erreur système :", error);
        res.status(500).json({ error: "Échec de récupération des livres" });
    }
};

app.get('/books', async (req, res) => {
    await exports.initialize({ req, res });
});

app.listen(port, () => {
    console.log(`Serveur API démarré sur http://localhost:${port}`);
});
