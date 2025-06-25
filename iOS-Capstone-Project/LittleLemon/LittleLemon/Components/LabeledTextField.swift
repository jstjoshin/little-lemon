//
//  LabeledTextField.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/25/25.
//

import SwiftUI

struct LabeledTextField: View {
    let label: String
    let placeholder: String
    @Binding var text: String

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(label)
                .font(.customVariableFont("Karla-Regular_Medium", size: 16, weight: 0.0))
                .foregroundColor(Color(hex: "#000000"))
            TextField(placeholder, text: $text)
                .font(.customVariableFont("Karla-Regular_Medium", size: 19, weight: 0.0))
                .padding(10)
                .background(Color(hex: "#ffffff"))
                .foregroundColor(Color(hex: "#000000"))
                .cornerRadius(8)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(Color(hex: "#656565"), lineWidth: 1)
                )
        }
    }
}
