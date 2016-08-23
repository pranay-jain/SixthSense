Sixth Sense 
==============
An iOS App made in **Swift** that aims to aid the visually impaired. 

This app works with **Raspberry Pi** with an Ultrasound sensor and a camera input. It uses the sensor as a proximity detector. The camera is used to capture nearby photos and can identify nearby objects using the *Clarifai* API. *(usage planned to be extended to facial recognition. Code in place for face-detection using Raspberry Pi camera)*
The app works on a **Node.JS** server. All the data received at the server is translated back to the user using text-to-speech conversion through their earphones.   