const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const LOG_DIR = path.join(__dirname, '../data/tracking_logs');

// Ensure log directory exists
async function ensureLogDir() {
    try {
        await fs.mkdir(LOG_DIR, { recursive: true });
    } catch(e) {}
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));

// Stealth tracking endpoint
app.get('/track', async (req, res) => {
    try {
        const data = req.query.data ? JSON.parse(Buffer.from(req.query.data, 'base64').toString()) : {};
        
        // Add server-side data
        const log = {
            id: uuidv4(),
            ip: req.ip || req.connection.remoteAddress,
            headers: req.headers,
            method: req.method,
            url: req.url,
            fingerprint: data,
            timestamp: new Date().toISOString()
        };

        // Write to rotating log files
        const logFile = path.join(LOG_DIR, `track_${new Date().toISOString().slice(0,10)}.jsonl`);
        await fs.appendFile(logFile, JSON.stringify(log) + '\n');
        
        // Invisible response
        res.status(200).set({
            'Content-Type': 'image/gif',
            'Content-Length': '43',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        }).send(Buffer.from('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64'));
        
    } catch(e) {
        // Silent fail
        res.status(200).send(Buffer.from('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64'));
    }
});

// Serve tracking script (obfuscated)
app.get('/stealth.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.set('Cache-Control', 'max-age=31536000');
    res.sendFile(path.join(__dirname, 'stealth-tracker.js'));
});

ensureLogDir().then(() => {
    app.listen(3000, () => console.log('Tracking server running on :3000'));
});
