const {Client} = require("pg");     //inkludera postgre
require("dotenv").config();         //inkludera dotenv filen

//anslutnings inställningar från env filen
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl:{
        rejectUnauthorized: false,
    },
});

//ansluter till databasen
client.connect((err) => {
    if (err) {
        console.log("Fel vid anslutning" + err);
    } else {
        console.log("Du är ansluten till din databas!");
    }
});

//skapa en tabell
client.query(`
DROP TABLE IF EXISTS courses;
CREATE TABLE courses(
id              SERIAL PRIMARY KEY,
coursecode      VARCHAR(7) NOT NULL,
coursename      VARCHAR(100) NOT NULL,
syllabus        VARCHAR(200),
progression     VARCHAR(1) NOT NULL,
created         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`);