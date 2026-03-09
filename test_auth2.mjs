import { KLING_AK, KLING_SK } from './src/config_keys.js';
import pkg from 'kling-api';
// Depending on how kling-api is exported, let's try assuming it has Client or similar
// Or I can just write my own manual JWT script that strictly mimics python documentation

import jwt from 'jsonwebtoken';

async function testKlingStandard() {
    try {
        console.log("Testing Kolors Virtual Try-On directly...");
        const payload = {
            iss: KLING_AK,
            exp: Math.floor(Date.now() / 1000) + 1800,
            nbf: Math.floor(Date.now() / 1000) - 5
        };
        const token = jwt.sign(payload, KLING_SK, { algorithm: 'HS256' });

        console.log("Generated Token:", token);

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
testKlingStandard();
