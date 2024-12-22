import React from 'react';
import type { OrderDetails } from '../../types/order';
import { QuantityBadge } from '../ui/QuantityBadge';
import { translations } from '../../config/translations';

interface OrderItemsProps {
  items: OrderDetails['line_items'];
}

export const OrderItems: React.FC<OrderItemsProps> = ({ items }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-3">{translations.orderItems}</h3>
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-4 flex-1">
            {item.image && (
              <img 
                src={item.image.src} 
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-medium">{item.name}</h4>
                <QuantityBadge quantity={item.quantity} />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <span>כמות: {item.quantity}</span>
                <span>מק״ט: {item.sku || 'N/A'}</span>
              </div>
            </div>
            <span className="text-sm text-gray-600">₪{item.total}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);