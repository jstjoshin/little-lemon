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
let kIsLoggedIn = "kIsLoggedIn"

struct Onboarding: View {
    @State private var firstName: String = ""
    @State private var lastName: String = ""
    @State private var email: String = ""
    @State private var isLoggedIn = false
    var isFormValid: Bool {
        !firstName.isEmpty && !lastName.isEmpty && !email.isEmpty && email.contains("@") && email.contains(".")
    }
    
    var body: some View {
        NavigationStack {
            // NavigationStack & navigationDestination used in place of depricated NaivigationLink & isActive
            VStack(spacing: 16) {
                Text("Register")
                    .font(.headline)
                    .padding(.bottom,30)
                TextField("First Name", text: $firstName)
                    .textFieldStyle(.roundedBorder)
                TextField("Last Name", text: $lastName)
                    .textFieldStyle(.roundedBorder)
                TextField("Email", text: $email)
                    .textFieldStyle(.roundedBorder)
                    .keyboardType(.emailAddress)
                Button("Register"){
                    // Using .disabled and isFormValid in place of if statement
                    UserDefaults.standard.set(firstName, forKey: kFirstName)
                    UserDefaults.standard.set(lastName, forKey: kLastName)
                    UserDefaults.standard.set(email, forKey: kEmail)
                    UserDefaults.standard.set(true, forKey: kIsLoggedIn)
                    
                    firstName = ""
                    lastName = ""
                    email = ""
                    
                    isLoggedIn = true
                }
                .buttonStyle(.borderedProminent)
                .padding()
                .disabled(!isFormValid)
                .navigationDestination(isPresented: $isLoggedIn) {
                    Home(isLoggedIn: $isLoggedIn)
                }
            }
            .padding(30)
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
