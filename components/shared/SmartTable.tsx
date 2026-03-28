'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, MoreVertical } from 'lucide-react';

interface Column<T> {
  header: string;
  key: keyof T | string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface SmartTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  mobileCardRender?: (item: T) => ReactNode; // Custom mobile card view
  isLoading?: boolean;
}

/**
 * Smart Data Table logic from UI.md
 * Desktop: Horizontal scroll table
 * Mobile: Vertical stacked card view
 */
export default function SmartTable<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  mobileCardRender,
  isLoading
}: SmartTableProps<T>) {
  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block card-base p-0 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[--surface-alt]/50 border-b border-[--border]">
                {columns.map((col, idx) => (
                  <th 
                    key={idx} 
                    className={cn(
                      "py-4 px-6 text-[10px] font-bold text-[--text-secondary] uppercase tracking-widest sticky top-0 bg-[--surface-alt]/50 backdrop-blur-sm z-10",
                      col.className
                    )}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[--border]">
              {data.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "group transition-colors even:bg-[--surface-alt]/10",
                    onRowClick ? "cursor-pointer hover:bg-[--brand-light]/30" : "hover:bg-[--surface-alt]/30"
                  )}
                >
                  {columns.map((col, idx) => (
                    <td key={idx} className={cn("py-4 px-6", col.className)}>
                      {col.render ? col.render(item) : (item[col.key as keyof T] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Stacked Card View */}
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <div 
            key={item.id}
            onClick={() => onRowClick?.(item)}
            className="card-base p-4 hover:border-[--brand] transition-all active:scale-[0.98] cursor-pointer"
          >
            {mobileCardRender ? mobileCardRender(item) : (
              <div className="flex flex-col space-y-3">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[--brand] uppercase tracking-widest">#{item.id}</span>
                    <MoreVertical size={16} className="text-[--text-muted]" />
                 </div>
                 {/* Default Fallback for Mobile: Column 1 Large, Column 2 and 3 as labels */}
                 <div>
                    <p className="text-sm font-bold text-[--text-primary]">
                       {columns[0].render ? columns[0].render(item) : (item[columns[0].key as keyof T] as ReactNode)}
                    </p>
                    <div className="flex flex-wrap gap-x-4 mt-2">
                       {columns.slice(1, 3).map((col, idx) => (
                         <div key={idx}>
                            <p className="text-[9px] font-bold text-[--text-muted] uppercase">{col.header}</p>
                            <div className="text-xs font-medium text-[--text-secondary]">
                              {col.render ? col.render(item) : (item[col.key as keyof T] as ReactNode)}
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="flex items-center justify-end text-[10px] font-bold text-[--brand] pt-2">
                    <span>Details</span>
                    <ChevronRight size={12} />
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && !isLoading && (
         <div className="py-20 text-center card-base bg-white border-dashed">
            <p className="text-sm font-bold text-[--text-secondary]">No records found</p>
         </div>
      )}
    </div>
  );
}
