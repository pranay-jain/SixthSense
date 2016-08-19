//
//  ViewController.swift
//  SixthSense
//
//  Created by Pranay Jain on 2016-08-19.
//  Copyright © 2016 foobar. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let singleTapRecognizer = UITapGestureRecognizer(target: self, action: #selector(ViewController.handleSingleTap))
        singleTapRecognizer.numberOfTapsRequired = 1
        view.addGestureRecognizer(singleTapRecognizer)
        
        
        let doubleTapRecognizer = UITapGestureRecognizer(target: self, action: #selector(ViewController.handleDoubleTap))
        doubleTapRecognizer.numberOfTapsRequired = 2
        view.addGestureRecognizer(doubleTapRecognizer)
        
        singleTapRecognizer.requireGestureRecognizerToFail(doubleTapRecognizer)
        
    }
    
    func handleSingleTap() {
        print("Single")
    }
    
    func handleDoubleTap() {
        print("Double")
    }
    
}

