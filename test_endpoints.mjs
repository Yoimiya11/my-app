import { KLING_AK, KLING_SK } from './src/config_keys.js';
import jwt from 'jsonwebtoken';

async function testChinaEndpoint() {
    try {
        console.log("Testing Kolors Virtual Try-On on Kuaishou China endpoint...");
        const payload = {
            iss: KLING_AK,
            exp: Math.floor(Date.now() / 1000) + 1800,
            nbf: Math.floor(Date.now() / 1000) - 5
        };
        const token = jwt.sign(payload, KLING_SK, { algorithm: 'HS256' });

        console.log("Generated Token:", token);

        // Try Kuaishou mainland API endpoint
        const endpoints = [
            'https://api.klingai.kuaishou.com/v1/images/kolors-virtual-try-on',
            'https://open.klingai.com/v1/images/kolors-virtual-try-on',
        ];

        for (const url of endpoints) {
            console.log(`\nTrying ${url}...`);
            try {
                const response = await fetch(url, {
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
                console.log("Response:", data);
            } catch (err) {
                console.log("Failed to connect or fetch:", err.message);
            }
        }
    } catch (e) {
        console.error("error", e);
    }
}
testChinaEndpoint();
