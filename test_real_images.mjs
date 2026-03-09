import { KLING_AK, KLING_SK } from './src/config_keys.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

async function testRealImages() {
    try {
        console.log("Reading real local test images...");
        // Use default avatar and one of the local demo images
        const avatarPath = path.join(process.cwd(), 'public', 'avatar.png');
        const garmentPath = path.join(process.cwd(), 'public', 'demo', 'blackHoodie.jpg');

        if (!fs.existsSync(avatarPath) || !fs.existsSync(garmentPath)) {
            console.log("Test images not found, aborting.");
            return;
        }

        const avatarBase64 = fs.readFileSync(avatarPath).toString('base64');
        const garmentBase64 = fs.readFileSync(garmentPath).toString('base64');

        console.log(`Avatar B64 length: ${avatarBase64.length}`);
        console.log(`Garment B64 length: ${garmentBase64.length}`);

        const payload = {
            iss: KLING_AK,
            exp: Math.floor(Date.now() / 1000) + 1800,
            nbf: Math.floor(Date.now() / 1000) - 5
        };
        const token = jwt.sign(payload, KLING_SK, {
            algorithm: 'HS256',
            header: { "alg": "HS256", "typ": "JWT" }
        });

        const url = 'https://api-beijing.klingai.com/v1/images/kolors-virtual-try-on';

        // TEST 1: RAW base64
        console.log("\n--- TEST 1: RAW Base64 ---");
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    model_name: "kolors-virtual-try-on-v1",
                    humanImage: avatarBase64,
                    clothImage: garmentBase64,
                    category: "upper_body"
                })
            });
            console.log("RAW B64 Response Status:", response.status);
            const text = await response.text();
            console.log("RAW B64 Response Body:", text);
        } catch (err) {
            console.log("RAW B64 Error:", err.message);
        }

        // TEST 2: With data:image prefix
        console.log("\n--- TEST 2: Prefixed Base64 ---");
        try {
            const response2 = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    model_name: "kolors-virtual-try-on-v1",
                    humanImage: `data:image/png;base64,${avatarBase64}`,
                    clothImage: `data:image/png;base64,${garmentBase64}`,
                    category: "upper_body"
                })
            });
            console.log("Prefixed B64 Response Status:", response2.status);
            const text2 = await response2.text();
            console.log("Prefixed B64 Response Body:", text2);
        } catch (err) {
            console.log("Prefixed B64 Error:", err.message);
        }

    } catch (e) {
        console.error("error", e);
    }
}
testRealImages();
