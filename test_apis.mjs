import { KLING_AK, KLING_SK, ZHIPU_KEY } from './src/config_keys.js';

async function testZhipu() {
    try {
        console.log("Testing Zhipu...");
        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/images/generations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${ZHIPU_KEY}` },
            body: JSON.stringify({ model: "cogview-3-plus", prompt: "A test image" })
        });
        const data = await response.json();
        console.log("Zhipu Response:", data);
    } catch (e) {
        console.error("Zhipu error", e);
    }
}

async function generateKlingToken() {
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
        iss: KLING_AK,
        exp: Math.floor(Date.now() / 1000) + 1800,
        nbf: Math.floor(Date.now() / 1000) - 5
    };

    // We'll use node crypto
    const crypto = await import('crypto');
    const headerB64 = Buffer.from(JSON.stringify(header)).toString('base64url');
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto.createHmac('sha256', KLING_SK).update(`${headerB64}.${payloadB64}`).digest('base64url');
    return `${headerB64}.${payloadB64}.${signature}`;
}

async function testKling() {
    try {
        console.log("Testing Kling...");
        const token = await generateKlingToken();
        const response = await fetch(`https://api.klingai.com/v1/images/kolors-virtual-try-on`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            // Just sending dummy data to see if we get auth error or validation error
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

async function main() {
    await testZhipu();
    await testKling();
}
main();
