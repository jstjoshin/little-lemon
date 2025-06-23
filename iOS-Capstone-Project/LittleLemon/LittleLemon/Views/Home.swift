//
//  Home.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/18/25.
//

import SwiftUI

struct Home: View {
    let persistence = PersistenceController.shared
    @Binding var isLoggedIn: Bool
    @Environment(\.dismiss) private var dismiss
    @Binding var showProfile: Bool
    @ObservedObject var userAvatarData: UserAvatarData
    
    var body: some View {
        NavigationStack {
        //using NavigationStack instead of TabView to match the design guidlines and flow
            VStack {
                Menu()
            }
            .environment(\.managedObjectContext, persistence.container.viewContext)
        }
        .navigationBarBackButtonHidden(true)
        .toolbar {
            // Centered Logo
            ToolbarItem(placement: .principal) {
                Image("little-lemon-logo")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 40)
                    .padding(.vertical, 20)
            }
            // Profile Button
            ToolbarItem(placement: .navigationBarTrailing) {
                Button(action: {
                    showProfile = true
                }) {
                    (UserAvatarView(userAvatarData: userAvatarData)
                        .frame(width: 40, height: 40))
                }
            }
        }
        .navigationDestination(isPresented: $showProfile) {
            UserProfile(isLoggedIn: $isLoggedIn, userAvatarData: userAvatarData)
        }
    }
}

#Preview {
    @Previewable @State var mockIsLoggedIn = true
    @Previewable @State var mockShowProfile = false
    return Home(isLoggedIn: $mockIsLoggedIn, showProfile: $mockShowProfile, userAvatarData: UserAvatarData())
}
