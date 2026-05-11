import pool from "../../db/db.js";

export const addTrans = async (req, res) => {
    console.log('trans begin')
    const client = await pool.connect();

    try {
        console.log('trans his',req.body)
        const {amt,deptid,userid,refid,descp} = req.body
        // const amt = 1500;
        // const deptid = 1;
        // const userid = 2;
        // const refid = "INV-1002";
        // const descp = "RZP payment"

        // START TRANSACTION
        await client.query("BEGIN");


        // IDEMPOTENCY CHECK
        const existingTransaction = await client.query(
            `
            SELECT * FROM transactions
            WHERE reference_id = $1
            `,
            [refid]
        );

        if (existingTransaction.rows.length > 0) {

            await client.query("ROLLBACK");

            return res.status(409).json({
                success: false,
                msg: "Transaction already processed"
            });
        }


        // LOCK WALLET ROW
        const walletResult = await client.query(
            `
            SELECT *
            FROM wallets
            WHERE department_id = $1
            FOR UPDATE
            `,
            [deptid]
        );


        // WALLET NOT FOUND
        if (walletResult.rows.length === 0) {

            await client.query("ROLLBACK");

            return res.status(404).json({
                success: false,
                msg: "Wallet not found"
            });
        }


        const wallet = walletResult.rows[0];

        const balance = Number(wallet.balance);

        const walletid = wallet.id;


        // INSUFFICIENT FUNDS
        if (balance < amt) {

            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                msg: "Insufficient balance"
            });
        }


        const newBal = balance - amt;


        // UPDATE WALLET
        await client.query(
            `
            UPDATE wallets
            SET balance = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            `,
            [newBal, walletid]
        );


        // INSERT TRANSACTION
        await client.query(
            `
            INSERT INTO transactions(
                wallet_id,
                user_id,
                amount,
                type,
                status,
                reference_id,
                description,
                balance_before,
                balance_after
            )
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
            `,
            [
                walletid,
                userid,
                amt,
                "debit",
                "success",
                refid,
                descp,
                balance,
                newBal
            ]
        );

        await pool.query(`
           UPDATE invoices
            SET paid = true
            WHERE refid = $1; 
             `,[refid])

        // COMMIT
        await client.query("COMMIT");


        return res.json({
            success: true,
            msg: "Payment successful",
            remainingBalance: newBal
        });

    } catch (err) {

        // ROLLBACK ON ERROR
        await client.query("ROLLBACK");

        console.log(err);

        return res.status(500).json({
            success: false,
            msg: "Server error"
        });

    } finally {

        client.release();
    }
};

export const showTrans = async (req, res) => {

    try {
        const id = req.query.deptId
        console.log('trans',id)
        const result = await pool.query(`
            SELECT *
            FROM transactions
            WHERE wallet_id=$1
            ORDER BY created_at DESC
        `,[id]);

        res.json({
            success: true,
            data: result.rows
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            msg: "Failed to fetch transactions"
        });

    }
};