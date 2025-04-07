import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './Upload.module.css'; // Import CSS Module

const UploadForm: React.FC = () => {
  // State to hold the selected file (can be null if no file is selected)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // State to track if a file is being dragged over the drop zone
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  // New state for image preview URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Ref for the hidden file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [caption, setCaption] = useState<string>('');

  // Allowed file types and size limit (example)
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  const maxSizeMB = 10;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // Create preview when file is selected and cleanup on unmount
  useEffect(() => {
    // Create preview URL when a file is selected
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      
      // Cleanup function to revoke the object URL when no longer needed
      return () => {
        URL.revokeObjectURL(objectUrl);
        setPreviewUrl(null);
      };
    }
    return undefined;
  }, [selectedFile]);

  // --- Event Handlers ---

  // Handles file selection when the hidden input changes
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  // Processes a selected or dropped file (validation)
  const processFile = (file: File) => {
    // Basic validation
    if (!allowedTypes.includes(file.type)) {
      alert(`Invalid file type. Please select a PNG or JPG image.`);
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }
    if (file.size > maxSizeBytes) {
      alert(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }
    setSelectedFile(file);
  };

  // Clear file selection and preview
  const clearFileSelection = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering area click
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // Prevents default browser behavior for drag events
  const preventDefaults = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // Handles drag over event: prevent default and set dragging state
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(event);
    setIsDraggingOver(true);
  }, []);

  // Handles drag leave event: remove dragging state
  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(event);
    setIsDraggingOver(false);
  }, []);

  // Handles drop event: prevent default, get file, process it
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(event);
    setIsDraggingOver(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, []); // Dependencies: processFile (though it's stable here)

  // Handles the click on the main "Upload" button
  const handleUploadClick = () => {
    if (!selectedFile) {
      alert('Please select a file to upload first.');
      return;
    }

    console.log('Simulating upload for file:', selectedFile.name);
    console.log('File details:', selectedFile);

  };

  // Triggers the hidden file input when the drop zone is clicked
  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  // --- Render Logic ---

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.uploadForm}>
          <h2 className={styles.title}>Upload Image</h2>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept={allowedTypes.join(',')}
          />

          {/* Drop Zone Area */}
          <div
            className={`${styles.dropZone} ${isDraggingOver ? styles.dropZoneDraggingOver : ''} ${previewUrl ? styles.hasPreview : ''}`}
            onClick={handleAreaClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              // Display both file info and image preview
              <>
                {/* Image Preview */}
                {previewUrl && (
                  <div className={styles.imagePreviewContainer}>
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className={styles.imagePreview} 
                    />
                  </div>
                )}
                
                {/* File Info */}
                <div className={styles.fileInfo}>
                  <span className={styles.fileNameLabel}>Selected:</span>
                  <span className={styles.fileName}>{selectedFile.name}</span>
                  <span className={styles.fileSize}>
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                  <button
                    className={styles.removeFileButton}
                    onClick={clearFileSelection}
                    title="Remove file"
                  >
                    ×
                  </button>
                </div>
              </>
            ) : (
              // Display placeholder content
              <>
                {/* Image Icon SVG */}
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p className={styles.instructions}>Click to upload or drag and drop</p>
                <p className={styles.constraints}>PNG, JPG up to {maxSizeMB}MB</p>
              </>
            )}
          </div>
          {/* Caption field - only show when an image is selected */}
          {selectedFile && (
            <div className={styles.captionContainer}>
              <label htmlFor="image-caption" className={styles.captionLabel}>
                Caption
              </label>
              <textarea
                id="image-caption"
                className={styles.captionField}
                placeholder="Add a caption for this image..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          )}

          {/* Upload Button */}
          <button
            type="button"
            className={styles.uploadButton}
            onClick={handleUploadClick}
            disabled={!selectedFile}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;