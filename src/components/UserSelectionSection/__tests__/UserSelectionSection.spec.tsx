import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";

import { usersAndGroupListData } from "@/test/mocks/datasMock";
import { renderWithTheme } from "@/test/testUtils";
import { UsersAndGroups } from "@/types";

import { UserSelectionSection } from "..";

const mockTranslations = {
  title: "Select Users",
  searchPlaceholder: "Search users",
  noResults: "No results found",
  emptySelection: "No users selected",
  expandButton: "See more",
};

describe("UserSelectionSection Component", () => {
  it("renders the title correctly", async () => {
    renderWithTheme(
      <UserSelectionSection
        users={usersAndGroupListData}
        selectedUsers={[]}
        onUserSelectionChange={() => {}}
        translations={mockTranslations}
      />,
    );

    await waitFor(() => {
      const titleElement = screen.getByText(mockTranslations.title);
      expect(titleElement).toBeTruthy();
    });
  });

  it("renders the search input", async () => {
    renderWithTheme(
      <UserSelectionSection
        users={usersAndGroupListData}
        selectedUsers={[]}
        onUserSelectionChange={() => {}}
        translations={mockTranslations}
      />,
    );

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(mockTranslations.searchPlaceholder);
      expect(searchInput).toBeTruthy();
    });
  });

  it("shows filtered users when searching", async () => {
    renderWithTheme(
      <UserSelectionSection
        users={usersAndGroupListData}
        selectedUsers={[]}
        onUserSelectionChange={() => {}}
        translations={mockTranslations}
      />,
    );

    const searchInput = screen.getByPlaceholderText(mockTranslations.searchPlaceholder);
    fireEvent.change(searchInput, { target: { value: "John" } });

    await waitFor(() => {
      const johnDoeListItem = screen.getByText("John Doe");
      expect(johnDoeListItem).toBeTruthy();
    });
  });

  it("adds a user when clicked", async () => {
    const onUserSelectionChange = jest.fn();
    renderWithTheme(
      <UserSelectionSection
        users={usersAndGroupListData}
        selectedUsers={[]}
        onUserSelectionChange={onUserSelectionChange}
        translations={mockTranslations}
      />,
    );

    const searchInput = screen.getByPlaceholderText(mockTranslations.searchPlaceholder);
    fireEvent.change(searchInput, { target: { value: "John" } });

    await waitFor(() => {
      const johnDoeListItem = screen.getByText("John Doe");
      fireEvent.click(johnDoeListItem);
    });

    expect(onUserSelectionChange).toHaveBeenCalledWith([usersAndGroupListData[0]]);
  });

  it("removes a user when chip is deleted", () => {
    const onUserSelectionChange = jest.fn();
    renderWithTheme(
      <UserSelectionSection
        users={usersAndGroupListData}
        selectedUsers={[usersAndGroupListData[0]]}
        onUserSelectionChange={onUserSelectionChange}
        translations={mockTranslations}
      />,
    );

    const chip = screen.getByText("John Doe");
    const deleteButton = chip.parentElement?.querySelector("svg");
    fireEvent.click(deleteButton as Element);

    expect(onUserSelectionChange).toHaveBeenCalledWith([]);
  });

  it('shows "See more" button when more than 8 users are selected', async () => {
    const manyUsersAndGroups: UsersAndGroups[] = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
      type: i % 3 === 0 ? "user" : i % 3 === 1 ? "group" : "class",
    }));
    renderWithTheme(
      <UserSelectionSection
        users={manyUsersAndGroups}
        selectedUsers={manyUsersAndGroups}
        onUserSelectionChange={() => {}}
        translations={mockTranslations}
      />,
    );

    await waitFor(() => {
      const seeMoreButton = screen.getByText(mockTranslations.expandButton);
      expect(seeMoreButton).toBeTruthy();
    });
  });

  it("displays empty selection message when no users are selected", async () => {
    renderWithTheme(
      <UserSelectionSection
        users={usersAndGroupListData}
        selectedUsers={[]}
        onUserSelectionChange={() => {}}
        translations={mockTranslations}
      />,
    );

    await waitFor(() => {
      const emptyMessage = screen.getByText(mockTranslations.emptySelection);
      expect(emptyMessage).toBeTruthy();
    });
  });
});
