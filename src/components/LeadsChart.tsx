import React from 'react';
import { Lead } from '../store/leadsSlice';

interface LeadsChartProps {
    leads: Lead[];
}

const SVG_WIDTH = 500;
const SVG_HEIGHT = 400;
const x0 = 60;
const y0 = 60;
const xAxisLength = SVG_WIDTH - x0 * 2;
const yAxisLength = SVG_HEIGHT - y0 * 2;
const numYTicks = 5;

const LeadsChart: React.FC<LeadsChartProps> = ({ leads }) => {
    // Aggregate leads by status (Hot, Warm, Cold, New)
    const statuses = ['Hot', 'Warm', 'Cold', 'New'];
    const data: [string, number][] = statuses.map((status) => [
        status,
        leads.filter((lead) => lead.status === status).length,
    ]);

    const dataYMax = Math.max(...data.map(([_, count]) => count));
    const dataYMin = 0;
    const dataYRange = dataYMax - dataYMin || 1;
    const xAxisY = y0 + yAxisLength;
    const barPlotWidth = xAxisLength / data.length;

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-center">Leads by Status</h3>
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
                {/* X Axis */}
                <line
                    x1={x0}
                    y1={xAxisY}
                    x2={x0 + xAxisLength}
                    y2={xAxisY}
                    stroke="grey"
                    strokeWidth={2}
                />
                <text x={x0 + xAxisLength + 10} y={xAxisY + 5} className="text-base fill-gray-600">
                    Status
                </text>
                {/* Y Axis */}
                <line
                    x1={x0}
                    y1={y0}
                    x2={x0}
                    y2={y0 + yAxisLength}
                    stroke="grey"
                    strokeWidth={2}
                />
                {Array.from({ length: numYTicks + 1 }).map((_, index) => {
                    const y = y0 + index * (yAxisLength / numYTicks);
                    const yValue = Math.round(dataYMax - index * ((dataYRange) / numYTicks));
                    return (
                        <g key={index}>
                            <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
                            <text x={x0 - 10} y={y + 5} textAnchor="end" className="text-sm fill-gray-600">
                                {yValue}
                            </text>
                        </g>
                    );
                })}
                <text x={x0 - 10} y={y0 - 10} textAnchor="middle" className="text-sm fill-gray-600">
                    Count
                </text>
                {/* Bar Plots */}
                {data.map(([status, count], index) => {
                    const x = x0 + index * barPlotWidth;
                    const yRatio = (Number(count) - dataYMin) / dataYRange;
                    const barHeight = yRatio * yAxisLength;
                    const y = y0 + yAxisLength - barHeight;
                    const sidePadding = 50;
                    return (
                        <g key={index}>
                            <rect
                                x={x + sidePadding / 2}
                                y={y}
                                width={barPlotWidth - sidePadding}
                                height={barHeight}
                                className="fill-indigo-600"
                            />
                            <text
                                x={x + barPlotWidth / 2}
                                y={xAxisY + 20}
                                textAnchor="middle"
                                className="text-sm fill-gray-700 font-medium"
                            >
                                {status}
                            </text>
                            <text
                                x={x + barPlotWidth / 2}
                                y={y - 5}
                                textAnchor="middle"
                                className="text-sm fill-gray-700 font-semibold"
                            >
                                {count}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default LeadsChart;
