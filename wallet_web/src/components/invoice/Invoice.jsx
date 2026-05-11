import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Invoice({deptId,refreshBal,refreshTrHis}) {

    const [invoices,setInvoices] = useState([])
    const [loadingId, setLoadingId] = useState(null)
    const {id} = useParams()

    // Demo Invoice Data
    // const invoices = [
    //     {
    //         id: 1,
    //         vendor: 'Amazon Web Services',
    //         refid: 'INV-AWS-1006',
    //         amount: 500,
    //         deptid: 1,
    //         userid: 2,
    //         descp: 'Cloud infrastructure payment'
    //     },
    //     {
    //         id: 2,
    //         vendor: 'Razorpay Services',
    //         refid: 'INV-RZP-1002',
    //         amount: 1500,
    //         deptid: 1,
    //         userid: 2,
    //         descp: 'Payment gateway charges'
    //     },
    //     {
    //         id: 3,
    //         vendor: 'Zoho Corporation',
    //         refid: 'INV-ZOHO-1003',
    //         amount: 700,
    //         deptid: 1,
    //         userid: 2,
    //         descp: 'CRM subscription renewal'
    //     },
    //     {
    //         id: 4,
    //         vendor: 'Slack Technologies',
    //         refid: 'INV-SLK-1004',
    //         amount: 2000,
    //         deptid: 1,
    //         userid: 2,
    //         descp: 'Team communication subscription'
    //     }
    // ]

    async function fetchInvoices() {
        try{
            const {data:resp} = await axios.get('http://localhost:5000/show-invoices',{
                params:{depid:deptId}
            })
            if(resp.success){
                setInvoices(resp.invoices)
            }
        }catch(e){
            console.log(e)
        }
    }

    // Handle Payment
    async function handlePay(invoice) {

        try {

            setLoadingId(invoice.id)

            const body = {
                amt: invoice.amount,
                deptid: deptId,
                userid: id,
                refid: invoice.refid,
                descp: invoice.vendor
            }

            const { data } = await axios.post(
                'http://localhost:5000/add-trans',
                body
            )

            console.log(data)
            if(refreshBal) refreshBal()
            if(refreshTrHis) refreshTrHis()
            fetchInvoices()
            
            alert(data.msg)

        } catch (err) {

            console.log(err)

            alert(
                err?.response?.data?.msg ||
                'Payment failed'
            )

        } finally {

            setLoadingId(null)
        }
    }

    useEffect(()=>{
        fetchInvoices()
    },[])

    return (

        <div className="bg-white rounded-xl shadow-md p-6 h-[500px] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        Pending Vendor Payments
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Simulate concurrent department expense payments
                    </p>

                </div>

                <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">
                    {invoices.length} Pending
                </span>

            </div>


            {/* Scrollable Invoice List */}
            <div className="space-y-4 overflow-y-auto pr-2 flex-1">

                {invoices.map((invoice) => (

                    <div
                        key={invoice.id}
                        className="border rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition"
                    >

                        {/* Left */}
                        <div>

                            <h3 className="font-semibold text-gray-800">
                                {invoice.vendor}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                {invoice.refid}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                {invoice.descp}
                            </p>

                        </div>


                        {/* Right */}
                        <div className="flex items-center gap-5">

                            <div className="text-right">

                                <p className="text-sm text-gray-500">
                                    Amount
                                </p>

                                <h3 className="text-lg font-bold text-red-500">
                                    ₹ {invoice.amount}
                                </h3>

                            </div>


                            <button
                                onClick={() => handlePay(invoice)}
                                disabled={loadingId === invoice.id}
                                className="
                                    bg-blue-600 hover:bg-blue-700
                                    text-white px-5 py-2 rounded-lg
                                    font-medium transition cursor-pointer disabled:opacity-50
                                "
                            >

                                {loadingId === invoice.id
                                    ? 'Processing...'
                                    : 'Pay'
                                }

                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default Invoice