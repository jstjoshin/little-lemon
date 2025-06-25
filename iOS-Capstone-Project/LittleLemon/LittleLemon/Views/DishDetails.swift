//
//  DishDetails.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/23/25.
//

import SwiftUI

struct DishDetails: View {
    @ObservedObject private var dish:Dish
    @Binding var isLoggedIn: Bool
    @Environment(\.dismiss) private var dismiss
    @Binding var showProfile: Bool
    @ObservedObject var userAvatarData: UserAvatarData
    @State private var showAlert = false
    init(
        dish: Dish,
        isLoggedIn: Binding<Bool>,
        showProfile: Binding<Bool>,
        userAvatarData: UserAvatarData
    ) {
        self.dish = dish
        self._isLoggedIn = isLoggedIn
        self._showProfile = showProfile
        self.userAvatarData = userAvatarData
    }

    var body: some View {
        VStack(spacing: 0) {
            NavBar(showProfile: $showProfile, userAvatarData: userAvatarData, showProfileButton: false)
            ScrollView {
                VStack(spacing: 10) {
                    Text(dish.title ?? "")
                    if let imageUrl = URL(string: dish.image ?? "") {
                        AsyncImage(url: imageUrl) { phase in
                            switch phase {
                            case .empty:
                                ProgressView()
                            case .success(let image):
                                image
                                    .resizable()
                                    .scaledToFit()
                                    .frame(width: 60, height: 60)
                                    .cornerRadius(8)
                            case .failure:
                                Image(systemName: "photo")
                                    .resizable()
                                    .frame(width: 60, height: 60)
                                    .foregroundColor(.gray)
                            @unknown default:
                                EmptyView()
                            }
                        }
                    }
                    Text(dish.price ?? "")
                    Text(dish.itemDesc ?? "")
                    Button("Add to Order") {
                        showAlert = true
                    }
                    .buttonStyle(.borderedProminent)
                    .padding()
                    .alert("Unable to order", isPresented: $showAlert) {
                        Button("OK", role: .cancel) { }
                    } message: {
                        Text("This feature is not enabled yet.")
                    }
                }
                .padding()
            }
        }
        .navigationBarBackButtonHidden(true)
    }
}


