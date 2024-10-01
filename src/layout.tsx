import React, { useState } from 'react';
import { Trash2, Inbox, Send, MailWarning, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface RootLayoutProps {
  auth: boolean;
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ auth, children }) => {
  const [isClicked, setIsClicked] = useState<number | null>(null);
  return (
    <div className="flex bg-gray-100">
      {/* サイドバー */}
      <motion.div
        className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            AutoHelpDesk
          </h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/?step=all"
                  onClick={() => setIsClicked(0)}
                  className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg font-medium hover:bg-gray-200 focus:shadow-outline ${
                    isClicked === 0 ? "bg-gray-300" : ""
                  }`}
                >
                  <Inbox className="h-5 w-5" />
                  <span>全てのメール</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/?step=send"
                  onClick={() => setIsClicked(1)}
                  className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg font-medium hover:bg-gray-200 focus:shadow-outline ${
                    isClicked === 1 ? "bg-gray-300" : ""
                  }`}
                >
                  <Send className="h-5 w-5" />
                  <span>返信済みのメール</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/?step=unsent"
                  onClick={() => setIsClicked(2)}
                  className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg font-medium hover:bg-gray-200 focus:shadow-outline ${
                    isClicked === 2 ? "bg-gray-300" : ""
                  }`}
                >
                  <MailWarning className="h-5 w-5" />
                  <span>未返信のメール</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/?step=trash"
                  onClick={() => setIsClicked(3)}
                  className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg font-medium hover:bg-gray-200 focus:shadow-outline ${
                    isClicked === 3 ? "bg-gray-300" : ""
                  }`}
                >
                  <Trash2 className="h-5 w-5" />
                  <span>削除されたメール</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* ログインボタン */}
        <div className="p-6">
          {
            auth ? (
              <a href="http://localhost:5173/api/logout">
                <button className="w-full bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200">
                  <span className="flex items-center justify-center">
                    <LogIn className="h-5 w-5 mr-2" />
                    <span>ログアウト</span>
                  </span>
                </button>
              </a>
            ) : (
              <a href="http://localhost:5173/api/login">
                <button className="w-full bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200">
                  <span className="flex items-center justify-center">
                    <LogIn className="h-5 w-5 mr-2" />
                    <span>ログイン</span>
                  </span>
                </button>
              </a>
            )
          }
        </div>
      </motion.div>

      {/* メインコンテンツ */}
      <>{children}</>
    </div>
  );
};
