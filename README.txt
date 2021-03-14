--- Vintage Clock PWA 1.0 ---

--- Disclaimer ---
Vintage Clock PWA 1.0 written and created by Jeffrey B. Madden 03-14-2021.
All rights reserved. Any use of Vintage Clock App 1.0 can only be granted with permission of the owner Jeffrey B. Madden.

--- About Vintage Clock PWA 1.0 ---
This week I created a challenge for myself: to build a vintage-feel clock, as a progressive web app, that would be mobile friendly.

--- HTML ---
One parent wrapper div for the clock. That's it! I wanted Javascript to do the rest this time. I really wanted to emphasize the standalone approach with this application. Drop the div, drop the CSS, and drop the script tag and you are ready to go!

--- CSS ---
All CSS (except for body tag) is written relatively to the "#clock" ID so there are no naming conflicts with other stylesheets. Since my design only included one parent element to render, the CSS was much more simple to write as adaptable and screen-size friendly. With one parent element having a 1:1 aspect ratio, only two media queries were needed to check for "portrait", or "landscape" orientation. Then just set equal width and height units as "vw" or "vh" accordingly. All elements inside the parent wrapper are sized in percentages except for text. This way, the clock always fits within the screen size and is never clipped and all of the parent wrapper's children adapt with their parent's size.

--- Javascript ---
There are two challenges I needed to overcome:
   1. How to solve the problem of an element rotating counter clockwise when it is rotated from a higher number to a lower number. Clocks don't do that! And I did not want the rotation properties getting to large numbers. I want them to reset to zero as the Date object does. Resetting to zero rotates a hand counter clockwise.
   2. How to create the simulation of a shadow from the hands. I could have just made the clock as is and been done. But as always, I wanted to add that extra detail. Keep in mind, if the shadow is in the image itself, the appearance will look strange as that image is rotated, because the shadow gets rotated too!

--- How I solved these two challenges ---

--- Challenge 1 ---
I always try to avoid it if I can, but this time the only answer I could devise, was to use setTimeout. This is essential to my situation because of the nature of transitions in CSS3. So I used a reset function that is fired whenever a hand is trying to rotate from a higher degree to a lower degree. The idea is that when a hand reaches a full rotation, time is paused, the hand's transition property is set to "none" and THEN it's rotation can be reset to zero. Now all seems fine and well, but we need to restore the transition property after this scenario. Sounds easy, but as soon as you do, you will find that the damn "rewind" occurs! This is because we are restoring the transition during the time we are removing it, and transitions are rendered after my function finishes execution. So we need to let the execution of the function finish BEFORE we restore the transition. This is made possible by calling the function that restores the transition in a setTimeout. We just need to set the delay to something reliable like 400 so that we know execution of the function is truly finished. Although that is the downside to setTimeout, we just can't be sure  execution is finished. Although in my testing, a delay of 400 seemed to work fine.

--- Challenge 2 ---
It may sound strange, but many times my best ideas/solutions come when I'm in the bathroom taking care of business. haha. Well the idea occurred to me this time in just this situation! I thought "just use another blurred imaged that has the same shape as my hand, set it at a lower z-index, offset it's position, and rotate it along with the hand". This way, the mock "shadow" will always be in a realistic position relative to a "light source". Then I thought "wait a minute! I can just clone the original hand image and use CSS3 filter blur!". This gave me the control I needed so I could add parameters in my javascript that control the shadows properties like opacity, blur size, and position offsets. I also added a "height" parameter that mixes in to the higher hands styles so as to simulate height visually. The result came out really well in my opinion. Bear in mind, the way I wrote the resulting math for these operations means that changes to these parameters is very sensitive. So use small changes like decimals of 0.1-0.9.

--- PWA ---
Vintage Clock PWA 1.0 is designed as a PWA (Progressive Web Application). Just hit the "Add to Home Screen" button when on the page and you can then use Vintage Clock PWA 1.0 as a "phone app". A shortcut Icon is then added to the device's home screen.

--- Standalone ---
Vintage Clock PWA is built as a standalone feature. One external javascript document, one script tag at the end of the body, one wrapper div, and one stylesheet. All functions are constructed and loaded in one, self executing, anonymous function a.k.a. "closures".

--- Thank You ---
Thank you for reading this far. And thank you to any contributors.

