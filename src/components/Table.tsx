// src/components/Table.tsx
import React, { useState } from 'react';
import { useTable } from '../hooks/useTable';

interface TableProps<T extends Record<string, any>> {
  data: T[];
  sortBy?: { accessor: keyof T; order: 'asc' | 'desc' };
  filterBy?: (item: T) => boolean;
  className?: string;
}

type ExpandedState = {
  [rowIndex: number]: {
    [field: string]: boolean;
  };
};

//
// Helpers for nested data and image rendering
//
const isChildTableField = (value: any): boolean => {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'object' &&
    value[0] !== null
  );
};

const isPlainObject = (value: any): boolean => {
  return value && typeof value === 'object' && !Array.isArray(value);
};

const isImage = (value: any): boolean => {
  if (typeof value === 'string') {
    if (/^data:image\/[a-zA-Z]+;base64,/.test(value)) return true;
    if (/^https?:\/\//.test(value) && /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(value))
      return true;
    if (/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(value)) return true;
  }
  return false;
};

const getImageSrc = (src: string, key: string): string => {
  if (key === 'profilePicture' && src.startsWith('public/')) {
    return src.replace(/^public/, '');
  }
  return src;
};

//
// Refined Resizable Table Component
//
function Table<T extends Record<string, any>>({
  data,
  sortBy,
  filterBy,
  className = '',
}: TableProps<T>) {
  const { data: processedData } = useTable(data, { sortBy, filterBy });
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [columnWidths, setColumnWidths] = useState<{ [colIndex: number]: number }>({});
  const [rowHeights, setRowHeights] = useState<{ [rowIndex: number]: number }>({});

  // Compute union of keys (columns) across all records.
  const keys: string[] = [];
  processedData.forEach((record) => {
    Object.keys(record).forEach((key) => {
      if (!keys.includes(key)) keys.push(key);
    });
  });

  // --- Column Resizing Handler ---
  const handleColumnResize = (colIndex: number, startX: number, startWidth: number) => {
    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(startWidth + (moveEvent.clientX - startX), 50);
      setColumnWidths((prev) => ({ ...prev, [colIndex]: newWidth }));
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // --- Row Resizing Handler ---
  const handleRowResize = (rowIndex: number, startY: number, startHeight: number) => {
    const onMouseMove = (moveEvent: MouseEvent) => {
      const newHeight = Math.max(startHeight + (moveEvent.clientY - startY), 20);
      setRowHeights((prev) => ({ ...prev, [rowIndex]: newHeight }));
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  if (processedData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex justify-center items-center w-full py-8">
      {/* Container with horizontal scrolling */}
      <div className="overflow-x-auto">
        <table className={`border-collapse ${className}`} style={{ minWidth: '100%' }}>
          <thead className="bg-gray-200">
            <tr>
              {keys.map((key, colIndex) => (
                <th
                  key={key}
                  className="border p-2 relative"
                  style={{
                    width: columnWidths[colIndex] ? `${columnWidths[colIndex]}px` : '150px',
                  }}
                >
                  {key}
                  {/* Resizer handle in header */}
                  <div
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const startX = e.clientX;
                      const thElement = e.currentTarget.parentElement;
                      const startWidth = thElement ? thElement.offsetWidth : 150;
                      handleColumnResize(colIndex, startX, startWidth);
                    }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: '5px',
                      cursor: 'col-resize',
                      userSelect: 'none',
                    }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedData.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <tr
                  style={{
                    height: rowHeights[rowIndex] ? `${rowHeights[rowIndex]}px` : '40px',
                    position: 'relative',
                  }}
                >
                  {keys.map((key, colIndex) => {
                    const cellValue = row[key];

                    // Helper to render a cell with a resizer handle
                    const renderCell = (content: React.ReactNode) => (
                      <td
                        key={colIndex}
                        className="border p-2 relative"
                        style={{
                          width: columnWidths[colIndex] ? `${columnWidths[colIndex]}px` : '150px',
                        }}
                      >
                        {content}
                        {/* Resizer handle on the cell border */}
                        <div
                          onMouseDown={(e) => {
                            e.preventDefault();
                            const startX = e.clientX;
                            const tdElement = e.currentTarget.parentElement;
                            const startWidth = tdElement ? tdElement.offsetWidth : 150;
                            handleColumnResize(colIndex, startX, startWidth);
                          }}
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '5px',
                            cursor: 'col-resize',
                            userSelect: 'none',
                          }}
                        />
                      </td>
                    );

                    if (isImage(cellValue)) {
                      const src = getImageSrc(cellValue, key);
                      return renderCell(
                        <img
                          src={src}
                          alt={`Image for ${key}`}
                          className="max-w-full max-h-40 object-contain"
                        />
                      );
                    }

                    if (isChildTableField(cellValue) || isPlainObject(cellValue)) {
                      return renderCell(
                        <>
                          <button
                            onClick={() =>
                              setExpanded((prev) => ({
                                ...prev,
                                [rowIndex]: { ...prev[rowIndex], [key]: !prev[rowIndex]?.[key] },
                              }))
                            }
                            className="text-blue-600 mr-2"
                          >
                            {expanded[rowIndex]?.[key] ? 'Hide' : 'Show'}
                          </button>
                          <span className="italic text-sm text-gray-600">
                            {isChildTableField(cellValue) ? `[${key} data]` : `[${key} object]`}
                          </span>
                        </>
                      );
                    }

                    return renderCell(cellValue !== undefined ? String(cellValue) : '');
                  })}
                  {/* Row resizer handle (placed at the bottom) */}
                  <td
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const startY = e.clientY;
                      const trElement = e.currentTarget.parentElement;
                      const startHeight = trElement ? trElement.offsetHeight : 40;
                      handleRowResize(rowIndex, startY, startHeight);
                    }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: '5px',
                      cursor: 'row-resize',
                      userSelect: 'none',
                    }}
                  />
                </tr>
                {/* Nested content for expanded cells */}
                {keys.map((key) => {
                  const cellValue = row[key];
                  if (expanded[rowIndex]?.[key]) {
                    let nestedData = null;
                    if (isChildTableField(cellValue)) {
                      nestedData = cellValue;
                    } else if (isPlainObject(cellValue)) {
                      nestedData = [cellValue];
                    }
                    if (nestedData) {
                      return (
                        <tr key={`${rowIndex}-${key}-child`}>
                          <td colSpan={keys.length} className="border p-2 bg-gray-50">
                            <h3 className="font-semibold mb-2">{key}</h3>
                            {/* Child table wrapped in a scrollable container */}
                            <div className="overflow-x-auto">
                              <Table data={nestedData} className="w-full" />
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  }
                  return null;
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
