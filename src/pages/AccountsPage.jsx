// src/pages/AccountPage.jsx
import React from "react";

const modules = import.meta.glob("../accounts/Account*.jsx", { eager: true });

export default function AccountPage() {
  const accounts = Object.values(modules).map((mod) => mod.default);

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        Free Fire Accounts For Sale
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {accounts.map((Component, i) => (
          <Component key={i} />
        ))}
      </div>
    </div>
  );
}
