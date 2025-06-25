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
        VStack {
            VStack(alignment: .leading, spacing: 10) {
                VStack(alignment: .leading, spacing: -20) {
                    Text("Little Lemon")
                        .font(.customVariableFont("Markazi Text", size: 64, weight: 0.23))
                        .foregroundColor(Color(hex: "#F4CE14"))
                    Text("Chicago")
                        .font(.customVariableFont("Markazi Text", size: 40, weight: 0.0))
                }
                HStack(alignment: .top, spacing: 0) {
                    Text("We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.")
                        .font(.customVariableFont("Karla", size: 18, weight: 0.23))
                        .frame(maxWidth: .infinity, alignment: .topLeading)
                        .fixedSize(horizontal: false, vertical: true)
                    Image("hero-image")
                        .resizable()
                        .scaledToFill()
                        .frame(width: 140, height: 140)
                        .cornerRadius(16)
                        .padding(.leading, 10)
                }
                TextField("Search menu", text: $searchText)
                    .padding(10)
                    .padding(.leading, 22)
                    .background(Color(hex: "#ffffff"))
                    .foregroundColor(Color(hex: "#333333"))
                    .cornerRadius(8)
                    .overlay(
                        HStack {
                            Image(systemName: "magnifyingglass")
                                .foregroundColor(.gray)
                                .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                                .padding(.leading, 8)
                        }
                    )
                    .padding(.top, 8)
            }
            .foregroundColor(Color(hex: "#ffffff"))
            .padding(16)
            .background(Color(hex: "#495E57"))
            Text("ORDER FOR DELIVERY")
            ScrollView(.horizontal, showsIndicators: false) {
                HStack {
                    Button(action: {
                        selectedCategory = nil
                    }) {
                        Text("Full Menu")
                            .padding(8)
                            .background(selectedCategory == nil ? Color.blue : Color.gray.opacity(0.2))
                            .foregroundColor(.white)
                            .cornerRadius(8)
                    }
                    ForEach(categories, id: \.self) { category in
                        Button(action: {
                            selectedCategory = category
                        }) {
                            Text(category)
                                .padding(8)
                                .background(selectedCategory == category ? Color.blue : Color.gray.opacity(0.2))
                                .foregroundColor(.white)
                                .cornerRadius(8)
                        }
                    }
                }.padding(.horizontal)
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
                        .listRowInsets(EdgeInsets())
                    }
                }
                .listStyle(.plain)
                .scrollContentBackground(.hidden)
                .padding(.horizontal)
            }
        }
        .onAppear() {
            getMenuData(context: viewContext)
            selectedCategory = nil
        }
    }
    
    func buildPredicate(searchText: String, category: String?) -> NSPredicate {
        let trimmedSearch = searchText.trimmingCharacters(in: .whitespacesAndNewlines)
        var predicates: [NSPredicate] = []
        if !trimmedSearch.isEmpty {
            predicates.append(NSPredicate(format: "title CONTAINS[cd] %@", trimmedSearch))
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
