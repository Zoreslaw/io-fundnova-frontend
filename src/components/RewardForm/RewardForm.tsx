import React, { useEffect, useState } from 'react';
import { useCreateProjectContext } from '../../contexts/CreateProjectContext';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import CropModal from '../../CropModal/CropModal';
import { uploadImageToDrive } from '../../utils/imagesApi';
import { Reward } from '../../types/Reward';

type RewardFormProps = {
  onUpdate: (Rewards: Reward[]) => void
};

const RewardForm: React.FC<RewardFormProps> = ({onUpdate}) => {
  const { state, setState } = useCreateProjectContext();
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const [reward, setReward] = useState({
    title: '',
    price: 0,
    contents: "false",
    description: undefined as string | undefined,
    deadline: undefined as string | undefined,
    count: undefined as number | undefined,
    imageFile: undefined as File | undefined,
    imageUrl: undefined as string | undefined,
  });
  const [tempimageUrl, setTempimageUrl] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const handleRewardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setReward((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value || undefined,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTempimageUrl(URL.createObjectURL(file));
      setReward((prev) => ({
        ...prev,
        imageFile: file,
      }));
      setIsCropModalOpen(true);
      event.target.value = '';
    }
  };

  const handleCrop = async (croppedImage: Blob) => {
    setIsUploading(true);
    try {
      const uploadedURL = await uploadImageToDrive(new File([croppedImage], 'cropped.png'));
      setReward((prev) => ({
        ...prev,
        imageUrl: uploadedURL,
        imageFile: new File([croppedImage], 'cropped.png'),
      }));
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      setIsCropModalOpen(false);
      setTempimageUrl(undefined);
    }
  };

  const handleCropCancel = () => {
    setReward((prev) => ({
      ...prev,
      imageFile: undefined,
    }));
    setTempimageUrl(undefined);
    setIsCropModalOpen(false);
  };

  const handleImageDelete = () => {
    setReward((prev) => ({
      ...prev,
      imageFile: undefined,
      imageUrl: undefined,
    }));
  };

  const isAddButtonDisabled = !reward.title || reward.price <= 0;

  const addReward = () => {
    if (!isAddButtonDisabled) {
      setState((prev) => ({
        ...prev,
        rewards: [...(prev.rewards || []), { ...reward }],
      }));
      setReward({
        title: '',
        price: 0,
        contents: "false",
        description: undefined,
        deadline: undefined,
        count: undefined,
        imageFile: undefined,
        imageUrl: undefined,
      });
    }
  };

  const updateToParam = () => {
    onUpdate(state.rewards);
  }

  useEffect(() => {
    updateToParam();
  }, [state.rewards, updateToParam])

  return (
    <Box sx={{ marginTop: 5 }}>
      <Typography variant="h6" gutterBottom sx={{ marginBottom: 2.5 }}>
        Define Rewards
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Reward Title"
            name="title"
            fullWidth
            required
            value={reward.title}
            onChange={handleRewardChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Pledge Amount ($)"
            name="price"
            type="number"
            fullWidth
            required
            value={reward.price || ''}
            onChange={handleRewardChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Reward Description"
            name="description"
            multiline
            rows={3}
            fullWidth
            value={reward.description || ''}
            onChange={handleRewardChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Delivery Date"
            name="deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={reward.deadline || ''}
            onChange={handleRewardChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Number of Rewards Available"
            name="count"
            type="number"
            fullWidth
            value={reward.count || ''}
            onChange={handleRewardChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="contents"
                checked={reward.contents == "false"}
                onChange={handleRewardChange}
              />
            }
            label="Tangible Content (e.g., physical items)"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            color="primary"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
            <input
              type="file"
              hidden
              onChange={handleImageChange}
              accept="image/*"
            />
          </Button>
          {reward.imageUrl && (
            <Box mt={2}>
              <Card
                sx={{
                  display: 'block',
                  width: '100%',
                  maxWidth: 300,
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  image={reward.imageUrl}
                  alt="Reward Image"
                />
              </Card>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleImageDelete}
                sx={{ mt: 1 }}
              >
                Delete Image
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            disabled={isAddButtonDisabled}
            onClick={addReward}
          >
            Add Reward
          </Button>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Current Rewards
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {state.rewards.map((reward, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: '400px',
                boxShadow: 3,
              }}
            >
              {reward.imageUrl && (
                <CardMedia
                  component="img"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                  }}
                  image={reward.imageUrl}
                  alt={reward.title}
                />
              )}
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Typography variant="h6">{reward.title}</Typography>
                <Typography>Pledge Amount: ${reward.price}</Typography>
                {reward.description && <Typography>{reward.description}</Typography>}
                {reward.deadline && (
                  <Typography color="text.secondary">
                    📅 Delivery Date: {reward.deadline}
                  </Typography>
                )}
                {reward.count !== undefined && (
                  <Typography color="text.secondary">
                    📦 Available Count: {reward.count > 0 ? reward.count : 'Unlimited'}
                  </Typography>
                )}
                <Typography color="text.secondary">
                  📄 Tangible Content: {reward.contents ? 'Yes' : 'No'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <CropModal
        open={isCropModalOpen}
        onClose={handleCropCancel}
        onCrop={handleCrop}
        imageUrl={tempimageUrl || ''}
      />
    </Box>
  );
};

export default RewardForm;
