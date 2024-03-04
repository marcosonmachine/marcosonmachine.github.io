
// saves current time in local Sotrage with a value key
function setImageSavingTimeToStorage(key) {
    const unixTimeHours = Math.floor(Date.now() / (1000 * 60 * 60));
    localStorage.setItem(key, unixTimeHours);
}

// Sets Image from storage as background
function setImageFromStorage() {
    const cache_image_url = localStorage.getItem("storedImage");
    document.getElementById("background").style.backgroundImage = `url(${cache_image_url})`;
}

// return true if image is old
function CompareValueByTime(key, hourDifference) {
    const key_value = localStorage.getItem(key);
    const currentUnixHours = Math.floor(Date.now() / (1000 * 60 * 60));
    const IsOld = key_value - currentUnixHours > hourDifference || key_value == null;
    return IsOld;
}

// Main Function
// Fetch image, from local storage or url
// Save and retrieves
async function FetchUnsplashImage() {
    const imageUrl = 'https://source.unsplash.com/random/1920x1080/?wide&wallpaper&nature';
    const imageStorageKey = 'storedImage';
    const imageTimeStorageKey = 'imageTime'

    const IsImageOld = CompareValueByTime(imageTimeStorageKey, 5)
    if (IsImageOld === false) {
        return setImageFromStorage();
    }

    await fetch(imageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
            }
            return response.blob();
        })
        .then(blob => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        })
        .then(blobData => {
            // Store the blob data url in localStorage
            localStorage.setItem(imageStorageKey, blobData);

            // Store Image saving time in localStorage
            setImageSavingTimeToStorage(imageTimeStorageKey);
            setImageFromStorage();
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}
