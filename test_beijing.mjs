import { KLING_AK, KLING_SK } from './src/config_keys.js';
import jwt from 'jsonwebtoken';

async function testNewBeijingPayload() {
    try {
        console.log("Testing Kolors Virtual Try-On with new payload schema...");
        const payload = {
            iss: KLING_AK,
            exp: Math.floor(Date.now() / 1000) + 1800,
            nbf: Math.floor(Date.now() / 1000) - 5
        };
        const token = jwt.sign(payload, KLING_SK, {
            algorithm: 'HS256',
            header: {
                "alg": "HS256",
                "typ": "JWT"
            }
        });

        const url = 'https://api-beijing.klingai.com/v1/images/kolors-virtual-try-on';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                model_name: "kolors-virtual-try-on-v1",
                humanImage: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                clothImage: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                category: "upper_body"
            })
        });
        const data = await response.json();
        console.log("Response:", data);
    } catch (e) {
        console.error("error", e);
    }
}
testNewBeijingPayload();
