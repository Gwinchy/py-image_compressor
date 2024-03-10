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
        // Set the desired dimensions for the compressed image
        const maxWidth = width; // Adjust as needed
        const maxHeight = height; // Adjust as needed

        let width = img.width;
        let height = img.height;

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

        // Convert canvas to Blob (compressed image)
        canvas.toBlob((blob) => {
            const compressedImage = new File([blob], 'compressed_image.jpg', { type: 'image/jpeg' });

            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(compressedImage);
            downloadLink.download = 'compressed_image.jpg';
            downloadLink.textContent = 'Download Compressed Image';

            // Show alert when the download link is clicked
            downloadLink.addEventListener('click', () => {
                alert('Here is your compressed image.');
                // Reset the input field for the next upload
                inputElement.value = '';
            });

            // Append the download link below the "Compress" button
            const container = document.getElementById('container');
            container.appendChild(downloadLink);
        }, 'image/jpeg', 0.5); // Adjust compression quality (0.5 = 50% quality)
    };
}
