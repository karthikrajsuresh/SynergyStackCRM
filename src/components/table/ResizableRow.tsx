// src/components/table/ResizableRow.tsx
import React, { useRef, useState } from 'react';

interface ResizableRowProps {
    initialHeight: number;
    children: React.ReactNode;
    onResize?: (newHeight: number) => void;
}

const ResizableRow: React.FC<ResizableRowProps> = ({ initialHeight, children, onResize }) => {
    const [height, setHeight] = useState(initialHeight);
    const rowRef = useRef<HTMLTableRowElement>(null);
    const startYRef = useRef<number>(0);
    const startHeightRef = useRef<number>(initialHeight);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        startYRef.current = e.clientY;
        startHeightRef.current = rowRef.current?.offsetHeight || initialHeight;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
        const delta = e.clientY - startYRef.current;
        const newHeight = startHeightRef.current + delta;
        if (newHeight > 30) { // Set a minimum row height
            setHeight(newHeight);
            onResize && onResize(newHeight);
        }
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    return (
        <>
            <tr ref={rowRef} style={{ height: `${height}px` }} className="relative">
                {children}
            </tr>
            {/* Row resize handle: a full-width div under the row */}
            <tr>
                <td colSpan={100} className="p-0">
                    <div
                        onMouseDown={onMouseDown}
                        className="w-full h-2 cursor-row-resize bg-transparent hover:bg-gray-200"
                    />
                </td>
            </tr>
        </>
    );
};

export default ResizableRow;
