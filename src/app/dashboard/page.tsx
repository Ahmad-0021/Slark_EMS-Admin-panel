"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllInvoices, fetchAllUsers } from "@/service";

const Dashboard = () => {
  const { data: users = [], isError: isUsersError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  const { data: invoices = [], isError: isInvoicesError } = useQuery({
    queryKey: ["invoices"],
    queryFn: fetchAllInvoices,
  });

  // Use memoization to calculate stats
  const stats = useMemo(() => {
    return [
      { label: "Total Users", value: users.length || 0 },
      { label: "Active Users", value: users.length || 0 }, // Replace with actual active users logic if needed
      { label: "Total Invoices", value: invoices.length || 0 },
    ];
  }, [users, invoices]);

  if (isUsersError || isInvoicesError) {
    return <p>Error loading data. Please try again.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              {stat.label}
            </h2>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
