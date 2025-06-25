//
//  ExtensionFont.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/24/25.
//

import SwiftUI

extension Font {
    static func customVariableFont(_ name: String, size: CGFloat, weight: CGFloat) -> Font {
        let descriptor = UIFontDescriptor(name: name, size: size)
            .addingAttributes([
                .traits: [UIFontDescriptor.TraitKey.weight: weight]
            ])
        return Font(UIFont(descriptor: descriptor, size: size))
    }
}
