const newImg = new Image();

newImg.onload = () => {
    const monitorWidth = window.innerWidth; // Width of the monitor
    const monitorHeight = window.innerHeight; // Height of the monitor
    
    const imageWidth = newImg.width;
    const imageHeight = newImg.height;

    // Calculate the maximum width and height as 80% of the monitor's dimensions
    const maxWidth = 0.8 * monitorWidth;
    const maxHeight = 0.8 * monitorHeight;

    // Calculate aspect ratio
    const imageAspectRatio = imageWidth / imageHeight;
    const monitorAspectRatio = monitorWidth / monitorHeight;

    // Determine whether to set the maximum width or height based on aspect ratios
    if (imageAspectRatio > monitorAspectRatio) {
        // Image is wider than the monitor
        // Set maximum width to 80% of monitor width
        this.imgFrameDiv.style.maxWidth = maxWidth + "px";
        // Calculate corresponding height based on aspect ratio
        this.imgFrameDiv.style.maxHeight = (maxWidth / imageAspectRatio) + "px";
    } else {
        // Image is taller than or equal to the monitor
        // Set maximum height to 80% of monitor height
        this.imgFrameDiv.style.maxHeight = maxHeight + "px";
        // Calculate corresponding width based on aspect ratio
        this.imgFrameDiv.style.maxWidth = (maxHeight * imageAspectRatio) + "px";
    }
};

// Set the source of the image
newImg.src = "your_image_url_here";

/****************************************************************************************************************************** 
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Key Events</title>
</head>
<body>

<p>Press any key on the keyboard.</p>

<script>
*/
// Add event listener for keydown event
window.addEventListener('keydown', (event) => {
    // Display the key that was pressed
    console.log('Key pressed:', event.key);

    // Example: Check if the 'Enter' key was pressed
    if (event.key === 'Enter') {
        alert('Enter key pressed!');
    }

    // Example: Check if the 'Ctrl' key was pressed along with another key
    if (event.ctrlKey) {
        console.log('Ctrl key was pressed.');
    }

    // Example: Check if the 'Shift' key was pressed along with another key
    if (event.shiftKey) {
        console.log('Shift key was pressed.');
    }

    // Example: Prevent the default action for certain keys
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior (e.g., form submission)
    }
});
/*
</script>

</body>
</html>
*/
/*
We add an event listener for the keydown event on the window object.

Inside the event listener, we access the event object which contains information about the keyboard event.
We log the key that was pressed to the console.

We provide examples of checking if specific keys were pressed (Enter, Ctrl, Shift) and performing actions accordingly.

We show an example of preventing the default action for certain keys (Enter in this case), 
which prevents the default behavior such as form submission.

This example demonstrates the basics of handling keyboard events and accessing properties of the event object 
to perform different actions based on the user's input.
************************************************************************************************************************************
CSS pozicíok 

1. Static Position (position: static):

Elements with position: static are positioned according to the normal flow of the document.
Margins can be applied freely in all directions (top, right, bottom, left), and they will affect the layout of surrounding elements.

2. Relative Position (position: relative):

Elements with position: relative are positioned relative to their normal position in the document flow.
Margins behave similarly to static positioning, affecting the layout of surrounding elements.

3.Absolute Position (position: absolute):

Elements with position: absolute are removed from the normal document flow and positioned relative to the nearest positioned ancestor (an ancestor element with a position value other than static) or the initial containing block if no positioned ancestor is found.
Margins can be used, but they do not affect the layout of surrounding elements since absolutely positioned elements are taken out of the document flow.

4. Fixed Position (position: fixed):

Elements with position: fixed are removed from the normal document flow and positioned relative to the initial containing block, which is typically the viewport.
Margins can be applied, but they do not affect the layout of other elements on the page.

fontos az absolute meg a fixed, relative!!!!!

általában egy relative-ban szokott lenni egy absolute valami 
ha középre akarjuk helyezni 
->
.container {
    position: relative;
}

.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
************************************************************************************************************************************
CSS kód -> 
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
-> 
width: 100%; and height: 100%; set the width and height of the element to cover 100% of the width and height of its containing parent. 
Since the containing parent is not specified, these values refer to the viewport (the visible area of the web page in the browser window).

position: fixed; positions the element relative to the viewport, 
meaning it stays in the same position even when the page is scrolled.

left: 0; right: 0; bottom: 0; top: 0; set the distances of the element's edges from the corresponding edges of the viewport. 
By setting all edges to 0, the element covers the entire viewport with no gaps.

This CSS code is commonly used to create elements that overlay the entire page, 
such as modal dialogs, full-page overlays, or background elements. 
For example, if you have a modal dialog that you want to display in the center of the screen and cover the entire page, 
you might use this CSS to create a backdrop for the modal that fills the entire viewport.
***********************************************************************************************************************
fontos dolgok egy képnél!!!!!!!!!!!!!!!!!!!!!!
background-image: url();
background-size: modnjuk 80%;
background-repeat: no-repeat;
background-position: center;
cursor: pointer;
*******
    left: 0;
    right: 0;
    bottom: 15px;
    margin: auto;
-> 
left: 0; right: 0; 
sets the left and right edges of the element to be flush with the left and right edges of its containing parent. 
This essentially stretches the element horizontally to fill the entire width of its container.

bottom: 15px; positions the bottom edge of the element 15 pixels from the bottom edge of its containing parent.

margin: auto; centers the element horizontally within its containing parent. 
By setting the left and right margins to auto, the browser will automatically distribute the remaining space 
equally on both sides of the element, effectively centering it horizontally.

So, combining these properties, the element is stretched horizontally to fill the width of its containing parent,
positioned 15 pixels from the bottom of the parent, and centered horizontally within the parent. 
This is commonly used for elements like footers or fixed-position elements at the bottom of a page.

*/
