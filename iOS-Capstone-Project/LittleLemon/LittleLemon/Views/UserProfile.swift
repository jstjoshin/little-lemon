//
//  UserProfile.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/19/25.
//

import SwiftUI
import PhotosUI

struct UserProfile: View {
    @Binding var isLoggedIn: Bool
    // not using @Environment(\.presentationMode) var presentation as it does not work as intended with navigation stack using the isLoggedIn variable set in the Onboarding file instead
    @Environment(\.dismiss) private var dismiss
    @State private var selectedItem: PhotosPickerItem? = nil
    @State private var selectedImageData: Data? = nil
    @AppStorage(kUserImageData) private var imageData: Data?
    @ObservedObject var userAvatarData: UserAvatarData
    
    var body: some View {
        
        
        let userFirstName = UserDefaults.standard.string(forKey: kFirstName) ?? ""
        let userLastName = UserDefaults.standard.string(forKey: kLastName) ?? ""
        let userEmail = UserDefaults.standard.string(forKey: kEmail) ?? ""
        VStack {
            Text("Personal Information").font(.title2)
            Text("Avatar")
            HStack {
                UserAvatarView(userAvatarData: userAvatarData)
                    .frame(width: 100, height: 100)
                PhotosPicker("Change", selection: $selectedItem, matching: .images)
                                    .buttonStyle(.bordered)
                Button("Remove") {
                    UserDefaults.standard.removeObject(forKey: kUserImageData)
                    userAvatarData.avatarImage = nil
                }
                .buttonStyle(.bordered)
            }
            Text(userFirstName)
            Text(userLastName)
            Text(userEmail)
            Button("Logout") {
                UserDefaults.standard.set(false, forKey: kIsLoggedIn)
                UserDefaults.standard.removeObject(forKey: kFirstName)
                UserDefaults.standard.removeObject(forKey: kLastName)
                UserDefaults.standard.removeObject(forKey: kEmail)
                UserDefaults.standard.removeObject(forKey: kUserImageData)
                isLoggedIn = false
                // self.presentation.wrappedValue.dismiss() as it does not work with navigationStack setting isLogged to false instead as it resets the stack
            }
            .buttonStyle(.borderedProminent)
            .padding()
            Spacer()
        }
        .padding()
        .onChange(of: selectedItem) {
            Task {
                if let data = try? await selectedItem?.loadTransferable(type: Data.self) {
                    selectedImageData = data
                    UserDefaults.standard.set(data, forKey: kUserImageData)
                    userAvatarData.avatarImage = UIImage(data: data)
                }
            }
        }
        .navigationBarBackButtonHidden(true)
        .toolbar {
            // Centered Logo
            ToolbarItem(placement: .principal) {
                Image("little-lemon-logo")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 40)
            }
            // Back Button
            ToolbarItem(placement: .navigationBarLeading) {
                Button(action: {
                    dismiss()
                }) {
                    Image("back-btn")
                        .resizable()
                        .scaledToFit()
                        .frame(height: 40)
                }
            }
        }
    }
}

#Preview {
    @Previewable @State var mockIsLoggedIn = true
    UserProfile(isLoggedIn: $mockIsLoggedIn, userAvatarData: UserAvatarData())
}
