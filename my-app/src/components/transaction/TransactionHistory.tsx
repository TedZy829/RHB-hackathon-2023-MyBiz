import React, { useEffect, useState } from 'react';
import { supabaseAdmin } from '../../supabase';
import Header from '../Header';

interface transaction{
    transferid:number;
    created_at: string;
    senderID:number;
    senderAccNum:number;
    Amount:string;
    Description:string;
    Destination:string;
    isScheduled:string;
    scheduleDate:string;
}

function TransactionHistory() {

    const [transactionsdata, setTransactiondata] = useState<transaction []>()

    useEffect(() => {supabaseAdmin
        .from('transfer')
        .select()
        .eq('senderID', sessionStorage.getItem("id"))
        .then(({ data, error }) => {
        if (!error) {
            // console.log(typeof data[0].scheduleDate)
            setTransactiondata(data)
        }
        }) }, [])
    

    return (
        <div>
            <Header/>
            <div className="block p-8 rounded-lg shadow-lg bg-white w-3/4 max-w-lg mx-auto">
                <div className="w-6/7 sm:p-2 m-4 lg:p-4 m-4 bg-white shadow-md">
                    <div className="flex justify-between">
                        <span className="text-xl font-semibold">Transaction History</span>
                    </div>
                </div>

                <table className="table-auto border-separate border-spacing-x-7" id="transaction_history_table">
                    <thead className="text-center" id="transaction_history_table_head">
                        <tr>
                        <th className="w-1/6">ID</th>
                        <th className="w-1/4">Date</th>
                        <th className="w-1/4">Amount</th>
                        <th className="w-1/3">Discription</th>
                        </tr>
                    </thead>

                    <tbody className="text-center" id="transaction_history_table_body">
                        {transactionsdata? transactionsdata.map((detail, index)=>
                        {return (
                            <tr key={index}>
                                <td id="history_data_id">{detail.transferid}</td>
                                <td id="history_data_date">{detail.created_at.slice(0,10)}</td>
                                <td className="text-red-600" id="history_data_amount">-RM {detail.Amount}</td>
                                <td id="history_data_recipient">{detail.Description}</td>
                            </tr>
                        )}):<></>}
                        
                        {/* <tr>
                        <td id="history_data_id">00001</td>
                        <td id="history_data_date">11/01/2023</td>
                        <td className="text-red-600" id="history_data_amount">-RM 570.00</td>
                        <td id="history_data_recipient">Alun Company</td>
                        </tr>

                        <tr>
                        <td id="history_data_id">00002</td>
                        <td id="history_data_date">08/01/2023</td>
                        <td id="history_data_amount" className="text-green-600">RM 800.00</td>
                        <td id="history_data_recipient">Asun Company</td>
                        </tr>

                        <tr>
                        <td id="history_data_id">00001</td>
                        <td id="history_data_date">05/01/2023</td>
                        <td id="history_data_amount" className="text-red-600">-RM 340.00</td>
                        <td id="history_data_recipient">Awen Company</td>
                        </tr> */}
                    </tbody>
                    </table>
            </div>
        </div>
    );
}

export default TransactionHistory;