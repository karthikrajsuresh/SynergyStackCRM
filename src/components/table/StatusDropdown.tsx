// import React from 'react';

// interface StatusDropdownProps {
//     status: string;
//     onChange: (newStatus: string) => void;
// }

// const statusOptions = ['Hot', 'Warm', 'Cold'];

// const statusStyles = {
//     Hot: {
//         bg: 'bg-red-50',
//         text: 'text-red-700',
//         ring: 'ring-red-600/10'
//     },
//     Warm: {
//         bg: 'bg-yellow-50',
//         text: 'text-yellow-800',
//         ring: 'ring-yellow-600/20'
//     },
//     Cold: {
//         bg: 'bg-blue-50',
//         text: 'text-blue-700',
//         ring: 'ring-blue-700/10'
//     }
// };

// const StatusDropdown: React.FC<StatusDropdownProps> = ({ status, onChange }) => {
//     const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const newStatus = e.target.value;
//         onChange(newStatus);
//         console.log('Status changed:', newStatus);
//     };

//     const style = statusStyles[status as keyof typeof statusStyles];

//     return (
//         <div className="relative">
//             <select
//                 value={status}
//                 onChange={handleChange}
//                 className={`appearance-none ${style.bg} ${style.text} ${style.ring} rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer pr-8`}
//             >
//                 {statusOptions.map(option => (
//                     <option key={option} value={option}>
//                         {option}
//                     </option>
//                 ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
//                 <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                 </svg>
//             </div>
//         </div>
//     );
// };

// export default StatusDropdown;