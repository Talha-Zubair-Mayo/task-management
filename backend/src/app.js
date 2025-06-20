const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const config = require('./config');
const ensureDatabase = require('./utils/ensureDatabase');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();


app.use(cors("*"));
app.use(express.json());


app.use(`${config.api.prefix}/auth`, authRoutes);
app.use(`${config.api.prefix}/tasks`, taskRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running!' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: config.env === 'development' ? err.message : undefined
    });
});


(async () => {
    try {
        await ensureDatabase();
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        await sequelize.sync();
        console.log('Database synchronized successfully.');

        app.listen(config.port, () => {
            console.log(`Server is running in ${config.env} mode on port ${config.port}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
})();