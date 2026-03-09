// Native fetch used
const API_KEY = '3d40f4d267844061bfa0728955a47c65.mNdUzPJvq5utGfLm';

async function testZhipuSegmentation() {
    try {
        // Zhipu's latest multimodal models can sometimes handle segmentation via tools or specialized endpoints
        // I will try to probe 'tools/segmentation' or 'images/segmentations'
        const resp = await fetch('https://open.bigmodel.cn/api/paas/v4/images/segmentations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'glm-4v',
                image_url: 'https://img.yzcdn.cn/upload_files/2021/04/16/FovsY4X_-Pz-r-j-t-u-H-S-v-m-u-l.jpg'
            })
        });
        console.log('Status:', resp.status);
        const text = await resp.text();
        console.log('Body:', text);
    } catch (e) {
        console.error(e);
    }
}

testZhipuSegmentation();
