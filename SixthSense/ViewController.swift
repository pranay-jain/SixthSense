//
//  ViewController.swift
//  SixthSense
//
//  Created by Pranay Jain on 2016-08-19.
//  Copyright © 2016 foobar. All rights reserved.
//

import UIKit
import AVFoundation
import DKCamera
import Alamofire

class ViewController: UIViewController {

    
    @IBOutlet weak var imageView: UIImageView!
    
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

    }
    
    func handleSingleTap() {
        print("Single")
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
        let urlPath = ""
        let urlGetPath = ""
        let imageData = UIImagePNGRepresentation(image)
        let base64String = imageData!.base64EncodedStringWithOptions((NSDataBase64EncodingOptions(rawValue: 0)))
        
        print("Yo")
        
        Alamofire.request(.POST, urlPath, parameters: ["image": base64String])
        Alamofire.request(.GET, urlGetPath)
            .responseString { response in
                if response.result.isSuccess {
                    self.produceSpeech(response.result.value!)
                }
        }

    }
    
    func produceSpeech(text: String) {
        let synth = AVSpeechSynthesizer()
        var myUtterance = AVSpeechUtterance(string: "")
        myUtterance = AVSpeechUtterance(string: text)
        myUtterance.rate = 0.5
        synth.speakUtterance(myUtterance)
    }
    
    func handleSwipeRight() {
        print("swiped")
    }
    
    func handleDoubleTap() {
        print("Double")
    }
    
}

