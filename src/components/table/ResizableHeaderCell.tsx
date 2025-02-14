// src/components/table/ResizableHeaderCell.tsx
import React, { useRef } from 'react';

interface ResizableHeaderCellProps {
    width: number;
    onResize: (newWidth: number) => void;
    children: React.ReactNode;
}

const ResizableHeaderCell: React.FC<ResizableHeaderCellProps> = ({ width, onResize, children }) => {
    const cellRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef<number>(0);
    const startWidthRef = useRef<number>(width);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        startXRef.current = e.clientX;
        startWidthRef.current = cellRef.current?.offsetWidth || width;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
        const delta = e.clientX - startXRef.current;
        const newWidth = startWidthRef.current + delta;
        // Set a minimum width (e.g., 50px)
        if (newWidth > 50) {
            onResize(newWidth);
        }
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    return (
        <div
            ref={cellRef}
            style={{ width: `${width}px` }}
            className="relative flex items-center select-none"
        >
            <div className="flex-1">{children}</div>
            {/* Resizer handle */}
            <div
                onMouseDown={onMouseDown}
                className="w-2 h-full absolute right-0 top-0 cursor-col-resize"
            />
        </div>
    );
};

export default ResizableHeaderCell;
