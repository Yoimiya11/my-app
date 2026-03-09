import { KLING_AK, KLING_SK } from './src/config_keys.js';
import jwt from 'jsonwebtoken';

async function testUrlPayload() {
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

        // Using public URLs
        const personUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop";
        const clothUrl = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop";

        console.log("\n--- TEST: Public URLs ---");
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    model_name: "kolors-virtual-try-on-v1",
                    humanImage: personUrl,
                    clothImage: clothUrl,
                    category: "upper_body"
                })
            });
            console.log("Status:", response.status);
            const text = await response.text();
            console.log("Body:", text);
        } catch (err) {
            console.log("Error:", err.message);
        }

    } catch (e) {
        console.error("error", e);
    }
}
testUrlPayload();
