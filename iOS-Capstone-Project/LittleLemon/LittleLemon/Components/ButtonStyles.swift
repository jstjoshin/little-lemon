//
//  ButtonStyles.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/25/25.
//

import SwiftUI

struct PrimaryButtonStyle: ButtonStyle {
    @Environment(\.isEnabled) private var isEnabled
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .frame(maxWidth: .infinity)
            .font(.customVariableFont("Karla-Regular_ExtraBold", size: 20, weight: 0.0))
            .padding(16)
            .background(isEnabled ? Color(hex: "#F4CE14") : Color(hex: "#E5E5E5"))
            .foregroundColor(Color(hex: "#000000"))
            .cornerRadius(16)
            .opacity(isEnabled ? (configuration.isPressed ? 0.8 : 1.0) : 0.5)
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
    }
}

struct SecondaryButtonStyle: ButtonStyle {
    @Environment(\.isEnabled) private var isEnabled
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .lineLimit(1)
            .fixedSize(horizontal: true, vertical: false)
            .frame(maxWidth: .infinity)
            .font(.customVariableFont("Karla-Regular_Bold", size: 19, weight: 0.0))
            .padding(16)
            .background(isEnabled ? Color(hex: "#495E57") : Color(hex: "#E5E5E5"))
            .foregroundColor(isEnabled ? Color(hex: "#ffffff") : Color(hex: "#000000"))
            .cornerRadius(16)
            .opacity(isEnabled ? (configuration.isPressed ? 0.8 : 1.0) : 0.3)
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
    }
}

struct TertiaryButtonStyle: ButtonStyle {
    @Environment(\.isEnabled) private var isEnabled
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .lineLimit(1)
            .fixedSize(horizontal: true, vertical: false)
            .frame(maxWidth: .infinity)
            .font(.customVariableFont("Karla-Regular_Bold", size: 19, weight: 0.0))
            .padding(16)
            .background(Color(hex: "#EDEFEE"))
            .foregroundColor(Color(hex: "#495E57"))
            .cornerRadius(16)
            .opacity(isEnabled ? (configuration.isPressed ? 0.8 : 1.0) : 0.3)
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
    }
}

struct ScalingButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .opacity(configuration.isPressed ? 0.8 : 1.0)
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
    }
}
