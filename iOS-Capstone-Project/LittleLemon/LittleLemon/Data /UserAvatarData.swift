//
//  UserAvatarData.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/23/25.
//

import SwiftUI

class UserAvatarData: ObservableObject {
    @Published var avatarImage: UIImage?
    init() {
        loadAvatar()
    }
    func loadAvatar() {
        if let data = UserDefaults.standard.data(forKey: kUserImageData),
           let image = UIImage(data: data) {
            avatarImage = image
        } else {
            avatarImage = nil
        }
    }
    func removeAvatar() {
        UserDefaults.standard.removeObject(forKey: kUserImageData)
        avatarImage = nil
    }
}
