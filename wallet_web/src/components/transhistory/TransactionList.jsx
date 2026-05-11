import axios from 'axios'
import React, { useEffect, useState } from 'react'

function TransactionList({deptId}) {

    const [list, setList] = useState([])

    async function fetchTransList() {

        try {

            const { data: resp } = await axios.get(
                'http://localhost:5000/show-trans',{
                    params:{
                        deptId
                    }
                }
            )

            setList(resp.data)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchTransList()
    }, [])


    return (

        <div className="bg-white rounded-xl shadow-md p-6 h-[500px] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">

                <h2 className="text-xl font-semibold text-gray-800">
                    Recent Transactions
                </h2>

                <button className="text-sm text-blue-600 font-medium">
                    View All
                </button>

            </div>


            {/* Empty State */}
            {list.length === 0 && (

                <div className="flex-1 flex items-center justify-center text-gray-500">
                    No Transactions Found
                </div>

            )}


            {/* Scrollable List */}
            <div className="space-y-4 overflow-y-auto pr-2 flex-1">

                {list.map((item) => (

                    <div
                        key={item.id}
                        className="border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition"
                    >

                        {/* Left */}
                        <div>

                            <p className="font-medium text-gray-800">
                                {item.reference_id}
                            </p>

                            {/* <p className="text-sm text-gray-500 mt-1">
                                Wallet ID : {item.wallet_id}
                            </p> */}

                            <p className="text-xs text-gray-400 mt-1">
                                User ID : {item.user_id}
                            </p>

                        </div>


                        {/* Right */}
                        <div className="text-right">

                            <p className="font-semibold text-red-500">
                                - ₹{item.amount}
                            </p>

                            <p
                                className={`
                            text-sm mt-1 font-medium
                            ${item.status === 'success'
                                        ? 'text-green-600'
                                        : item.status === 'failed'
                                            ? 'text-red-600'
                                            : 'text-yellow-600'
                                    }
                        `}
                            >
                                {item.status}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(item.created_at).toLocaleString()}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default TransactionList