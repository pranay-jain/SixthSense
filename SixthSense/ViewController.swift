//
//  ViewController.swift
//  SixthSense
//
//  Created by Pranay Jain on 2016-08-19.
//  Copyright © 2016 foobar. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController {
    
    let captureSession = AVCaptureSession()
    var captureDevice : AVCaptureDevice?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let singleTapRecognizer = UITapGestureRecognizer(target: self, action: #selector(ViewController.handleSingleTap))
        singleTapRecognizer.numberOfTapsRequired = 1
        view.addGestureRecognizer(singleTapRecognizer)
        
        
        let doubleTapRecognizer = UITapGestureRecognizer(target: self, action: #selector(ViewController.handleDoubleTap))
        doubleTapRecognizer.numberOfTapsRequired = 2
        view.addGestureRecognizer(doubleTapRecognizer)
        
        let swipeRight = UISwipeGestureRecognizer(target: self, action: #selector(ViewController.handleSwipeRight))
        swipeRight.direction = .Right
        view.addGestureRecognizer(swipeRight)
        
        singleTapRecognizer.requireGestureRecognizerToFail(doubleTapRecognizer)
        
        
        captureSession.sessionPreset = AVCaptureSessionPresetLow
        
        let devices = AVCaptureDevice.devices()
        
        // Loop through all the capture devices on this phone
        for device in devices {
            // Make sure this particular device supports video
            if (device.hasMediaType(AVMediaTypeVideo)) {
                // Finally check the position and confirm we've got the back camera
                if(device.position == AVCaptureDevicePosition.Back) {
                    captureDevice = device as? AVCaptureDevice
                }
            }
        }
        
    }
    
    func handleSingleTap() {
        print("Single")
        let cameraManager =
    }
    
    func handleSwipeRight() {
        print("swiped")
    }
    
    func handleDoubleTap() {
        print("Double")
    }
    
}

