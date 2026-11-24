// Startss the server afte connecting to the database
require('dotenv').config();
const app = require('./src.config/database');

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PointerEvent, () => {
        console.log('QuickCrew server running on http://localhost"${PORT}');
    });
});