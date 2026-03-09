import { KLING_AK, KLING_SK } from './src/config_keys.js';
import jwt from 'jsonwebtoken';

async function testPoll(taskId) {
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

        const url = `https://api-beijing.klingai.com/v1/images/kolors-virtual-try-on/${taskId}`;

        console.log(`\n--- POLLING: ${taskId} ---`);
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Body:", JSON.stringify(data, null, 2));

    } catch (e) {
        console.error("error", e);
    }
}
// Using the taskId from previous successful submit
testPoll("858814388932341813");
