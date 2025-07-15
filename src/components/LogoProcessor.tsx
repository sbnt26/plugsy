import { useEffect, useState } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface LogoProcessorProps {
  originalLogoUrl: string;
  onProcessed: (processedLogoUrl: string) => void;
}

export const LogoProcessor = ({ originalLogoUrl, onProcessed }: LogoProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processLogo = async () => {
      try {
        setIsProcessing(true);
        
        // Fetch the original logo
        const response = await fetch(originalLogoUrl);
        const blob = await response.blob();
        
        // Load as image element
        const imageElement = await loadImage(blob);
        
        // Remove background
        const processedBlob = await removeBackground(imageElement);
        
        // Create URL for the processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        
        onProcessed(processedUrl);
      } catch (error) {
        console.error('Error processing logo:', error);
        // Fallback to original logo if processing fails
        onProcessed(originalLogoUrl);
      } finally {
        setIsProcessing(false);
      }
    };

    processLogo();
  }, [originalLogoUrl, onProcessed]);

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return null;
};