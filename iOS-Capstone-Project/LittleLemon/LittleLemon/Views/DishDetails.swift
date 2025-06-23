//
//  DishDetails.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/23/25.
//

import SwiftUI

struct DishDetails: View {
    @ObservedObject private var dish:Dish
    init(_ dish:Dish) {
        self.dish = dish
    }
    @Environment(\.dismiss) private var dismiss

    var body: some View {
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
            }
            .padding()
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
            // Back Button
            ToolbarItem(placement: .navigationBarLeading) {
                Button(action: {
                    dismiss()
                }) {
                    Image("back-btn")
                        .resizable()
                        .scaledToFit()
                        .frame(height: 40)
                        .foregroundColor(.white)
                }
            }
        }
    }
}


