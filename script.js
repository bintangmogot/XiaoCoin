document.addEventListener('DOMContentLoaded', () => {
  const hotspots = document.querySelectorAll('.hotspot');
  const popup = document.getElementById('popup');
  const popupContent = popup.querySelector('.popup-content');
  const popupButton = document.getElementById('popupButton');
  const videoContainer = document.querySelector('.video-container');

  function showPopup(hotspot) {
    const description = hotspot.getAttribute('data-description');
    const buttonText = hotspot.getAttribute('data-button');

    popupContent.textContent = description;
    popupButton.textContent = buttonText;

    // Hitung posisi hotspot relatif terhadap container video
    const hotspotRect = hotspot.getBoundingClientRect();
    const containerRect = videoContainer.getBoundingClientRect();

    // Letakkan popup tepat di bawah hotspot dengan offset 5px
    const top = hotspotRect.bottom - containerRect.top + 5;
    const left = hotspotRect.left - containerRect.left;
    popup.style.top = top + 'px';
    popup.style.left = left + 'px';

    popup.style.display = 'block';
  }

  function hidePopup() {
    popup.style.display = 'none';
  }

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener('mouseenter', () => {
      showPopup(hotspot);
    });
    hotspot.addEventListener('mouseleave', hidePopup);
  });

  popupButton.addEventListener('click', () => {
    alert('Tombol pada popup diklik!');
  });
});
