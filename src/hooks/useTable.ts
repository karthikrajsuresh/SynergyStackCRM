// src/hooks/useTable.ts
import { useMemo } from 'react';

export type SortBy<T> = {
    accessor: keyof T;
    order: 'asc' | 'desc';
};

export const useTable = <T,>(
    data: T[],
    options?: { sortBy?: SortBy<T>; filterBy?: (item: T) => boolean }
) => {
    const { sortBy, filterBy } = options || {};

    const filteredData = useMemo(() => {
        if (!filterBy) return data;
        return data.filter(filterBy);
    }, [data, filterBy]);

    const sortedData = useMemo(() => {
        if (!sortBy) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aValue = a[sortBy.accessor];
            const bValue = b[sortBy.accessor];
            if (aValue === bValue) return 0;
            if (sortBy.order === 'desc') {
                return aValue < bValue ? 1 : -1;
            }
            return aValue > bValue ? 1 : -1;
        });
    }, [filteredData, sortBy]);

    return { data: sortedData };
};