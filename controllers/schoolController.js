import db from '../config/db.js';
import calculateDistance from '../utils/calculateDistance.js';

export const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude == null || longitude == null) {
        return res.status(400).send('All fields are required');
    }

    try {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        await db.execute(query, [name, address, latitude, longitude]);
        res.status(201).send('School added successfully');
    } catch (error) {
        res.status(500).send('Error adding school: ' + error.message);
    }
};

export const listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (latitude == null || longitude == null) {
        return res.status(400).send('Latitude and longitude are required');
    }

    try {
        const [rows] = await db.query('SELECT * FROM schools');
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const schools = rows.map((school) => {
            const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
            return { ...school, distance };
        });

        schools.sort((a, b) => a.distance - b.distance);

        res.json(schools);
    } catch (error) {
        res.status(500).send('Error fetching schools: ' + error.message);
    }
};
