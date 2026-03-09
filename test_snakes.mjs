import { KLING_AK, KLING_SK } from './src/config_keys.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

async function testParamNames() {
    try {
        const avatarPath = path.join(process.cwd(), 'public', 'avatar.png');
        const garmentPath = path.join(process.cwd(), 'public', 'demo', 'blackHoodie.jpg');

        const avatarBase64 = fs.readFileSync(avatarPath).toString('base64');
        const garmentBase64 = fs.readFileSync(garmentPath).toString('base64');

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

        // TEST 1: model_image / garment_image
        console.log("\n--- TEST: model_image & garment_image ---");
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    model_name: "kolors-virtual-try-on-v1",
                    model_image: avatarBase64,
                    garment_image: garmentBase64,
                    category: "upper_body"
                })
            });
            console.log("Status:", response.status);
            console.log("Body:", await response.text());
        } catch (err) {
            console.log("Error:", err.message);
        }

    } catch (e) {
        console.error("error", e);
    }
}
testParamNames();
