import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { translations } from '../config/translations';

interface OrderSearchProps {
  onSearch: (orderId: string) => void;
  isLoading: boolean;
}

export const OrderSearch: React.FC<OrderSearchProps> = ({ onSearch, isLoading }) => {
  const [orderId, setOrderId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      onSearch(orderId.trim());
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      dir="rtl"
    >
      <div className="relative flex items-center">
        <motion.input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder={translations.searchPlaceholder}
          className="w-full px-6 py-3 pl-12 text-lg text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none text-right"
          disabled={isLoading}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        <motion.button
          type="submit"
          disabled={isLoading}
          className="absolute left-3 p-2 text-gray-500 hover:text-blue-600 transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.form>
  );
};