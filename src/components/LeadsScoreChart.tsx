import React from 'react';
import { Lead } from '../store/leadsSlice';

interface LeadsScoreChartProps {
    leads: Lead[];
}

const SVG_WIDTH = 800; 
const SVG_HEIGHT = 300;
const margin = { top: 20, right: 20, bottom: 60, left: 50 };

const LeadsScoreChart: React.FC<LeadsScoreChartProps> = ({ leads }) => {
    const n = leads.length;
    if (n === 0) return <div>No data</div>;

    // Compute score range
    const scores = leads.map((l) => l.leadScore);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const scoreRange = maxScore - minScore || 1;

    // Calculate scales
    const xRange = SVG_WIDTH - margin.left - margin.right;
    const yRange = SVG_HEIGHT - margin.top - margin.bottom;

    const xScale = (i: number) => margin.left + (xRange * i) / (n - 1);
    const yScale = (score: number) =>
        margin.top + yRange - ((score - minScore) / scoreRange) * yRange;

    // Create polyline points
    const points = leads.map((lead, i) => `${xScale(i)},${yScale(lead.leadScore)}`).join(' ');

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-center">Lead Scores</h3>
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
                {/* X axis */}
                <line
                    x1={margin.left}
                    y1={SVG_HEIGHT - margin.bottom}
                    x2={SVG_WIDTH - margin.right}
                    y2={SVG_HEIGHT - margin.bottom}
                    stroke="grey"
                    strokeWidth={2}
                />
                {/* Y axis */}
                <line
                    x1={margin.left}
                    y1={margin.top}
                    x2={margin.left}
                    y2={SVG_HEIGHT - margin.bottom}
                    stroke="grey"
                    strokeWidth={2}
                />
                {/* X axis labels rotated 45 degrees */}
                {leads.map((lead, i) => (
                    <text
                        key={i}
                        x={xScale(i)}
                        y={SVG_HEIGHT - margin.bottom + 20}
                        textAnchor="start"
                        transform={`rotate(45, ${xScale(i)}, ${SVG_HEIGHT - margin.bottom + 20})`}
                        className="text-xs fill-gray-600"
                    >
                        {lead.name.split(' ')[0]}
                    </text>
                ))}
                {/* Y axis ticks */}
                {Array.from({ length: 6 }).map((_, i) => {
                    const y = margin.top + (yRange * i) / 5;
                    const value = Math.round(maxScore - (maxScore - minScore) * (i / 5));
                    return (
                        <g key={i}>
                            <line x1={margin.left - 5} y1={y} x2={margin.left} y2={y} stroke="grey" />
                            <text
                                x={margin.left - 10}
                                y={y + 4}
                                textAnchor="end"
                                className="text-xs fill-gray-600"
                            >
                                {value}
                            </text>
                        </g>
                    );
                })}
                <text
                    x={margin.left - 30}
                    y={margin.top - 10}
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                >
                    Score
                </text>
                {/* polyline connecting data points */}
                <polyline points={points} fill="none" stroke="#000000" strokeWidth={3} />
                {/* Draw circles for each data point */}
                {leads.map((lead, i) => (
                    <circle key={i} cx={xScale(i)} cy={yScale(lead.leadScore)} r={4} fill="#3b82f6" />
                ))}
            </svg>
        </div>
    );
};

export default LeadsScoreChart;
