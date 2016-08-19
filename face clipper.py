#From OpenCV docs

import numpy
import cv2

video_capture = cv2.VideoCapture(0)
faceCascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
clickPhoto=False
while(True):
    # Capture frame-by-frame
    ret, frame = video_capture.read()
    ret, orig = video_capture.read()
    # Our operations on the frame come here
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(
            gray,
            scaleFactor=1.2,
            minNeighbors=10,
            minSize=(30, 30),
            flags=cv2.cv.CV_HAAR_SCALE_IMAGE
        )
    (x2,y2,w2,h2)=(0,0,0,0)
    faceNum=0
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        if(clickPhoto==True):
            crop_img = orig[y-int(h*0.1):y+int(h*1.1),x-int(0.1*w):x+int(w*1.1)]
            #crop_img = orig[y: y+h,x:x+w]
        #     cv2.imwrite('lel'+str(faceNum)+'.png',crop_img)
            cv2.imwrite('lel'+str(faceNum)+'.png',crop_img)
            faceNum+=1
    clickPhoto=False
    # Display the resulting frame
    #cv2.imshow("cropped", crop_img)
    cv2.imshow('Webcam',frame)

    if cv2.waitKey(1) & 0xFF == ord('p'):
            clickPhoto=True  
            
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
video_capture.release()
cv2.destroyAllWindows()