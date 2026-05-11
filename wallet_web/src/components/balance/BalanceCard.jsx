import axios from 'axios'
import React, { useEffect, useState } from 'react'

function BalanceCard({deptId,setRefreshBal}) {
    const [balance, setBalance] = useState(null)
    async function fetchBal() {
        try {
            const { data: resp } = await axios.get('http://localhost:5000/show-bal',{
                params:{
                    deptId
                }
            })

            const bal = resp.bal[0].balance
            setBalance(bal)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchBal()

        setRefreshBal(()=>fetchBal)
    }, [])
    return (
        <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">

                <p className="text-gray-500 text-sm">
                    Current Wallet Balance
                </p>

                <h2 className="text-4xl font-bold text-green-600 mt-2">
                    {balance}
                </h2>

            </div>
        </>
    )
}

export default BalanceCard
