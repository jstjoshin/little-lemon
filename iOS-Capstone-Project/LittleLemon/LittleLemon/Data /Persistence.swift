import CoreData
import Foundation

struct PersistenceController {
    static let shared = PersistenceController()

    let container: NSPersistentContainer

    init() {
        container = NSPersistentContainer(name: "ExampleDatabase")
        container.persistentStoreDescriptions.first!.url = URL(fileURLWithPath: "/dev/null")
        container.loadPersistentStores(completionHandler: {_,_ in })
        container.viewContext.automaticallyMergesChangesFromParent = true
    }
    
    func clear() {
        // Delete all dishes from the store
        let fetchRequest: NSFetchRequest<NSFetchRequestResult> = NSFetchRequest(entityName: "Dish")
        let deleteRequest = NSBatchDeleteRequest(fetchRequest: fetchRequest)
        deleteRequest.resultType = .resultTypeObjectIDs

        let result = try? container.viewContext.execute(deleteRequest) as? NSBatchDeleteResult
        if let objectIDs = result?.result as? [NSManagedObjectID] {
            let changes: [AnyHashable: Any] = [NSDeletedObjectsKey: objectIDs]
            NSManagedObjectContext.mergeChanges(fromRemoteContextSave: changes, into: [container.viewContext])
        }
    }
}
