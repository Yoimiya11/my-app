// Native fetch used

const API_KEY = '3d40f4d267844061bfa0728955a47c65.mNdUzPJvq5utGfLm';

async function testZhipu() {
    const endpoints = [
        'https://open.bigmodel.cn/api/paas/v4/tools/bg-removal',
        'https://open.bigmodel.cn/api/paas/v4/images/background-removal'
    ];

    for (const url of endpoints) {
        console.log(`Testing ${url}...`);
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image_url: 'https://picsum.photos/200'
                })
            });
            console.log(res.status);
            const data = await res.json();
            console.log(data);
        } catch (e) {
            console.log(e.message);
        }
    }
}
testZhipu();
