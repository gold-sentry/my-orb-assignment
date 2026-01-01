import { UsageTable } from './UsageTable';
import { UsageChart } from './UsageChart';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { useUsageData } from '../hooks/useUsageData';
import { StatsCards } from './StatsCard';
import { TableSearch } from './table/TableSearch';
import { useTableSort } from '../hooks/useTableSort';
import { useTableSearch } from '../hooks/useTableSearch';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { DashboardSection } from './dashboard/DashboardSection';

import { formatDateRange } from '../utils/formatters';

export const Dashboard = () => {
    const { data, loading, error, refetch } = useUsageData();
    const { sortDirection, sortedData, handleSort } = useTableSort(data?.usage || []);
    const { searchQuery, setSearchQuery, filteredData } = useTableSearch(sortedData);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={refetch} />;

    const dateRange = data?.usage.length
        ? {
            start: formatDateRange(data.usage[data.usage.length - 1].timestamp),
            end: formatDateRange(data.usage[0].timestamp),
        }
        : undefined;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="container mx-auto px-4 md:px-6 py-8">
                <DashboardHeader dateRange={dateRange} />

                {data && <StatsCards data={data.usage} />}

                <DashboardSection title="Daily Credit Consumption" indicator="emerald">
                    {data && <UsageChart data={data.usage} />}
                </DashboardSection>

                <DashboardSection
                    title="Usage Details"
                    indicator="cyan"
                    action={<TableSearch value={searchQuery} onChange={setSearchQuery} />}
                >
                    <UsageTable
                        data={filteredData}
                        sortConfig={sortDirection}
                        onSort={handleSort}
                    />
                </DashboardSection>
            </div>
        </div>
    );
};