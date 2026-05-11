async function pay(i) {

    const body = {
        amt: 13000,
        deptid: 4,
        userid: i,
        refid: `race-ref1-${i}`,
        descp: 'race-test'
    }

    try {

        const resp = await fetch(
            'http://localhost:5000/add-trans',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(body)
            }
        )

        const data = await resp.json()

        console.log(data)

    } catch (err) {

        console.log(err)
    }
}

Promise.all([
    pay(1),
    pay(2),
    pay(3),
    pay(4),
    pay(5)
])