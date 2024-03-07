function showAllPhotos() {
    var allPhotoGallery = document.getElementById('allPhotos')
    for (let i = 1; i <= 16; i++) {
        var newPhoto = document.createElement('div');
        newPhoto.className = 'photo';
        newPhoto.id = 'photo'+i;
        newPhoto.innerHTML = '<img src="./images/portrait/portrait_'+i+'.jpg" alt=""></img>';
        allPhotoGallery.appendChild(newPhoto);
    }

    for (let i = 1; i <= 6; i++) {
        var newPhoto = document.createElement('div');
        newPhoto.className = 'photo';
        newPhoto.id = 'photo'+(i+22);
        newPhoto.innerHTML = '<img src="./images/landscape/landscape_'+i+'.jpg" alt=""></img>';
        allPhotoGallery.appendChild(newPhoto);
    }

    // Display the modal
    document.getElementById('myModal').style.display = 'block';

}
  
function closeModal() {
    // Close the modal
    document.getElementById('myModal').style.display = 'none';
}