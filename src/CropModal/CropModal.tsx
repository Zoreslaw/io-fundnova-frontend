import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface CropModalProps {
  open: boolean;
  onClose: () => void;
  onCrop: (croppedImage: Blob) => void;
  imageUrl: string;
}

const CropModal: React.FC<CropModalProps> = ({ open, onClose, onCrop, imageUrl }) => {
  const [cropper, setCropper] = useState<Cropper | null>(null);

  const handleCrop = async () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 600, // Итоговая ширина обрезанного изображения
        height: 340, // Итоговая высота (16:9)
      });
      const croppedBlob = await new Promise<Blob | null>((resolve) =>
        croppedCanvas.toBlob(resolve, 'image/png')
      );
      if (croppedBlob) {
        onCrop(croppedBlob);
      }
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: '50%', margin: 'auto', mt: '5%', backgroundColor: 'white', p: 2 }}>
        <Cropper
          src={imageUrl}
          style={{ height: 200, width: '100%' }} // Уменьшаем высоту отображаемого изображения
          aspectRatio={16 / 9} // Сохраняем фиксированное соотношение сторон
          guides={true}
          cropBoxResizable={false}
          cropBoxMovable={true}
          onInitialized={(instance) => setCropper(instance)}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCrop}>
            Crop
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CropModal;
