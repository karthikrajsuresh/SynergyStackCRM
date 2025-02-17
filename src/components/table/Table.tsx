// // src/components/table/Table.tsx
// import React, { useState } from 'react';
// import { Lead } from '../../store/leadsSlice';
// import TableHeader from './TableHeader';
// import TableRow from './TableRow';

// interface TableProps {
//     data: Lead[];
//     allSelected: boolean;
//     onSelectAll: () => void;
//     isSelected: (leadId: number) => boolean;
//     onSelect: (leadId: number) => void;
//     sorting: { key: string; ascending: boolean } | null;
//     onSort: (key: string) => void;
// }

// const Table: React.FC<TableProps> = ({
//     data,
//     allSelected,
//     onSelectAll,
//     isSelected,
//     onSelect,
//     sorting,
//     onSort,
// }) => {
//     // Maintain column widths in state
//     const [columnWidths, setColumnWidths] = useState({
//         checkbox: 50,
//         id: 80,
//         name: 150,
//         company: 150,
//         status: 100,
//         leadScore: 100,
//         action: 100,
//     });

//     const handleColumnResize = (key: string, newWidth: number) => {
//         setColumnWidths((prev) => ({ ...prev, [key]: newWidth }));
//     };

//     const handleSort = (key: string) => {
//         if (sorting && sorting.key === key) {
//             onSort(key);
//         } else {
//             onSort(key);
//         }
//     };
//     return (
//         <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse relative">
//                 <TableHeader
//                     allSelected={allSelected}
//                     onSelectAll={onSelectAll}
//                     sorting={sorting || null}
//                     onSort={handleSort}
//                     columnWidths={columnWidths}
//                     onColumnResize={handleColumnResize}
//                 />
//                 <tbody>
//                     {data.map((lead) => (
//                         <TableRow
//                             key={lead.id}
//                             lead={lead}
//                             isSelected={isSelected(lead.id)}
//                             onSelect={() => onSelect(lead.id)}
//                         />
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Table;
