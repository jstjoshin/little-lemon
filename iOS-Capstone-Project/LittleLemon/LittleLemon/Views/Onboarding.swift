//
//  Onboarding.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/18/25.
//
import SwiftUI

let kFirstName = "first name key"
let kLastName = "last name key"
let kEmail = "email key"
let kIsLoggedIn = "is logged in key"
let kUserImageData = "user image data key"

struct Onboarding: View {
    @State private var firstName: String = ""
    @State private var lastName: String = ""
    @State private var email: String = ""
    @State private var isLoggedIn = false
    @State private var showProfile = false
    @State private var avatarData: Data? = nil
    @StateObject private var keyboard = KeyboardResponder()
    
    var isFormValid: Bool {
        !firstName.isEmpty && !lastName.isEmpty && !email.isEmpty && email.contains("@") && email.contains(".")
    }
    
    var body: some View {
        NavigationStack {
            // NavigationStack & navigationDestination used in place of depricated NaivigationLink & isActive
            VStack(alignment: .leading, spacing: 0) {
                NavBar(showProfile: $showProfile, userAvatarData: UserAvatarData(), showBackButton: false, showProfileButton: false)
                    .padding(.top, 20)
                Hero()
                VStack(spacing: 20) {
                    Text("Join now to start your order")
                        .font(.customVariableFont("Karla-Regular_ExtraBold", size: 20, weight: 0.0))
                        .foregroundColor(Color(hex: "#000000"))
                        .frame(maxWidth: .infinity, alignment: .leading)
                    LabeledTextField(label: "First Name*", placeholder: "Jane", text: $firstName)
                    LabeledTextField(label: "Last Name*", placeholder: "Doe", text: $lastName)
                    LabeledTextField(label: "Email*", placeholder: "you@example.com", text: $email)
                        .keyboardType(.emailAddress)
                    
                    Button("Sign Up"){
                        // Using .disabled and isFormValid in place of if statement
                        UserDefaults.standard.set(firstName, forKey: kFirstName)
                        UserDefaults.standard.set(lastName, forKey: kLastName)
                        UserDefaults.standard.set(email, forKey: kEmail)
                        UserDefaults.standard.set(true, forKey: kIsLoggedIn)
                        UserDefaults.standard.set(avatarData, forKey: kUserImageData)
                        
                        firstName = ""
                        lastName = ""
                        email = ""
                        
                        isLoggedIn = true
                    }
                    .buttonStyle(PrimaryButtonStyle())
                    .padding(.vertical, 16)
                    .disabled(!isFormValid)
                    .navigationDestination(isPresented: $isLoggedIn) {
                        Home(isLoggedIn: $isLoggedIn, showProfile: $showProfile, userAvatarData: UserAvatarData())
                    }
                    Spacer()
                }
                .padding(16)
            }
            .padding(.bottom, keyboard.keyboardHeight)
            .animation(.easeOut(duration: 0.2), value: keyboard.keyboardHeight)
            .onTapGesture {
                UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
            }
            .onAppear {
                if UserDefaults.standard.bool(forKey: kIsLoggedIn) {
                    isLoggedIn = true
                }
            }
        }
    }
}

#Preview {
    Onboarding()
}
