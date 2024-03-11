function compressAndDownload() {
    const inputElement = document.getElementById('imageInput');
    const file = inputElement.files[0];

    if (!file) {
        alert('Please select an image.');
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        let width = img.width;
        let height = img.height;

        const maxWidth = width; 
        const maxHeight = height; 
        
        if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        }

        if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
            const compressedImage = new File([blob], `${file.name}_compressed.jpg`, { type: 'image/jpeg' });

            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(compressedImage);
            downloadLink.download = `${file.name}_compressed.jpg`;
            downloadLink.textContent = 'Download Compressed Image';

            downloadLink.addEventListener('click', () => {
                alert('Here is your compressed image.');
                inputElement.value = '';

                // Increment the downloaded image counter
                const counter = document.getElementById('downloadCounter');
                const currentCount = parseInt(counter.textContent) || 0;
                counter.textContent = (currentCount + 1).toString();

                // Update the button text to indicate that an image has been downloaded
                downloadLink.textContent = 'Image Downloaded';
                downloadLink.disabled = true;

                if (textContent === 'Image Downloaded') {
                    downloadLink.disabled = true;
                }
            });

            const container = document.getElementById('container');
            container.appendChild(downloadLink);
        }, 'image/jpeg', 0.5);
    };
}
