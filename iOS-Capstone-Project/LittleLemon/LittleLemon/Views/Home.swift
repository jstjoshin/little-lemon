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
        NavBar(showProfile: $showProfile, userAvatarData: userAvatarData, showBackButton: false)
        NavigationStack {
        //using NavigationStack instead of TabView to match the design guidlines and flow
            VStack {
                Menu(isLoggedIn: $isLoggedIn, showProfile: $showProfile, userAvatarData: userAvatarData)
            }
            .environment(\.managedObjectContext, persistence.container.viewContext)
        }
        .navigationBarBackButtonHidden(true)
        .navigationDestination(isPresented: $showProfile) {
            UserProfile(isLoggedIn: $isLoggedIn, userAvatarData: userAvatarData, showProfile: $showProfile)
        }
    }
}

#Preview {
    @Previewable @State var mockIsLoggedIn = true
    @Previewable @State var mockShowProfile = false
    Home(isLoggedIn: $mockIsLoggedIn, showProfile: $mockShowProfile, userAvatarData: UserAvatarData())
}
