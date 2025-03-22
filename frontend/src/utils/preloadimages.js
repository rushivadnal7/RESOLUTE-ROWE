export const preloadImages = async (imageUrls) => {
    const promises = imageUrls.map((url) => 
      new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve; // Handle errors gracefully
      })
    );
    await Promise.all(promises);
  };
  