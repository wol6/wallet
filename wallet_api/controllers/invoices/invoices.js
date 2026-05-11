import pool from "../../db/db.js"

export const invoicesList = async (req, res) => {
    try {
        const { depid } = req.query
        console.log('invoices',depid)
        const list = await pool.query(`
            SELECT *
            FROM invoices
            WHERE paid = FALSE
            AND depid = $1;
             `, [depid])

        res.json({
            success: true,
            invoices: list.rows
        })
    } catch (e) {
        console.log(e)
    }
}