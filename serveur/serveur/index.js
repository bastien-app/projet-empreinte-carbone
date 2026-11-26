const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
    db.run("CREATE TABLE IF NOT EXISTS users (userID TEXT, login TEXT, password TEXT)", (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS voyages (voyageID TEXT PRIMARY KEY, userID TEXT, typeVoyage TEXT, date TEXT, distanceKm REAL, consommationPour100Km REAL, quantiteCO2 REAL)`, (err) => {
        if (err) console.error(err.message);
    });
});

app.post('/enregistrerUtilisateur', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    if (!login || !password) {
        return res.status(400).json({ message: 'Erreur dans les arguments' });
    }

    const userID = uuid.v4();

    db.serialize(() => {
        db.get(`SELECT * FROM users WHERE login = ?`, [login], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Erreur lors de vérification' });
            }

            if (row) {
                return res.status(409).json({ message: 'Le login existe déjà' });
            } else {
                db.run(`INSERT INTO users (userID, login, password) VALUES (?, ?, ?)`, [userID, login, password], (err) => {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur" });
                    }
                    return res.json({ message: 'Utilisateur enregistré avec succès', userID: userID });
                });
            }
        });
    });
});

app.post('/connexionUtilisateur', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    if (!login || !password) {
        return res.status(400).json({ message: 'Erreur dans les arguments' });
    }

    db.serialize(() => {
        db.get(`SELECT * FROM users WHERE login = ? AND password = ?`, [login, password], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Erreur lors de la connexion de l’utilisateur' });
            }
            if (row) {
                return res.json({ message: 'Connexion réussie', utilisateurID: row.userID });
            }
            return res.status(403).json({ message: 'Utilisateur non trouvé' });
        });
    });
});

app.post('/ajouterVoyage', (req, res) => {
    const userID = req.query.utilisateurID;
    const { typeVoyage, date, distanceKm, consommationPour100Km } = req.body;

    let quantiteCO2;

    switch (typeVoyage) {
        case 'voiture':
            quantiteCO2 = (distanceKm * consommationPour100Km) / 100 * 2.3;
            break;
        case 'train':
            quantiteCO2 = distanceKm * 0.03;
            break;
        case 'avion':
            quantiteCO2 = distanceKm * 0.2;
            break;
        default:
            return res.status(400).json({ message: 'Erreur : type de voyage invalide' });
    }

    const voyageID = uuid.v4();

    db.serialize(() => {
        db.run(`INSERT INTO voyages (voyageID, userID, typeVoyage, date, distanceKm, consommationPour100Km, quantiteCO2) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [voyageID, userID, typeVoyage, date, distanceKm, consommationPour100Km, quantiteCO2], (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ message: "Erreur lors de l'ajout du voyage" });
                }
                return res.json({ message: 'Voyage ajouté avec succès' });
            });
    });
});

app.get('/getResumeVoyages', (req, res) => {
    const userID = req.query.utilisateurID;

    db.serialize(() => {
        db.get(`SELECT SUM(distanceKm) as totalDistance, AVG(consommationPour100Km) as consommationMoyenne, SUM(quantiteCO2) as totalCO2 FROM voyages WHERE userID = ?`,
            [userID],
            (err, row) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ message: "Erreur lors de la récupération du résumé des voyages" });
                }
                return res.json({
                    distanceKm: row.totalDistance,
                    consommationPour100Km: row.consommationMoyenne,
                    quantiteCO2Totale: row.totalCO2
                });
            });
    });
});


app.get('/listerVoyages', (req, res) => {
    const userID = req.query.utilisateurID;

    db.serialize(() => {
        db.all(`SELECT userID as utilisateurID, date, distanceKm, consommationPour100Km, quantiteCO2 
                FROM voyages WHERE userID = ?`,
            [userID],
            (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ message: "Erreur lors de la récupération des voyages" });
                }
                return res.json({ voyages: rows });
            });
    });
});

const server = app.listen(8080, () => {
    console.log('Listening on port 8080...');
});