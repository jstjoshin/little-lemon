//
//  NavBar.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/24/25.
//

import SwiftUI

struct NavBar: View {
    @Environment(\.dismiss) private var dismiss
    @Binding var showProfile: Bool
    @ObservedObject var userAvatarData: UserAvatarData
    
    var showBackButton: Bool = true
    var showProfileButton: Bool = true
    
    var body: some View {
        HStack {
            if showBackButton {
                Button(action: {
                    dismiss()
                }) {
                    Image("back-btn")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 40, height: 40)
                }
            } else if !showBackButton {
                VStack {
                    EmptyView()
                }
                .frame(width: 40, height: 40)
            }
            Spacer()
            Image("little-lemon-logo")
                .resizable()
                .scaledToFit()
                .frame(height: 40)
            Spacer()
            if showProfileButton {
                Button(action: {
                    showProfile = true
                }) {
                    (UserAvatarView(userAvatarData: userAvatarData)
                        .frame(width: 40, height: 40))
                }
            }
            else if !showProfileButton {
                VStack {
                    EmptyView()
                }
                .frame(width: 40, height: 40)
            }
        }
        .padding(.horizontal, 15)
        .padding(.top, 0)
        .padding(.bottom, 15)
    }
}

//#Preview {
  //  NavBar()
//}
