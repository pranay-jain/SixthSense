//
//  ViewController.swift
//  SixthSense
//
//  Created by Pranay Jain on 2016-08-19.
//  Copyright © 2016 foobar. All rights reserved.
//

import UIKit
import AVFoundation
import Foundation
import DKCamera
import Alamofire
import AudioToolbox

class ViewController: UIViewController {

    @IBOutlet weak var text: UILabel!
    @IBOutlet weak var subText: UILabel!
    let synth = AVSpeechSynthesizer()
    var myUtterance = AVSpeechUtterance(string: "")
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.produceSpeech(text.text!)
        self.produceSpeech(subText.text!)

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

    }
    
    func handleSingleTap() {
        print("Single")
        //showCamera()
        sendRequest(UIImage())
    }
    
    func showCamera() {
        let camera = DKCamera()
        camera.didCancel = { () in
            print("didCancel")
            
            self.dismissViewControllerAnimated(true, completion: nil)
        }
        
        camera.didFinishCapturingImage = {(image: UIImage) in
            dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_LOW, 0)) {
                self.sendRequest(image)
                dispatch_async(dispatch_get_main_queue()) {
                    //self.imageView.image = image
                    //self.dismissViewControllerAnimated(true, completion: nil)
                    
                }
            }
            
            
        }
        self.presentViewController(camera, animated: true, completion: nil)

    }
    
    func sendRequest(image: UIImage) {
        let urlPath = "http://172.20.10.8:3000/echo"
//        let imageData = UIImageJPEGRepresentation(image, 0.2)
//        let base64String = imageData!.base64EncodedStringWithOptions((NSDataBase64EncodingOptions(rawValue: 0)))
        
//        faceDetection(imageData)
//       
//        Alamofire.upload(.POST, urlPath, multipartFormData: { multipartFormData in
//            multipartFormData.appendBodyPart(data:imageData!, name: "photo")
//            },
//            encodingCompletion: { encodingResult in
//                switch encodingResult {
//                case .Success(let upload, _, _):
//                    upload.responseJSON { response in
//                        print(response.result.value)
//                    }
//                case .Failure(let encodingError):
//                    print(encodingError)
//                    
//                }
//            }
//        )
//      Alamofire.request(.POST, urlPath, parameters: ["image": base64String])

        Alamofire.request(.GET, urlPath)
            .responseString { response in
                if response.result.isSuccess {
                    print(response.result.value!)
                    self.produceSpeech(response.result.value!)
                }
        }
    }
    
    func produceSpeech(text: String) {
        myUtterance = AVSpeechUtterance(string: text)
        myUtterance.rate = 0.5
        synth.speakUtterance(myUtterance)
    }
    
    func handleSwipeRight() {
        print("swiped")
        

    }
    
    func handleDoubleTap() {
        print("Double")
        let path = "http://172.20.10.8:3000/hi"
        Alamofire.request(.GET, path)
            .responseString() { response in
                print(response.result.value)
                if let val = response.result.value  {
                    if val == "key=True" {
                        AudioServicesPlayAlertSound(SystemSoundID(kSystemSoundID_Vibrate))
                        self.produceSpeech("Warning! You have an obstacle ahead")
                    }
                } else {
                    print("You're good")
                }
        }

    }
    
    func sshConnect(args: String...) {

    }

    
    func faceDetection(data:NSData?) {
    
    }
    
}

