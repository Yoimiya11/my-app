import https from 'https';

https.get('https://docs.qingque.cn/d/home/eZQAyImcbaS0fz-8ANjXvU5ed?identityId=2Cn18n4EIHT', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        // Regex for URLs that look like API endpoints
        const apiRegex = /https?:\/\/[a-zA-Z0-9.-]+\/v1\/?[a-zA-Z0-9.\-_\/]*/g;
        const matches = data.match(apiRegex);
        if (matches) {
            console.log("Found possible endpoints:", [...new Set(matches)]);
        } else {
            console.log("No endpoint matches found in raw HTML.");
        }
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
