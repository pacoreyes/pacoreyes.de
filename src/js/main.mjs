/**
 * This module provides functionality for the site's components
 */

// Project lightbox functionality
function setupProjectLightbox() {
  // DOM elements
  const lightbox = document.getElementById('project-lightbox');
  if (!lightbox) return; // Exit if lightbox doesn't exist on this page

  const closeBtn = document.querySelector('.close-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDescription = document.getElementById('lightbox-description');
  const prevButton = document.getElementById('prev-image');
  const nextButton = document.getElementById('next-image');

  // State variables
  let currentProjectIndex = 0;
  let currentImageIndex = 0;
  let projectsData = [];

  // Get projects data from the embedded JSON
  function getProjectsData() {
    // Try to get data from the embedded JSON first
    const projectsElement = document.getElementById('projects-data');
    if (projectsElement) {
      try {
        projectsData = JSON.parse(projectsElement.textContent).projects;
        return;
      } catch (e) {
        console.error('Error parsing embedded projects data:', e);
      }
    }

    // If embedded data is not available, use hardcoded fallback data
    console.warn('Using fallback projects data');
    projectsData = [
      {
        name: "Project 1",
        description: "Project 1 description",
        thumbnail: "images/project1_thumb.jpg",
        picture1: "images/picture1.webp",
        picture2: "images/picture2.png",
        picture3: "images/picture3.png"
      },
      {
        name: "Project 2",
        description: "Project 2 description",
        thumbnail: "images/project2_thumb.png",
        picture1: "images/project2_picture1.jpg",
        picture2: "images/project2_picture2.webp",
        picture3: "images/project2_picture3.png"
      }
    ];
  }

  // Open lightbox with project details
  function openLightbox(projectIndex) {
    if (!projectsData || projectsData.length === 0) return;

    currentProjectIndex = projectIndex;
    currentImageIndex = 0; // Reset to first image

    const project = projectsData[projectIndex];
    updateLightboxContent();

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Update lightbox content based on current indices
  function updateLightboxContent() {
    const project = projectsData[currentProjectIndex];

    // Get the current image path based on the image index
    const imagePaths = [
      project.picture1,
      project.picture2,
      project.picture3
    ];

    const currentImagePath = imagePaths[currentImageIndex];

    // Update the lightbox content
    lightboxImage.src = `/${currentImagePath}`;
    lightboxImage.alt = project.name;
    lightboxTitle.textContent = project.name;

    // Handle description with potential links
    lightboxDescription.innerHTML = project.description;

    // Add technologies below the description
    const technologiesContainer = document.getElementById('lightbox-technologies');
    if (technologiesContainer && project.technologies && project.technologies.length > 0) {
      // Clear previous technologies
      technologiesContainer.innerHTML = '';

      // Create paragraph element similar to skills section
      const techParagraph = document.createElement('p');

      // Add each technology as a span
      project.technologies.forEach(tech => {
        const techSpan = document.createElement('span');
        techSpan.textContent = tech;
        techParagraph.appendChild(techSpan);
      });

      // Add the paragraph to the container
      technologiesContainer.appendChild(techParagraph);
    }
  }

  // Navigate to previous image
  function prevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
    } else {
      currentImageIndex = 2; // Wrap to last image
    }
    updateLightboxContent();
  }

  // Navigate to next image
  function nextImage() {
    if (currentImageIndex < 2) {
      currentImageIndex++;
    } else {
      currentImageIndex = 0; // Wrap to first image
    }
    updateLightboxContent();
  }

  // Event listeners
  closeBtn.addEventListener('click', closeLightbox);

  // Close when clicking outside the content
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Image navigation
  prevButton.addEventListener('click', prevImage);
  nextButton.addEventListener('click', nextImage);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    }
  });

  // Add click event listeners to project thumbnails and titles
  document.querySelectorAll('.project-thumb-img, .project-title').forEach(element => {
    element.addEventListener('click', () => {
      const projectIndex = parseInt(element.getAttribute('data-project-index'), 10);
      openLightbox(projectIndex);
    });
  });

  // Initialize by getting projects data
  getProjectsData();
}

// Initialize the UI when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  setupProjectLightbox();
});

// Export functions for potential external use
export { setupProjectLightbox };
