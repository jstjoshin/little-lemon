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
    
    var body: some View {
        TabView {
            VStack {
                Menu()
            }
            .environment(\.managedObjectContext, persistence.container.viewContext)
            .tabItem {
                Label("Menu", systemImage: "list.dash")
            }
            
            VStack {
                UserProfile(isLoggedIn: $isLoggedIn)
            }
            .tabItem {
                Label("Profile", systemImage: "square.and.pencil")
            }
        }
        .navigationBarBackButtonHidden(true)
    }
}

#Preview {
    @Previewable @State var mockIsLoggedIn = true
    return Home(isLoggedIn: $mockIsLoggedIn)
}
