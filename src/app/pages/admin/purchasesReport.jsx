import React, { useEffect, useState } from 'react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PurchaseReportComponent from '../../components/purchaseReport';

const PurchasesReport = () => {
    document.title = "Stokify | Purchases Report";
    const [purchasing, setPurchasings] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredPurchasing, setFilteredPurchasing] = useState([]);

    useEffect(() => {
        axios.get(`${apiConfig.url}/api/orders/suplier`).then(result => {
            setPurchasings(result.data);

            const aggregatedData = result.data.reduce((acc, purchase) => {
                const purchaseDate = purchase.date;
                const totalAmount = purchase.ordermove.reduce((acc, line) => acc + line.itemcount * line.product.unitprice, 0);

                const existingEntry = acc.find(entry => entry.date === purchaseDate);
                if (existingEntry) {
                    existingEntry.totalAmount += totalAmount;
                } else {
                    acc.push({ date: purchaseDate, totalAmount });
                }

                return acc;
            }, []);

            setChartData(aggregatedData);
        });
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            const filtered = purchasing.filter(purchase => {
                const purchaseDate = new Date(purchase.date);
                return purchaseDate >= startDate && purchaseDate <= endDate;
            });
            setFilteredPurchasing(filtered);
        } else {
            setFilteredPurchasing(purchasing);
        }
    }, [startDate, endDate, purchasing]);

    return (
        <>
            <DashboadrdSideBar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className='w-full'>
                        <h1 className='mb-4 text-3xl text-gray-800 font-semibold'>Purchasing Report</h1>
                        <div className='w-full mt-10'>
                            <div className='w-full flex justify-between'>
                                <div>
                                    <PDFDownloadLink document={<PurchaseReportComponent partner={"Suplier"} type={"Purchasing"} lines={filteredPurchasing} start_date={startDate} end_date={endDate} />} fileName='purchasing report'>
                                        {({loading})=>(loading ? "creating..." : <button className="bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded">Download PDF</button> )}
                                    </PDFDownloadLink> 
                                </div>
                                <div className='flex'>
                                    <div className='text-gray-800 ml-4'>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={date => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            placeholderText="Start Date"
                                            className="mr-2 p-2 border rounded"
                                        />
                                        <DatePicker
                                            selected={endDate}
                                            onChange={date => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            placeholderText="End Date"
                                            className="p-2 border rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-10 w-full'>
                                <div className='grid grid-cols-2 gap-10'>
                                    <div className='h-full'>
                                        <table className='w-full table-fixed border-collapse mt-3'>
                                            <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                                <tr>
                                                    <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Supplier</th>
                                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date</th>
                                                    <th className='p-3 text-sm font-semibold tracking-wide text-right'>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className='divide-y divide-gray-200'>
                                                {filteredPurchasing.length > 0 ? (
                                                    filteredPurchasing.map((value, index) => (
                                                        <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                            <td className="p-3 text-sm text-gray-700">{index + 1}</td>
                                                            <td className="p-3 text-sm text-gray-700">{value.suplier.firstname + ' ' + value.suplier.lastname}</td>
                                                            <td className="p-3 text-sm text-gray-700">{value.date}</td>
                                                            <td className="p-3 text-sm text-gray-700 text-right">
                                                                {value.ordermove.map((line, lineIndex) => (
                                                                    <div key={lineIndex}>
                                                                        Rs.{line.itemcount * line.product.unitprice}
                                                                    </div>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr className="bg-white">
                                                        <td className="text-center text-blue-400 hover:underline cursor-pointer text-sm p-3" colSpan={4}>
                                                            No Purchasing Details Found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='w-full h-64'>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="totalAmount" fill="#8884d8" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchasesReport;
