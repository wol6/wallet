import React from 'react';
import BalanceCard from './balance/BalanceCard';
import Invoice from './invoice/Invoice';
import TransactionList from './transhistory/TransactionList';

function Dashboard({deptId}) {

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Department Expense Wallet
                </h1>

                <p className="text-gray-500 mt-1">
                    Finance Department Dashboard
                </p>
            </div>


            {/* Balance Card */}
            <BalanceCard deptId={deptId}/>


            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                {/* Payment Section */}
                <Invoice deptId={deptId} />

                {/* Transactions Section */}
                <TransactionList deptId={deptId}/>

            </div>

        </div>
    );
}

export default Dashboard;