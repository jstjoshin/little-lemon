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
    @Binding var showProfile: Bool
    @State private var userFirstName: String = UserDefaults.standard.string(forKey: kFirstName) ?? ""
    @State private var userLastName: String = UserDefaults.standard.string(forKey: kLastName) ?? ""
    @State private var userEmail: String = UserDefaults.standard.string(forKey: kEmail) ?? ""
    @State private var userPhoneNumber: String = UserDefaults.standard.string(forKey: kPhoneNumber) ?? ""
    @State private var orderStatus: Bool = UserDefaults.standard.bool(forKey: kOrderStatus)
    @State private var passwordChanges: Bool = UserDefaults.standard.bool(forKey: kPasswordChanges)
    @State private var specialOffers: Bool = UserDefaults.standard.bool(forKey: kSpecialOffers)
    @State private var newsletter: Bool = UserDefaults.standard.bool(forKey: kNewsletter)
    
    
    var isFormValid: Bool {
        UserProfileValidator.isFormValid(
            first: userFirstName,
            last: userLastName,
            email: userEmail,
            phone: userPhoneNumber
        )
    }
    
    func formatPhoneNumber(_ number: String) -> String {
        let digits = number.filter(\.isWholeNumber)
        let prefix = String(digits.prefix(10))
        
        switch prefix.count {
        case 7...10:
            let area = prefix.prefix(3)
            let mid = prefix.dropFirst(3).prefix(3)
            let end = prefix.dropFirst(6)
            return "\(area)-\(mid)-\(end)"
        case 4...6:
            let area = prefix.prefix(3)
            let mid = prefix.dropFirst(3)
            return "\(area)-\(mid)"
        default:
            return prefix
        }
    }
    
    var body: some View {
        VStack(spacing: 0) {
            NavBar(showProfile: $showProfile, userAvatarData: userAvatarData, showProfileButton: false)
                .overlay(
                    Rectangle()
                        .frame(height: 1)
                        .foregroundColor(Color.gray.opacity(0.3)),
                    alignment: .bottom
                )
            ScrollView {
                VStack(spacing: 16) {
                    Text("Personal Information")
                        .font(.customVariableFont("Karla-Regular_ExtraBold", size: 20, weight: 0.0))
                        .foregroundColor(Color(hex: "#000000"))
                        .frame(maxWidth: .infinity, alignment: .leading)
                    HStack(spacing: 20) {
                        VStack {
                            Text("Avatar")
                                .font(.customVariableFont("Karla-Regular_Medium", size: 16, weight: 0.0))
                                .foregroundColor(Color(hex: "#000000"))
                            UserAvatarView(userAvatarData: userAvatarData)
                                .frame(width: 90, height: 90)
                                .foregroundColor(Color(hex: "#495E57"))
                        }
                        HStack(spacing: 20) {
                            PhotosPicker("Change", selection: $selectedItem, matching: .images)
                            .buttonStyle(SecondaryButtonStyle())
                            Button("Remove") {
                                UserDefaults.standard.removeObject(forKey: kUserImageData)
                                userAvatarData.avatarImage = nil
                            }
                            .buttonStyle(TertiaryButtonStyle())
                        }
                        .padding(.top, 38)
                    }
                    .padding(.bottom, 8)
                    
                    VStack(spacing: 16) {
                        LabeledTextField(label: "First Name*", placeholder: "Jane", text: $userFirstName)
                        LabeledTextField(label: "Last Name*", placeholder: "Doe", text: $userLastName)
                        LabeledTextField(label: "Email*", placeholder: "you@example.com", text: $userEmail)
                            .keyboardType(.emailAddress)
                        LabeledTextField(label: "Phone number", placeholder: "123-456-7890", text: $userPhoneNumber)
                            .keyboardType(.phonePad)
                            .onChange(of: userPhoneNumber) {
                                userPhoneNumber = formatPhoneNumber(userPhoneNumber)
                                }
                    }
                    
                    VStack(alignment: .leading, spacing: 16) {
                        Text("Email Notifications")
                            .font(.customVariableFont("Karla-Regular_ExtraBold", size: 20, weight: 0.0))
                            .foregroundColor(Color(hex: "#000000"))
                            .frame(maxWidth: .infinity, alignment: .leading)
                        Checkbox(isChecked: $orderStatus, label: "Order status updates")
                        Checkbox(isChecked: $passwordChanges, label: "Pasword changes")
                        Checkbox(isChecked: $specialOffers, label: "Special offers")
                        Checkbox(isChecked: $newsletter, label: "Newsletter")
                    }
                    .padding(.vertical, 16)
                    
                    HStack(spacing: 20) {
                        Button("Discard Changes") {
                            userFirstName = UserDefaults.standard.string(forKey: kFirstName) ?? ""
                            userLastName = UserDefaults.standard.string(forKey: kLastName) ?? ""
                            userEmail = UserDefaults.standard.string(forKey: kEmail) ?? ""
                            userPhoneNumber = UserDefaults.standard.string(forKey: kPhoneNumber) ?? ""
                            orderStatus = UserDefaults.standard.bool(forKey: kOrderStatus)
                            passwordChanges = UserDefaults.standard.bool(forKey: kPasswordChanges)
                            specialOffers = UserDefaults.standard.bool(forKey: kSpecialOffers)
                            newsletter = UserDefaults.standard.bool(forKey: kNewsletter)
                        }
                        .buttonStyle(TertiaryButtonStyle())
                        Button("Save") {
                            UserDefaults.standard.set(userFirstName, forKey: kFirstName)
                            UserDefaults.standard.set(userLastName, forKey: kLastName)
                            UserDefaults.standard.set(userEmail, forKey: kEmail)
                            UserDefaults.standard.set(userPhoneNumber, forKey: kPhoneNumber)
                            UserDefaults.standard.set(orderStatus, forKey: kOrderStatus)
                            UserDefaults.standard.set(passwordChanges, forKey: kPasswordChanges)
                            UserDefaults.standard.set(specialOffers, forKey: kSpecialOffers)
                            UserDefaults.standard.set(newsletter, forKey: kNewsletter)
                            showProfile.toggle()
                        }
                        .buttonStyle(SecondaryButtonStyle())
                        .disabled(!isFormValid)
                    }
                    .padding(.vertical, 8)
                    Button("Log Out") {
                        UserDefaults.standard.set(false, forKey: kIsLoggedIn)
                        UserDefaults.standard.removeObject(forKey: kFirstName)
                        UserDefaults.standard.removeObject(forKey: kLastName)
                        UserDefaults.standard.removeObject(forKey: kEmail)
                        UserDefaults.standard.removeObject(forKey: kPhoneNumber)
                        UserDefaults.standard.removeObject(forKey: kUserImageData)
                        UserDefaults.standard.removeObject(forKey: kOrderStatus)
                        UserDefaults.standard.removeObject(forKey: kPasswordChanges)
                        UserDefaults.standard.removeObject(forKey: kSpecialOffers)
                        UserDefaults.standard.removeObject(forKey: kNewsletter)
                        isLoggedIn = false
                        // self.presentation.wrappedValue.dismiss() as it does not work with navigationStack setting isLogged to false instead as it resets the stack
                    }
                    .buttonStyle(PrimaryButtonStyle())
                    .padding(.vertical, 16)
                }
                .padding(.vertical, 16)
            }
            .scrollIndicators(.hidden)
            .padding(.horizontal, 16)
            .onTapGesture {
                UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
            }
        }
        .navigationBarBackButtonHidden(true)
        .onChange(of: selectedItem) {
            Task {
                if let data = try? await selectedItem?.loadTransferable(type: Data.self) {
                    selectedImageData = data
                    UserDefaults.standard.set(data, forKey: kUserImageData)
                    userAvatarData.avatarImage = UIImage(data: data)
                }
            }
        }
    }
}

#Preview {
    @Previewable @State var mockIsLoggedIn = true
    @Previewable @State var mockShowProfile = false
    UserProfile(isLoggedIn: $mockIsLoggedIn, userAvatarData: UserAvatarData(), showProfile: $mockShowProfile)
}
