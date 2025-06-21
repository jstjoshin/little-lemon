//
//  Menu.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/19/25.
//

import SwiftUI
import CoreData

struct Menu: View {
    @Environment(\.managedObjectContext) private var viewContext
    @State var searchText = ""
    
    func getMenuData(context: NSManagedObjectContext) {
        PersistenceController.shared.clear()
        let url = URL(string:"https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json")!
        let request = URLRequest(url: url)
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            if let data = data {
                let decoder = JSONDecoder()
                if let decoded = try? decoder.decode(MenuList.self, from: data) {
                    for item in decoded.menu {
                        let dish = Dish(context: context)
                        dish.title = item.title
                        dish.price = item.price
                        dish.image = item.image
                        dish.id = item.id
                        dish.itemDesc = item.itemDesc
                    }
                    try? viewContext.save()
                }
            }
        }
        task.resume()
    }
    
    var body: some View {
        VStack {
            Text("Little Lemon")
            Text("Chicago")
            Text("We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.")
            TextField("Search menu", text: $searchText)
            FetchedObjects(predicate:buildPredicate(searchText: searchText),
                           sortDescriptors: buildSortDescriptors()) { (dishes: [Dish]) in
                List {
                    ForEach(dishes) { dish in
                        HStack {
                            Text(dish.title ?? "")
                            Spacer()
                            Text("$ \(dish.price ?? "0")")
                            Spacer()
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
                        }
                    }
                }
            }
        }
        .onAppear() {
            
            getMenuData(context: viewContext)
        }
    }
    
    func buildPredicate(searchText: String) -> NSPredicate {
        if searchText.isEmpty {
            return NSPredicate(value: true)
        }
        return NSPredicate(format: "title CONTAINS[cd] %@", searchText)
    }
    func buildSortDescriptors () -> [NSSortDescriptor] {
        return [
            NSSortDescriptor(key: "title", ascending: true, selector: #selector(NSString.localizedStandardCompare))
        ]
    }
}

#Preview {
    Menu()
        .environment(\.managedObjectContext, PersistenceController.shared.container.viewContext)
}
