import { setupMenuModal } from './modal.js';
import { showImagePreview, showDemoPreview, clearImagePreview, clearDemoPreview } from './previews.js';

setupMenuModal('menuToggle', 'menuModal', 'closeModal');
showImagePreview();
showDemoPreview();
clearImagePreview();
clearDemoPreview();


