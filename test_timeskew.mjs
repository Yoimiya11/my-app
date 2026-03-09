import { KLING_AK, KLING_SK } from './src/config_keys.js';
import jwt from 'jsonwebtoken';

async function testTimeSkew() {
    try {
        console.log("Testing with real-world time adjustment...");
        // Our system time is 2026, real world is likely 2025
        // Let's use an arbitrary recent 2025 timestamp or fetch real time
        const realTimeResponse = await fetch('https://api.klingai.com/');
        const serverTimeString = realTimeResponse.headers.get('date');
        let currentUnixTime;
        if (serverTimeString) {
            currentUnixTime = Math.floor(new Date(serverTimeString).getTime() / 1000);
            console.log("Kling Server Time (Unix):", currentUnixTime);
        } else {
            console.log("Could not get server time, subtracting 1 year from local...");
            currentUnixTime = Math.floor(Date.now() / 1000) - (365 * 24 * 60 * 60);
        }

        const payload = {
            iss: KLING_AK,
            exp: currentUnixTime + 1800,
            nbf: currentUnixTime - 5
        };
        const token = jwt.sign(payload, KLING_SK, { algorithm: 'HS256' });

        console.log("Generated Token with adjusted time:", token);

        const response = await fetch(`https://api.klingai.com/v1/images/kolors-virtual-try-on`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                model_name: "kolors-virtual-try-on-v1",
                model_image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                garment_image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                category: "upper_body"
            })
        });
        const data = await response.json();
        console.log("Kling Response:", data);
    } catch (e) {
        console.error("Kling error", e);
    }
}
testTimeSkew();
