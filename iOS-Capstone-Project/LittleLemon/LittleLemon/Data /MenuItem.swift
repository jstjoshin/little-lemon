//
//  MenuItem.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/19/25.
//

import Foundation

struct MenuItem: Decodable {
    let id: Double
    let title: String
    let itemDesc: String
    let price: String
    let image: String
    let category: String
    
    enum CodingKeys: String, CodingKey {
        case id, category, title, price, image
        case itemDesc = "description"
    }
}
