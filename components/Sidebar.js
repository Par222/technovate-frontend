import React from 'react';
import Link from 'next/link';
export const Sidebar = () => {
  return (
    <nav className="lg:w-1/5 sm:w-2/5 p-4 h-full bg-blue-600  h-shadow-xl">
      <div className="font-medium text-2xl text-center text-white mb-9">
        <Link href="/hospital/home">OrganConnect</Link>
      </div>
      <ul className="flex flex-col mt-3 text-white gap-3">
        <li className="text-center text-md">
          <button className="hover:bg-green-500 transition-all ease-in duration-1 py-1 px-4 rounded-sm">
            Add Donors
          </button>
        </li>
        <li className="text-center text-md">
          <button className="hover:bg-green-500 py-1 px-4 rounded-sm">
            Edit Hospital Proflie
          </button>
        </li>
      </ul>
    </nav>
  );
};
