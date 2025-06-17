// GIF to Static Image Replacement Script
// This script finds icon-compete.gif images, allows them to play once, then replaces with static image

(function() {
  'use strict';
  
  // Configuration - you can modify these values
  const GIF_FILENAME = 'icon-compete-1.gif';
  const STATIC_IMAGE_URL = 'https://www.constructconnect.com/hubfs/GIFs_SVGs/project_data_icon_svg.svg'; // Replace with your static image URL
  const REPLACEMENT_DELAY = 2000; // Delay in milliseconds before replacing (adjust as needed)
  
  function replaceGifWithStatic() {
    // Find all img elements that contain the target GIF filename
    const gifImages = document.querySelectorAll(`img[src*="${GIF_FILENAME}"]`);
    
    console.log(`Found ${gifImages.length} images containing "${GIF_FILENAME}"`);
    
    if (gifImages.length === 0) {
      return; // No matching GIFs found
    }
    
    gifImages.forEach(function(img, index) {
      // Skip if already processed
      if (img.dataset.gifReplaced === 'true') {
        console.log(`Image ${index + 1} already processed, skipping`);
        return;
      }
      
      console.log(`Processing image ${index + 1}:`, img.src);
      
      // Mark as processed to prevent double replacement
      img.dataset.gifReplaced = 'true';
      
      // Store original src for potential fallback
      const originalSrc = img.src;
      
      // Set a timeout to replace the GIF after it has time to play
      setTimeout(function() {
        console.log(`Replacing image ${index + 1} with static image`);
        
        // Create a new image element to preload the static image
        const staticImg = new Image();
        
        staticImg.onload = function() {
          console.log(`Static image loaded successfully for image ${index + 1}`);
          
          // Replace the src with the static image
          img.src = STATIC_IMAGE_URL;
          
          // Also replace the srcset with SVG versions to ensure proper display at all screen sizes
          if (img.srcset) {
            // Create new srcset with SVG at different sizes
            const svgSrcset = [
              `${STATIC_IMAGE_URL}?width=51&height=51 51w`,
              `${STATIC_IMAGE_URL}?width=101&height=101 101w`,
              `${STATIC_IMAGE_URL}?width=152&height=152 152w`,
              `${STATIC_IMAGE_URL}?width=202&height=202 202w`,
              `${STATIC_IMAGE_URL}?width=253&height=253 253w`,
              `${STATIC_IMAGE_URL}?width=303&height=303 303w`
            ].join(', ');
            img.srcset = svgSrcset;
            console.log(`Updated srcset for image ${index + 1}:`, svgSrcset);
          }
          
          // Preserve any existing classes, alt text, and other attributes
          // The img element itself is replaced in the DOM, but we keep all attributes
        };
        
        staticImg.onerror = function() {
          // If static image fails to load, keep the original GIF
          console.warn('Static image failed to load, keeping original GIF:', STATIC_IMAGE_URL);
          img.dataset.gifReplaced = 'false'; // Allow retry
        };
        
        // Start loading the static image
        staticImg.src = STATIC_IMAGE_URL;
        
      }, REPLACEMENT_DELAY);
    });
  }
  
  // Run the replacement function when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceGifWithStatic);
  } else {
    // DOM is already ready
    replaceGifWithStatic();
  }
  
  // Also run on window load to catch any dynamically loaded images
  window.addEventListener('load', function() {
    // Small delay to ensure all images are loaded
    setTimeout(replaceGifWithStatic, 100);
  });
  
  // Optional: Run periodically to catch any dynamically added images
  // Uncomment the following lines if you need to handle dynamically loaded content
  /*
  setInterval(function() {
    replaceGifWithStatic();
  }, 5000); // Check every 5 seconds
  */
  
})();
