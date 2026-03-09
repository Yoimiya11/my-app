import { KLING_AK, KLING_SK } from './src/config_keys.js';
import jwt from 'jsonwebtoken';

async function testVariousParams() {
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

        const url = 'https://api-beijing.klingai.com/v1/images/kolors-virtual-try-on';

        const tests = [
            { name: "human_image/cloth_image", body: { model_name: "kolors-virtual-try-on-v1", human_image: "test", cloth_image: "test" } },
            { name: "person_image/cloth_image", body: { model_name: "kolors-virtual-try-on-v1", person_image: "test", cloth_image: "test" } },
            { name: "model_image/garment_image", body: { model_name: "kolors-virtual-try-on-v1", model_image: "test", garment_image: "test" } },
            { name: "humanImage/clothImage", body: { model_name: "kolors-virtual-try-on-v1", humanImage: "test", clothImage: "test" } }
        ];

        for (const t of tests) {
            console.log(`\n--- TEST: ${t.name} ---`);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(t.body)
            });
            console.log("Status:", response.status);
            console.log("Body:", await response.text());
        }

    } catch (e) {
        console.error("error", e);
    }
}
testVariousParams();
