//
//  UINavigationController.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/23/25.
//

import UIKit
import SwiftUI

class CustomBackButtonNavController: UINavigationController {
    override func viewDidLoad() {
        super.viewDidLoad()

        let backImage = UIImage(systemName: "list.bullet")

        navigationBar.backIndicatorImage = backImage
        navigationBar.backIndicatorTransitionMaskImage = backImage

        // Optional: Remove back button title text
        let appearance = UINavigationBarAppearance()
        appearance.configureWithOpaqueBackground()
        appearance.backButtonAppearance.normal.titleTextAttributes = [.foregroundColor: UIColor.clear]
        navigationBar.standardAppearance = appearance
        navigationBar.scrollEdgeAppearance = appearance
    }
}

class CustomHostingController<Content: View>: UIHostingController<Content> {
    override init(rootView: Content) {
        super.init(rootView: rootView)
    }

    @objc required dynamic init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
