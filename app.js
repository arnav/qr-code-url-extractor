document.addEventListener('DOMContentLoaded', () => {
    const pasteButton = document.getElementById('paste-button');
    const previewCanvas = document.getElementById('preview');
    const resultDiv = document.getElementById('result');
    const urlLink = document.getElementById('url-link');
    const ctx = previewCanvas.getContext('2d');

    // Clear canvas with light background
    function clearCanvas() {
        ctx.fillStyle = '#f9f9f9';
        ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
    }

    // Initialize canvas
    clearCanvas();

    // Process image and extract QR code
    function processImage(image) {
        // Draw the image on the canvas
        const scale = Math.min(
            previewCanvas.width / image.width,
            previewCanvas.height / image.height
        );
        
        const scaledWidth = image.width * scale;
        const scaledHeight = image.height * scale;
        
        // Center the image on the canvas
        const offsetX = (previewCanvas.width - scaledWidth) / 2;
        const offsetY = (previewCanvas.height - scaledHeight) / 2;
        
        // Clear canvas before drawing
        clearCanvas();
        
        // Draw the image
        ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);
        
        // Get image data for QR code processing
        const imageData = ctx.getImageData(0, 0, previewCanvas.width, previewCanvas.height);
        
        // Process the QR code
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
            // QR code found
            displayResult(code.data);
            
            // Highlight the QR code location
            drawQRCodeOutline(code.location);
        } else {
            // No QR code found
            resultDiv.textContent = 'No QR code detected in the image';
            urlLink.style.display = 'none';
        }
    }
    
    // Draw outline around the detected QR code
    function drawQRCodeOutline(location) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#00FF00';
        ctx.beginPath();
        
        // Draw lines connecting the four points
        ctx.moveTo(location.topLeftCorner.x, location.topLeftCorner.y);
        ctx.lineTo(location.topRightCorner.x, location.topRightCorner.y);
        ctx.lineTo(location.bottomRightCorner.x, location.bottomRightCorner.y);
        ctx.lineTo(location.bottomLeftCorner.x, location.bottomLeftCorner.y);
        ctx.lineTo(location.topLeftCorner.x, location.topLeftCorner.y);
        
        ctx.stroke();
    }
    
    // Display the extracted URL
    function displayResult(data) {
        // Check if the data is a URL
        let isUrl = false;
        try {
            new URL(data);
            isUrl = true;
        } catch (e) {
            // Not a URL
        }
        
        // Display the result
        resultDiv.textContent = data;
        
        // If it's a URL, make it clickable
        if (isUrl) {
            urlLink.href = data;
            urlLink.textContent = 'Open URL';
            urlLink.style.display = 'block';
        } else {
            urlLink.style.display = 'none';
        }
    }
    
    // Handle paste button click
    pasteButton.addEventListener('click', async () => {
        try {
            // Request clipboard permission and read clipboard items
            const clipboardItems = await navigator.clipboard.read();
            
            // Look for image type in clipboard
            for (const clipboardItem of clipboardItems) {
                // Check if there's an image type
                const imageTypes = clipboardItem.types.filter(type => type.startsWith('image/'));
                
                if (imageTypes.length > 0) {
                    // Get the first image type
                    const imageType = imageTypes[0];
                    
                    // Get the blob
                    const blob = await clipboardItem.getType(imageType);
                    
                    // Create an image from the blob
                    const img = new Image();
                    img.onload = () => processImage(img);
                    img.src = URL.createObjectURL(blob);
                    
                    return; // Exit after processing the first image
                }
            }
            
            // No image found in clipboard
            resultDiv.textContent = 'No image found in clipboard. Copy a QR code image first.';
            urlLink.style.display = 'none';
            
        } catch (error) {
            console.error('Error accessing clipboard:', error);
            
            // Check if it's a permission error
            if (error.name === 'NotAllowedError') {
                resultDiv.textContent = 'Clipboard permission denied. Please allow clipboard access.';
            } else {
                resultDiv.textContent = 'Error accessing clipboard: ' + error.message;
            }
            
            urlLink.style.display = 'none';
        }
    });
});
