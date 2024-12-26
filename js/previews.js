export function showImagePreview() {
    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            
            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const imagePreview = document.getElementById('image-preview');
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                    document.getElementById('clear-image').style.visibility = 'visible';
                };

                reader.readAsDataURL(file);
            }
        });
    }
}

export function showDemoPreview() {
    const demoInput = document.getElementById('demo');
    if (demoInput) {
        demoInput.addEventListener('change', function (event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const demoPreview = document.getElementById('demo-preview');
                    demoPreview.src = e.target.result;
                    demoPreview.style.display = 'block';
                    document.getElementById('clear-demo').style.visibility = 'visible';
                };

                reader.readAsDataURL(file);
            }
        });
    }
}

export function clearImagePreview() {
    const clearImageButton = document.getElementById('clear-image');
    if (clearImageButton) {
        clearImageButton.addEventListener('click', function () {
            document.getElementById('image').value = '';

            const imagePreview = document.getElementById('image-preview');
            imagePreview.style.display = 'none';
            imagePreview.src = '';

            document.getElementById('clear-image').style.visibility = 'hidden';
        });
    }
}

export function clearDemoPreview() {
    const clearDemoButton = document.getElementById('clear-demo');
    if (clearDemoButton) {
        clearDemoButton.addEventListener('click', function () {
            document.getElementById('demo').value = '';

            const demoPreview = document.getElementById('demo-preview');
            demoPreview.style.display = 'none';
            demoPreview.src = '';

            document.getElementById('clear-demo').style.visibility = 'hidden';
        });
    }
}