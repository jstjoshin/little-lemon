//
//  Hero.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/25/25.
//

import SwiftUI

struct Hero: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            VStack(alignment: .leading, spacing: -20) {
                Text("Little Lemon")
                    .font(.customVariableFont("MarkaziText-Medium", size: 64, weight: 0.0))
                    .foregroundColor(Color(hex: "#F4CE14"))
                Text("Chicago")
                    .font(.customVariableFont("MarkaziText-Regular", size: 40, weight: 0.0))
            }
            HStack(alignment: .top, spacing: 0) {
                Text("We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.")
                    .font(.customVariableFont("Karla-Regular_Medium", size: 18, weight: 0.0))
                    .frame(maxWidth: .infinity, alignment: .topLeading)
                    .fixedSize(horizontal: false, vertical: true)
                Image("hero-image")
                    .resizable()
                    .scaledToFill()
                    .frame(width: 140, height: 140)
                    .cornerRadius(16)
                    .padding(.leading, 10)
            }
        }
        .foregroundColor(Color(hex: "#ffffff"))
        .padding(.horizontal, 16)
        .padding(.bottom, 16)
        .background(Color(hex: "#495E57"))
    }
}
