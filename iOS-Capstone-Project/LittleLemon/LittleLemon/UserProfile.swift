//
//  UserProfile.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/19/25.
//

import SwiftUI

struct UserProfile: View {
    @Binding var isLoggedIn: Bool
    // not using @Environment(\.presentationMode) var presentation as it does not work as intended with navigation stack using the isLoggedIn variable set in the Onboarding file instead
    
    var body: some View {
        let userFirstName = UserDefaults.standard.string(forKey: kFirstName) ?? ""
        let userLastName = UserDefaults.standard.string(forKey: kLastName) ?? ""
        let userEmail = UserDefaults.standard.string(forKey: kEmail) ?? ""
        VStack {
            Text("Personal Information")
            Image("profile-image-placeholder")
                .resizable()
                .frame(width: 100, height: 100)
            Text(userFirstName)
            Text(userLastName)
            Text(userEmail)
            Button("Logout") {
                UserDefaults.standard.set(false, forKey: kIsLoggedIn)
                UserDefaults.standard.removeObject(forKey: kFirstName)
                UserDefaults.standard.removeObject(forKey: kLastName)
                UserDefaults.standard.removeObject(forKey: kEmail)
                isLoggedIn = false
                // self.presentation.wrappedValue.dismiss() as it does not work with navigationStack setting isLogged to false instead as it resets the stack
            }
            .buttonStyle(.borderedProminent)
            .padding()
            Spacer()
        }
        .padding()
    }
}

#Preview {
    @Previewable @State var mockIsLoggedIn = true
    return UserProfile(isLoggedIn: $mockIsLoggedIn)
}
