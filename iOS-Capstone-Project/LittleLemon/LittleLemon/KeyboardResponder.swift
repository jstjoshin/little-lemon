//
//  KeyboardResponder.swift
//  LittleLemon
//
//  Created by Joshua Lee on 6/25/25.
//

import Combine
import SwiftUI

final class KeyboardResponder: ObservableObject {
    @Published var keyboardHeight: CGFloat = 0

    private var cancellables = Set<AnyCancellable>()

    init() {
        let keyboardWillShow = NotificationCenter.default.publisher(for: UIResponder.keyboardWillShowNotification)
            .merge(with: NotificationCenter.default.publisher(for: UIResponder.keyboardWillChangeFrameNotification))
            .compactMap { notification -> CGFloat? in
                guard let frame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect else {
                    return nil
                }
                return (frame.height >= 100 && frame.height < 1000) ? frame.height : 0
            }

        let keyboardWillHide = NotificationCenter.default.publisher(for: UIResponder.keyboardWillHideNotification)
            .map { _ in CGFloat(0) }

        keyboardWillShow
            .merge(with: keyboardWillHide)
            .receive(on: RunLoop.main)
            .assign(to: \KeyboardResponder.keyboardHeight, on: self)
            .store(in: &cancellables)
    }
}
