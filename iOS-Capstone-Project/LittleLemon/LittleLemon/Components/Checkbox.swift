//
//  Checkbox.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/25/25.
//

import SwiftUI

struct Checkbox: View {
    @Binding var isChecked: Bool
        var label: String

        var body: some View {
            Button(action: {
                isChecked.toggle()
            }) {
                HStack {
                    Image(isChecked ? "checkbox-checked" : "checkbox-unchecked")
                        .resizable()
                        .scaledToFill()
                        .frame(width: 24, height: 24)
                    Text(label)
                        .font(.customVariableFont("Karla-Regular_Medium", size: 16, weight: 0.0))
                        .foregroundColor(Color(hex: "#000000"))
                    Spacer()
                }
            }
            .buttonStyle(.plain)
            .frame(maxWidth: .infinity)
        }
}
