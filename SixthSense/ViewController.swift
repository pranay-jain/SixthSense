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
        camera.didFinishCapturingImage = {(image: UIImage) in
            self.imageView.image = image
            
            self.dismissViewControllerAnimated(true, completion: nil)
        }
        self.presentViewController(camera, animated: true, completion: nil)
    }
    
    func handleSwipeRight() {
        print("swiped")
    }
    
    func handleDoubleTap() {
        print("Double")
    }
    
}

