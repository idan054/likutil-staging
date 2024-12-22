import React, { useRef, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CompactDeliveryCard } from './CompactDeliveryCard';
import { DELIVERY_INTEGRATIONS } from '../../../config/delivery';
import type { DeliveryProvider } from '../DeliverySelector';

interface DeliveryCarouselProps {
  selectedProvider: DeliveryProvider | null;
  onSelect: (provider: DeliveryProvider) => void;
  connectedProviders: Set<string>;
}

export const DeliveryCarousel: React.FC<DeliveryCarouselProps> = ({
  selectedProvider,
  onSelect,
  connectedProviders,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 240;
    const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  // Sort integrations to show connected providers first
  const sortedIntegrations = [...DELIVERY_INTEGRATIONS].sort((a, b) => {
    const aConnected = connectedProviders.has(a.id);
    const bConnected = connectedProviders.has(b.id);
    if (aConnected && !bConnected) return -1;
    if (!aConnected && bConnected) return 1;
    return 0;
  });

  return (
    <div className="relative group">
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-1 rounded-full shadow-md border opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-1 rounded-full shadow-md border opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={20} />
      </button>

      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-none scroll-smooth px-1 py-2"
      >
        {sortedIntegrations.map((integration) => (
          <CompactDeliveryCard
            key={integration.id}
            id={integration.id as DeliveryProvider}
            name={integration.name}
            logoUrl={integration.logoUrl}
            isSelected={selectedProvider === integration.id}
            isConnected={connectedProviders.has(integration.id)}
            onClick={() => onSelect(integration.id as DeliveryProvider)}
          />
        ))}
      </div>
    </div>
  );
};