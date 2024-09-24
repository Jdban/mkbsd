// ==UserScript==
// @name         Display Images from JSON
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fetches JSON and displays images marked by "dhd"
// @author       Nadim Kobeissi
// @match        https://storage.googleapis.com/panels-api/data/20240916/media-1a-i-p~s
// @grant        none
// ==/UserScript==

(async function() {
    const url = 'https://storage.googleapis.com/panels-api/data/20240916/media-1a-i-p~s';
    
    async function fetchData() {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON: ${response.statusText}`);
        }
        return await response.json();
    }

    function displayImages(data) {
        const imagesContainer = document.createElement('div');
        imagesContainer.style.display = 'flex';
        imagesContainer.style.flexWrap = 'wrap';
        document.body.innerHTML = ''; // Clear existing content
        document.body.appendChild(imagesContainer);

        for (const key in data) {
            const subproperty = data[key];
            if (subproperty && subproperty.dhd) {
                const img = document.createElement('img');
                img.src = subproperty.dhd;
                img.style.width = '200px'; // Set image width
                img.style.margin = '5px'; // Add margin
                imagesContainer.appendChild(img);
            }
        }
    }

    try {
        const jsonData = await fetchData();
        const data = jsonData.data;
        if (!data) {
            throw new Error('JSON does not have a "data" property.');
        }
        displayImages(data);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
