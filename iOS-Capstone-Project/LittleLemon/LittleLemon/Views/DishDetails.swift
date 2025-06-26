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
            
                VStack(spacing: 16) {
                    if let imageUrl = URL(string: dish.image ?? "") {
                        AsyncImage(url: imageUrl) { phase in
                            switch phase {
                            case .empty:
                                ProgressView()
                            case .success(let image):
                                image
                                    .resizable()
                                    .scaledToFill()
                                    .frame(maxWidth: .infinity, maxHeight: 250)
                                    .clipped()
                            case .failure:
                                Image(systemName: "photo")
                                    .resizable()
                                    .scaledToFill()
                                    .frame(width: 83, height: 83)
                                    .clipped()
                                    .foregroundColor(.gray)
                            @unknown default:
                                EmptyView()
                            }
                        }
                    }
                    VStack(spacing: 16) {
                        HStack {
                            Text(dish.title ?? "")
                            .font(.customVariableFont("Karla-Regular_Bold", size: 20, weight: 0.0))
                            .foregroundColor(Color(hex: "#000000"))
                            Spacer()
                            Text("$\(dish.price ?? "0").00")
                            .font(.customVariableFont("Karla-Regular_Medium", size: 20, weight: 0.0))
                        }
                        Text(dish.itemDesc ?? "")
                        .font(.customVariableFont("Karla-Regular", size: 19, weight: 0.0))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        Spacer()
                        Button("Add to Order"){
                            showAlert = true
                        }
                        .buttonStyle(PrimaryButtonStyle())
                        .alert("Unable to add to your order", isPresented: $showAlert) {
                            Button("OK", role: .cancel) { }
                        } message: {
                            Text("This feature has not been enabled yet.")
                        }
                    }
                    .foregroundColor(Color(hex: "#495E57"))
                    .padding(16)
                }
        }
        .navigationBarBackButtonHidden(true)
    }
}


