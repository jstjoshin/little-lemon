//
//  UserProfileValidator.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/25/25.
//

import Foundation

struct UserProfileValidator {
    static func isValid(name: String) -> Bool {
        let trimmed = name.trimmingCharacters(in: .whitespacesAndNewlines)
        let pattern = "^[A-Za-z]{2,}$"
        return NSPredicate(format: "SELF MATCHES %@", pattern).evaluate(with: trimmed)
    }

    static func isValid(email: String) -> Bool {
        let pattern = "^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
        return NSPredicate(format: "SELF MATCHES %@", pattern).evaluate(with: email)
    }

    static func isValid(phone: String) -> Bool {
        let digits = phone.filter { $0.isNumber }
        return phone.isEmpty || (digits.count >= 7 && digits.count <= 15)
    }

    static func isFormValid(first: String, last: String, email: String, phone: String) -> Bool {
        isValid(name: first) &&
        isValid(name: last) &&
        isValid(email: email) &&
        isValid(phone: phone) // now allows empty string
    }
}
