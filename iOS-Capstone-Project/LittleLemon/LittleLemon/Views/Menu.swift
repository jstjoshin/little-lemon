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
    
    @Binding var isLoggedIn: Bool
    @Binding var showProfile: Bool
    @ObservedObject var userAvatarData: UserAvatarData
    
    @State var searchText = ""
    @State var selectedCategory: String? = nil
    @State var categories: [String] = []
    @StateObject private var keyboard = KeyboardResponder()
    
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
                        dish.category = item.category
                    }
                    try? viewContext.save()
                    loadCategories()
                }
            }
        }
        task.resume()
    }
   func loadCategories() {
        let fetchRequest: NSFetchRequest<Dish> = Dish.fetchRequest()
        fetchRequest.sortDescriptors = []
        if let results = try? viewContext.fetch(fetchRequest) {
            let catSet = Set(results.compactMap { $0.category })
            self.categories = Array(catSet).sorted()
        }
    }
    
    var body: some View {
        VStack(spacing: 0) {
            Hero()
            VStack {
                TextField("Search menu", text: $searchText)
                    .font(.customVariableFont("Karla-Regular_Medium", size: 19, weight: 0.0))
                    .padding(10)
                    .padding(.leading, 22)
                    .background(Color(hex: "#ffffff"))
                    .foregroundColor(Color(hex: "#000000"))
                    .cornerRadius(8)
                    .overlay(
                        HStack {
                            Image(systemName: "magnifyingglass")
                                .foregroundColor(.gray)
                                .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                                .padding(.leading, 8)
                        }
                    )
            }
            .foregroundColor(Color(hex: "#ffffff"))
            .padding(.horizontal, 16)
            .padding(.bottom, 16)
            .background(Color(hex: "#495E57"))
            Text("ORDER FOR DELIVERY!")
                .font(.customVariableFont("Karla-Regular_ExtraBold", size: 20, weight: 0.0))
                .foregroundColor(Color(hex: "#000000"))
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(16)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    Button(action: {
                        selectedCategory = nil
                    }) {
                        Text("Full Menu")
                            .font(.customVariableFont("Karla-Regular_ExtraBold", size: 16, weight: 0.0))
                            .padding(8)
                            .background(selectedCategory == nil ? Color(hex: "#495E57") : Color(hex: "#EDEFEE"))
                            .foregroundColor(selectedCategory == nil ? Color(hex: "#ffffff") : Color(hex: "#495E57"))
                            .cornerRadius(8)
                    }
                    ForEach(categories, id: \.self) { category in
                        Button(action: {
                            selectedCategory = category
                        }) {
                            Text(category.capitalized)
                                .font(.customVariableFont("Karla-Regular_ExtraBold", size: 16, weight: 0.0))
                                .padding(8)
                                .background(selectedCategory == category ? Color(hex: "#495E57") : Color(hex: "#EDEFEE"))
                                .foregroundColor(selectedCategory == category ? Color(hex: "#ffffff") : Color(hex: "#495E57"))
                                .cornerRadius(8)
                        }
                    }
                }
                .padding(.horizontal)
                .padding(.bottom, 16)
                .overlay(
                    Rectangle()
                        .frame(height: 1)
                        .foregroundColor(Color.gray.opacity(0.3)),
                    alignment: .bottom
                )
            }
            
            FetchedObjects(
                predicate: buildPredicate(searchText: searchText, category: selectedCategory),
                sortDescriptors: buildSortDescriptors()
            ) { (dishes: [Dish]) in
                List {
                    ForEach(dishes) { dish in
                        ZStack {
                            NavigationLink(destination: DishDetails(
                                dish: dish,
                                isLoggedIn: $isLoggedIn,
                                showProfile: $showProfile,
                                userAvatarData: userAvatarData
                                )) {
                                EmptyView()
                            }
                            .opacity(0)
                            HStack(spacing: 16) {
                                VStack(alignment: .leading, spacing: 8) {
                                    Text(dish.title ?? "")
                                    .font(.customVariableFont("Karla-Regular_Bold", size: 18, weight: 0.0))
                                    .foregroundColor(Color(hex: "#000000"))
                                    Text(dish.itemDesc ?? "")
                                    .font(.customVariableFont("Karla-Regular", size: 16, weight: 0.0))
                                    .lineLimit(2)
                                    .truncationMode(.tail)
                                    Text("$\(dish.price ?? "0").00")
                                    .font(.customVariableFont("Karla-Regular_Medium", size: 18, weight: 0.0))
                                }
                                .foregroundColor(Color(hex: "#495E57"))
                                .padding(.vertical, 16)
                                Spacer()
                                if let imageUrl = URL(string: dish.image ?? "") {
                                    AsyncImage(url: imageUrl) { phase in
                                        switch phase {
                                        case .empty:
                                            ProgressView()
                                        case .success(let image):
                                            image
                                                .resizable()
                                                .scaledToFill()
                                                .frame(width: 83, height: 83)
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
                                    .frame(width: 83, height: 83)
                                }
                            }
                        }
                        .listRowInsets(EdgeInsets())
                    }
                }
                .listStyle(.plain)
                .scrollIndicators(.hidden)
                .scrollContentBackground(.hidden)
                .padding(.horizontal)
            }
        }
        .padding(.top, -max(keyboard.keyboardHeight, 0))
        .animation(.easeOut(duration: 0.2), value: keyboard.keyboardHeight)
        .onAppear() {
            getMenuData(context: viewContext)
            selectedCategory = nil
            searchText = ""
        }
    }
    
    func buildPredicate(searchText: String, category: String?) -> NSPredicate {
        var predicates: [NSPredicate] = []
        if !searchText.isEmpty {
            predicates.append(NSPredicate(format: "title CONTAINS[cd] %@", searchText))
        }
        if let category = category {
            predicates.append(NSPredicate(format: "category == %@", category))
        }
        switch predicates.count {
        case 0:
            return NSPredicate(value: true)
        case 1:
            return predicates[0]
        default:
            return NSCompoundPredicate(andPredicateWithSubpredicates: predicates)
        }
    }
    func buildSortDescriptors () -> [NSSortDescriptor] {
        return [
            NSSortDescriptor(key: "title", ascending: true, selector: #selector(NSString.localizedStandardCompare))
        ]
    }
}

#Preview {
    @Previewable @State var mockIsLoggedIn = true
    @Previewable @State var mockShowProfile = false
    Menu(isLoggedIn: $mockIsLoggedIn, showProfile: $mockShowProfile, userAvatarData: UserAvatarData())
        .environment(\.managedObjectContext, PersistenceController.shared.container.viewContext)
}
