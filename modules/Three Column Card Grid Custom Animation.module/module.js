// GIF to Static Image Replacement Script
// This script finds icon-compete.gif images, allows them to play once, then replaces with static image

(function() {
  'use strict';
  
  // Configuration - you can modify these values
  const GIF_FILENAMES = [
    'icon-compete-1.gif',
    'bid.gif', 
    'data-icon.gif'
  ];
  
  const STATIC_IMAGE_URLS = [
    'https://www.constructconnect.com/hubfs/GIFs_SVGs/project_data_icon_svg.svg',
    'https://2347101.fs1.hubspotusercontent-na1.net/hubfs/2347101/icons_landing%20page_Project%20Data%20copy.svg', // Replace with your second static image URL
    'https://2347101.fs1.hubspotusercontent-na1.net/hubfs/2347101/icons_landing%20page_Project%20Data.svg'  // Replace with your third static image URL
  ];
  
  const REPLACEMENT_DELAY = 2000; // Delay in milliseconds before replacing (adjust as needed)
  
  function replaceGifWithStatic() {
    // Process each GIF filename
    GIF_FILENAMES.forEach(function(gifFilename, gifIndex) {
      // Find all img elements that contain the current GIF filename
      const gifImages = document.querySelectorAll(`img[src*="${gifFilename}"]`);
      
      console.log(`Found ${gifImages.length} images containing "${gifFilename}"`);
      
      if (gifImages.length === 0) {
        return; // No matching GIFs found for this filename
      }
      
      gifImages.forEach(function(img, index) {
        // Skip if already processed
        if (img.dataset.gifReplaced === 'true') {
          console.log(`Image ${index + 1} (${gifFilename}) already processed, skipping`);
          return;
        }
        
        console.log(`Processing image ${index + 1} (${gifFilename}):`, img.src);
        
        // Mark as processed to prevent double replacement
        img.dataset.gifReplaced = 'true';
        
        // Store original src for potential fallback
        const originalSrc = img.src;
        
        // Set a timeout to replace the GIF after it has time to play
        setTimeout(function() {
          console.log(`Replacing image ${index + 1} (${gifFilename}) with static image`);
          
          // Create a new image element to preload the static image
          const staticImg = new Image();
          
          staticImg.onload = function() {
            console.log(`Static image loaded successfully for image ${index + 1} (${gifFilename})`);
            
            // Replace the src with the static image
            img.src = STATIC_IMAGE_URLS[gifIndex];
            
            // Also replace the srcset with SVG versions to ensure proper display at all screen sizes
            if (img.srcset) {
              // Create new srcset with SVG at different sizes
              const svgSrcset = [
                `${STATIC_IMAGE_URLS[gifIndex]}?width=51&height=51 51w`,
                `${STATIC_IMAGE_URLS[gifIndex]}?width=101&height=101 101w`,
                `${STATIC_IMAGE_URLS[gifIndex]}?width=152&height=152 152w`,
                `${STATIC_IMAGE_URLS[gifIndex]}?width=202&height=202 202w`,
                `${STATIC_IMAGE_URLS[gifIndex]}?width=253&height=253 253w`,
                `${STATIC_IMAGE_URLS[gifIndex]}?width=303&height=303 303w`
              ].join(', ');
              img.srcset = svgSrcset;
              console.log(`Updated srcset for image ${index + 1} (${gifFilename}):`, svgSrcset);
            }
            
            // Preserve any existing classes, alt text, and other attributes
            // The img element itself is replaced in the DOM, but we keep all attributes
          };
          
          staticImg.onerror = function() {
            // If static image fails to load, keep the original GIF
            console.warn('Static image failed to load, keeping original GIF:', STATIC_IMAGE_URLS[gifIndex]);
            img.dataset.gifReplaced = 'false'; // Allow retry
          };
          
          // Start loading the static image
          staticImg.src = STATIC_IMAGE_URLS[gifIndex];
          
        }, REPLACEMENT_DELAY);
      });
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
