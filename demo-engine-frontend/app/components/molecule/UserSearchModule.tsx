"use client";

import React, { useState } from "react";
import { User } from "@/lib/interface";
import SearchBar from "@/components/SearchBar";
import RoundButton from "@/components/RoundButton";
import DropdownMenu from "@/components/Dropdown";

const UserSearchModule: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState<User | null>(null);

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEdit = (user: User) => {
    setEditUserId(user.id);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleDelete = async (user: User) => {
    setConfirmDeleteUser(user);
  };

  const confirmDelete = () => {
    if (confirmDeleteUser) {
      console.log("Confirmed delete:", confirmDeleteUser);
      // TODO: Trigger deletion API
      setUsers(users.filter((u) => u.id !== confirmDeleteUser.id));
      setConfirmDeleteUser(null);
    }
  };

  const fetchUsers = async () => {
    if (!isValidEmail(searchQuery)) {
      alert("Please enter a valid email address");
      return;
    }

    if (searchQuery.trim().length === 0) {
      setUsers([]);
      setHasSearched(true);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(
        `/api/user_management/?email=${encodeURIComponent(searchQuery)}`
      );
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 relative">
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={fetchUsers}
      />

      {isLoading && <p className="mt-4 text-gray-500">Loading users...</p>}

      {!isLoading && users.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-300 rounded-md border border-gray-300">
            <div className="flex items-center gap-6 flex-wrap">
              <span className="min-w-[80px]">Role</span>
              <span className="min-w-[150px]">Name</span>
              <span className="min-w-[200px]">Email</span>
            </div>
            <div className="min-w-[200px] text-right">Actions</div>
          </div>

          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                className={`transition-all duration-300 ease-in-out flex items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm hover:shadow-md ${
                  editUserId === user.id ? "bg-yellow-50" : ""
                }`}
              >
                <div className="flex items-center gap-6 flex-wrap text-sm text-gray-700 flex-1 transition-opacity duration-300 ease-in-out">
                  {editUserId === user.id ? (
                    <>
                      <DropdownMenu
                        label="drop"
                        options={["Admin", "User", "Developer"]}
                        value={editForm.role || ""}
                        onChange={(value) =>
                          setEditForm({ ...editForm, role: value })
                        }
                      />
                      <input
                        type="text"
                        value={editForm.name || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="min-w-[150px] border border-gray-300 rounded px-2 py-1"
                        placeholder="Name"
                      />
                      <input
                        type="email"
                        value={editForm.email || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="min-w-[200px] border border-gray-300 rounded px-2 py-1"
                        placeholder="Email"
                      />
                    </>
                  ) : (
                    <>
                      <span className="min-w-[80px] font-medium">
                        {user.role}
                      </span>
                      <span className="min-w-[150px]">{user.name}</span>
                      <span className="min-w-[200px]">{user.email}</span>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  {editUserId === user.id ? (
                    <>
                      <RoundButton
                        text="Save"
                        color="bg-green-600"
                        width="w-20"
                        onClick={() => {
                          console.log("Save", editForm); // Replace with API call
                          setEditUserId(null);
                        }}
                      />
                      <RoundButton
                        text="Cancel"
                        color="bg-gray-500"
                        width="w-24"
                        onClick={() => setEditUserId(null)}
                      />
                    </>
                  ) : (
                    <>
                      <RoundButton
                        text="Edit"
                        color="bg-yellow-500"
                        width="w-20"
                        onClick={() => handleEdit(user)}
                      />
                      <RoundButton
                        text="Delete"
                        color="bg-red-600"
                        width="w-24"
                        onClick={() => handleDelete(user)}
                      />
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isLoading && hasSearched && users.length === 0 && (
        <p className="mt-4 text-gray-500 text-center">No users found.</p>
      )}

      {/* Confirmation Modal */}
      {confirmDeleteUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md space-y-4">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-bold">{confirmDeleteUser.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <RoundButton
                text="Cancel"
                color="bg-gray-500"
                width="w-24"
                onClick={() => setConfirmDeleteUser(null)}
              />
              <RoundButton
                text="Delete"
                color="bg-red-600"
                width="w-24"
                onClick={confirmDelete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearchModule;
