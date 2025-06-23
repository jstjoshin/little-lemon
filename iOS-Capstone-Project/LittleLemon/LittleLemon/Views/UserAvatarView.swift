//
//  UserAvatarView.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/23/25.
//

import SwiftUI

struct UserAvatarView: View {
    @ObservedObject var userAvatarData: UserAvatarData

    var body: some View {
        VStack {
            if let image = userAvatarData.avatarImage {
                Image(uiImage: image)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .clipShape(Circle())
            } else {
                Image(systemName: "person.crop.circle")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .clipShape(Circle())
            }
        }
        .onAppear {
            userAvatarData.loadAvatar()
        }
    }
}

#Preview {
    UserAvatarView(userAvatarData: UserAvatarData())
}
