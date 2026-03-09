import { KLING_AK, KLING_SK } from './src/config_keys.js';
import jwt from 'jsonwebtoken';

async function probeUpload() {
    try {
        const payload = {
            iss: KLING_AK,
            exp: Math.floor(Date.now() / 1000) + 1800,
            nbf: Math.floor(Date.now() / 1000) - 5
        };
        const token = jwt.sign(payload, KLING_SK, {
            algorithm: 'HS256',
            header: { "alg": "HS256", "typ": "JWT" }
        });

        const url = 'https://api-beijing.klingai.com/v1/images/upload';

        console.log("\n--- PROBING: /v1/images/upload ---");
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    file_name: "test.png",
                    type: "image"
                })
            });
            console.log("Status:", response.status);
            const data = await response.json();
            console.log("Body:", JSON.stringify(data, null, 2));
        } catch (err) {
            console.log("Error:", err.message);
        }

    } catch (e) {
        console.error("error", e);
    }
}
probeUpload();
