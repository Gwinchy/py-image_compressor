document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('compressAndDownloadBtn').addEventListener('click', () => {
        const files = document.getElementById('imageInput').files;
        compressAndDownloadMultiple([...files]);
    });
});

function compressAndDownloadMultiple(files) {
    console.log('Received files:', files);
    const container = document.getElementById('container');
    const downloadCounter = document.getElementById('downloadCounter');

    const imageStack = [...files];

    function processNextImage() {
        if (imageStack.length === 0) {
            console.log('All images processed.');
            return;
        }
        const file = imageStack.pop();

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let width = img.width;
            let height = img.height;

            const maxWidth = 800; // Set maximum width for compressed image
            const maxHeight = 600; // Set maximum height for compressed image

            if (width > maxWidth || height > maxHeight) {
                const aspectRatio = width / height;
                if (aspectRatio > 1) {
                    width = maxWidth;
                    height = maxWidth / aspectRatio;
                } else {
                    width = maxHeight * aspectRatio;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                const compressedImage = new File([blob], `${file.name}_compressed.jpg`, { type: 'image/jpeg' });

                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(compressedImage);
                downloadLink.download = `${file.name}_compressed.jpg`;
                downloadLink.textContent = `Download Compressed Image`;

                downloadLink.addEventListener('click', () => {
                    alert('Here is your compressed image.');

                    const currentCount = parseInt(downloadCounter.textContent) || 0;
                    downloadCounter.textContent = (currentCount + 1).toString();

                    downloadLink.textContent = 'Image Downloaded';
                    downloadLink.disabled = true;

                    processNextImage();
                });

                container.appendChild(downloadLink);
            }, 'image/jpeg', 0.7); // Adjust compression quality if needed
        };
    }

    processNextImage();
}
