document.addEventListener('DOMContentLoaded', function() {
    const cube = document.querySelector('.cube');
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationX = 0;
    let rotationY = 0;
    let velocityX = 0;
    let velocityY = 0;

    document.addEventListener('mousedown', function(e) {
        isDragging = true;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaX = e.clientX - previousMouseX;
            const deltaY = e.clientY - previousMouseY;
            previousMouseX = e.clientX;
            previousMouseY = e.clientY;

            velocityX = deltaX * 0.1;
            velocityY = deltaY * 0.1;
        }
    });

    let cubeScale = 1; // Initial scale of the cube

    document.addEventListener('wheel', function(e) {
        // Adjust the cube scale based on the scroll delta
        cubeScale += e.deltaY * -0.01;

        // Restrict the scale to a sensible range
        cubeScale = Math.min(Math.max(.5, cubeScale), 2);

        // Apply the scale transformation to the cube
        cube.style.transform = `scale(${cubeScale}) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    });

    // Update the animate function to include scale
    function animate() {
        if (isDragging) {
            rotationX -= velocityY;
            rotationY += velocityX;
        } else {
            velocityX *= 0.999;
            velocityY *= 0.999;
            rotationX -= velocityY;
            rotationY += velocityX;
        }

        cube.style.transform = `scale(${cubeScale}) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        requestAnimationFrame(animate);
    }

    animate();
});


