//
//  Dish+CoreDataProperties.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/20/25.
//
//

import Foundation
import CoreData


extension Dish {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Dish> {
        return NSFetchRequest<Dish>(entityName: "Dish")
    }

    @NSManaged public var title: String?
    @NSManaged public var image: String?
    @NSManaged public var price: String?
    @NSManaged public var category: String?
    @NSManaged public var itemDesc: String?
    @NSManaged public var id: Double

}

extension Dish : Identifiable {
    
}
