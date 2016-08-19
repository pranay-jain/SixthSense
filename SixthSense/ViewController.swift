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
import AlamofireImage
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
            sendRequest(image)
            self.imageView.image = image
            
            self.dismissViewControllerAnimated(true, completion: nil)
        }
        self.presentViewController(camera, animated: true, completion: nil)
    }
    
    func sendRequest(image: UIImage) {
        let urlPath = ""
        //Alamofire.upload(.POST, urlPath, )
    }
    
    func handleSwipeRight() {
        print("swiped")
    }
    
    func handleDoubleTap() {
        print("Double")
    }
    
}

