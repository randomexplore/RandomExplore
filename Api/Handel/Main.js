const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const SSS = require("../SSS/sss")
const con = require("../BD/bd")
const crypto = require("crypto");



const bunm = process.env.RNEXAW_BUNM

const handelSCRL = async (req, res) => {


    if (req.body.text.sct != process.env.XOCP_SRCFOR_VRFY_OWN || !req.body.text.sct) {
        res.json("👎")
    }
    else if (req.body.text.sct == process.env.XOCP_SRCFOR_VRFY_OWN) {
        const IMGnmquery = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN} WHERE id = ${req.body.text.id} `;
        await con.query(IMGnmquery, async (err, results) => {


            const Nmky = results[0][process.env.DB_FLD_IMNM];

            const params = {
                Bucket: process.env.RNEXAW_BUNM,
                Key: process.env.RNEXAW_BKY + Nmky
            }
            const command = new DeleteObjectCommand(params);
            await SSS.send(command);


        })
        await con.query(`DELETE FROM ${process.env.DB_TB_MAIN} WHERE id = ${req.body.text.id}`)


        const randombytes = crypto.randomBytes(32).toString('hex')

        const params = {
            Bucket: bunm,
            Key: process.env.RNEXAW_BKY + randombytes,
            Body: req.file.buffer,
        };
        const command = new PutObjectCommand(params);
        SSS.send(command, (err, data) => {
            if (err) {
                console.error('Error to uploading:', err);
                res.status(500)
            }
        })
        const XARTID = process.env.DB_FLD_XARTID
        const XARTTTL = process.env.DB_FLD_XARTTTL
        const XARTDIS = process.env.DB_FLD_XARTDIS
        const IMNM = process.env.DB_FLD_IMNM
        const bolda = [{
            [XARTID]: req.body.text.id,
            [XARTTTL]: req.body.text.ttl,
            [XARTDIS]: req.body.text.art,
            [IMNM]: randombytes
        }]

        con.query(`INSERT INTO ${process.env.DB_TB_MAIN} SET ?`, bolda)

    }

}



const executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        con.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const GSCRL = async (req, res) => {
    var signedUrls = [];
    try {
        const IMGUquery = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN}`;
        await con.query(IMGUquery, async (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return;
            }

            for (const row of results) {
                const Nmky = row[process.env.DB_FLD_IMNM];

                const IM_U = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKY}${Nmky} `

                signedUrls.push({ IM_U })
            }


            const query2 = `SELECT ${process.env.DB_FLD_XARTID} FROM ${process.env.DB_TB_MAIN}`;
            const query3 = `SELECT ${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN}`;
            const results2 = await executeQuery(query2);
            const results3 = await executeQuery(query3);
            const data = {
                results1: signedUrls,
                results2: results2,
                results3: results3,
            };
            res.send(data);



        })
    } catch (error) {
        res.json("👎")
    }
}



const PPOST = (req, res) => {
    if (req.body.text.sct != process.env.XOCP_SRCFOR_VRFY_OWN || !req.body.text.sct) {
        res.json("👎")
    }
    else if (req.body.text.sct == process.env.XOCP_SRCFOR_VRFY_OWN) {

        var RNEXAW_BKYCATE = ""
        if (req.body.cate == process.env.DB_TB_CATE_CATERANDEX) { RNEXAW_BKYCATE = process.env.RNEXAW_BKYCATERANDEX }
        if (req.body.cate == process.env.DB_TB_CATE_CATEENT) { RNEXAW_BKYCATE = process.env.RNEXAW_BKYCATE }
        if (req.body.cate == process.env.DB_TB_CATE_CATETRA) { RNEXAW_BKYCATE = process.env.RNEXAW_BKYCATETRL }
        if (req.body.cate == process.env.DB_TB_CATE_CATECOK) { RNEXAW_BKYCATE = process.env.RNEXAW_BKYCATECOK }
        if (req.body.cate == process.env.DB_TB_CATE_CATEFIN) { RNEXAW_BKYCATE = process.env.RNEXAW_BKYCATEFIN }
        if (req.body.cate == process.env.DB_TB_CATE_CATETEC) { RNEXAW_BKYCATE = process.env.RNEXAW_BKYCATETEC }

        const randombytes = crypto.randomBytes(32).toString('hex')
        const randomytesforid = crypto.randomBytes(16).toString('hex')
        const params = {
            Bucket: bunm,
            Key: RNEXAW_BKYCATE + randombytes,
            Body: req.file.buffer,
        };
        const command = new PutObjectCommand(params);
        SSS.send(command, (err, data) => {
            if (err) {
                console.error('Error to uploading:', err);
                res.status(500)
            }
        })

        const XARTID = process.env.DB_FLD_XARTID
        const XARTTTL = process.env.DB_FLD_XARTTTL
        const XARTDIS = process.env.DB_FLD_XARTDIS
        const IMNM = process.env.DB_FLD_IMNM
        const XARTDT = process.env.DB_FLD_XARTDT
        const bolda = [{
            [XARTID]: randomytesforid,
            [XARTTTL]: req.body.text.ttl,
            [XARTDIS]: req.body.text.art,
            [IMNM]: randombytes,
            [XARTDT]: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }]
        if (req.body.cate == process.env.DB_TB_CATE_CATEENT) { con.query(`INSERT INTO ${process.env.DB_TB_MAIN_CATEENT} SET ?`, bolda) }
        if (req.body.cate == process.env.DB_TB_CATE_CATECOK) { con.query(`INSERT INTO ${process.env.DB_TB_MAIN_CATECOK} SET ?`, bolda) }
        if (req.body.cate == process.env.DB_TB_CATE_CATEFIN) { con.query(`INSERT INTO ${process.env.DB_TB_MAIN_CATEFIN} SET ?`, bolda) }
        if (req.body.cate == process.env.DB_TB_CATE_CATERANDEX) { con.query(`INSERT INTO ${process.env.DB_TB_MAIN_CATERANDEX} SET ?`, bolda) }
        if (req.body.cate == process.env.DB_TB_CATE_CATETRA) { con.query(`INSERT INTO ${process.env.DB_TB_MAIN_CATETRA} SET ?`, bolda) }
        if (req.body.cate == process.env.DB_TB_CATE_CATETEC) { con.query(`INSERT INTO ${process.env.DB_TB_MAIN_CATETEC} SET ?`, bolda) }


    }
}



const GCATEPOST = async (req, res) => {

    var count = 1

    const executeCateQuery = (query) => {

        return new Promise(async (resolve, reject) => {
            await con.query(query, async (err, results) => {
                if (err) {
                    reject(err)
                } else {

                    const urls = []

                    for (const row of results) {
                        var key = process.env.RNEXAW_BKYCATE

                        if (count == 2) {
                            key = process.env.RNEXAW_BKYCATECOK
                        }
                        if (count == 3) {
                            key = process.env.RNEXAW_BKYCATEFIN
                        } if (count == 4) {
                            key = process.env.RNEXAW_BKYCATERANDEX
                        } if (count == 5) {
                            key = process.env.RNEXAW_BKYCATETRL
                        }
                        if (count == 6) {
                            key = process.env.RNEXAW_BKYCATETEC
                        }
                        const Nmky = row[process.env.DB_FLD_IMNM];

                        const Ul = `${process.env.AW_CD_NLNK}${key + Nmky} `
                        urls.push({ Ul })
                    }

                    resolve(urls)
                }
            })
        })
    };

    var signedUrls = []

    const IMGCateentquery = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATEENT} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 6`;
    const IMGCatecokquery = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATECOK} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 6`;
    const IMGCatefinquery = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATEFIN} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 6`;
    const IMGCaterandexquery = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATERANDEX} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 8`;
    const IMGCatetraquery = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATETRA} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 6`;
    const IMGCatetecquery = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATETEC} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 6`;

    const Cateent = await executeCateQuery(IMGCateentquery)
    signedUrls.push({ Cateent })
    const Catecok = await executeCateQuery(IMGCatecokquery, count = 2)
    signedUrls.push({ Catecok })
    const Catefin = await executeCateQuery(IMGCatefinquery, count = 3)
    signedUrls.push({ Catefin })
    const Caterandex = await executeCateQuery(IMGCaterandexquery, count = 4)
    signedUrls.push({ Caterandex })
    const Catetra = await executeCateQuery(IMGCatetraquery, count = 5)
    signedUrls.push({ Catetra })
    const Catetec = await executeCateQuery(IMGCatetecquery, count = 6)
    signedUrls.push({ Catetec })

    const IDTTLCateent = `SELECT ${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATEENT} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 6`
    const IDTTLCatecok = `SELECT ${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATECOK} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 6`
    const IDTTLCatefin = `SELECT ${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATEFIN} ORDER BY ${process.env.DB_FLD_XARTDT} DESC  LIMIT 6`
    const IDTTLCaterandex = `SELECT ${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATERANDEX} ORDER BY ${process.env.DB_FLD_XARTDT} DESC  LIMIT 8`
    const IDTTLCatetra = `SELECT ${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATETRA}  ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 6`
    const IDTTLCatetec = `SELECT ${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATETEC}  ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 6`

    const Cateentidttlresult = await executeQuery(IDTTLCateent)
    const Catecokidttlresult = await executeQuery(IDTTLCatecok)
    const Catefinidttlresult = await executeQuery(IDTTLCatefin)
    const Caterandexidttlresult = await executeQuery(IDTTLCaterandex)
    const Catetraidttlresult = await executeQuery(IDTTLCatetra)
    const Catetecidttlresult = await executeQuery(IDTTLCatetec)

    const data = {
        signedUrls,
        Cateentidttlresult,
        Catecokidttlresult,
        Catefinidttlresult,
        Caterandexidttlresult,
        Catetraidttlresult,
        Catetecidttlresult
    }

    res.send(data)

}


const DPOST = (req, res) => {

    if (req.body.deleidsct.delsct != process.env.XOCP_SRCFOR_VRFY_OWN || !req.body.deleidsct.delsct) {
        res.json("👎")
    }
    else if (req.body.deleidsct.delsct == process.env.XOCP_SRCFOR_VRFY_OWN) {


        if (req.body.delcatename == process.env.DB_TB_CATE_CATEENT) {


            con.query(`SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATEENT}  WHERE id = ?`, [req.body.deleidsct.delid], async (err, res) => {

                try {
                    const Nmky = res[0][process.env.DB_FLD_IMNM]
                    const params = {
                        Bucket: process.env.RNEXAW_BUNM,
                        Key: process.env.RNEXAW_BKYCATE + Nmky
                    }
                    const command = new DeleteObjectCommand(params);
                    await SSS.send(command);

                    await con.query('DELETE FROM ?? WHERE id = ?', [process.env.DB_TB_MAIN_CATEENT, req.body.deleidsct.delid])
                } catch {  }

            })
        }
        if (req.body.delcatename == process.env.DB_TB_CATE_CATECOK) {
            con.query(`SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATECOK}  WHERE id = ?`, [req.body.deleidsct.delid], async (err, res) => {
                try {
                    const Nmky = res[0][process.env.DB_FLD_IMNM]
                    const params = {
                        Bucket: process.env.RNEXAW_BUNM,
                        Key: process.env.RNEXAW_BKYCATECOK + Nmky
                    }
                    const command = new DeleteObjectCommand(params);
                    await SSS.send(command);

                    await con.query('DELETE FROM ?? WHERE id = ?', [process.env.DB_TB_MAIN_CATECOK, req.body.deleidsct.delid])
                } catch { }
            })
        }
        if (req.body.delcatename == process.env.DB_TB_CATE_CATEFIN) {
            con.query(`SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATEFIN}  WHERE id = ?`, [req.body.deleidsct.delid], async (err, res) => {
                try {
                    const Nmky = res[0][process.env.DB_FLD_IMNM]
                    const params = {
                        Bucket: process.env.RNEXAW_BUNM,
                        Key: process.env.RNEXAW_BKYCATEFIN + Nmky
                    }
                    const command = new DeleteObjectCommand(params);
                    await SSS.send(command);

                    await con.query('DELETE FROM ?? WHERE id = ?', [process.env.DB_TB_MAIN_CATEFIN, req.body.deleidsct.delid])
                } catch {}
            })
        }
        if (req.body.delcatename == process.env.DB_TB_CATE_CATERANDEX) {
            con.query(`SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATERANDEX}  WHERE id = ?`, [req.body.deleidsct.delid], async (err, res) => {
                try {
                    const Nmky = res[0][process.env.DB_FLD_IMNM]
                    const params = {
                        Bucket: process.env.RNEXAW_BUNM,
                        Key: process.env.RNEXAW_BKYCATERANDEX + Nmky
                    }
                    const command = new DeleteObjectCommand(params);
                    await SSS.send(command);

                    await con.query('DELETE FROM ?? WHERE id = ?', [process.env.DB_TB_MAIN_CATERANDEX, req.body.deleidsct.delid])
                } catch {}
            })
        }
        if (req.body.delcatename == process.env.DB_TB_CATE_CATETEC) {
            con.query(`SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATETEC}  WHERE id = ?`, [req.body.deleidsct.delid], async (err, res) => {
                try {
                    const Nmky = res[0][process.env.DB_FLD_IMNM]
                    const params = {
                        Bucket: process.env.RNEXAW_BUNM,
                        Key: process.env.RNEXAW_BKYCATETEC + Nmky
                    }
                    const command = new DeleteObjectCommand(params);
                    await SSS.send(command);

                    await con.query('DELETE FROM ?? WHERE id = ?', [process.env.DB_TB_MAIN_CATETEC, req.body.deleidsct.delid])
                } catch { }
            })
        }
        if (req.body.delcatename == process.env.DB_TB_CATE_CATETRA) {
            con.query(`SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATETRA}  WHERE id = ?`, [req.body.deleidsct.delid], async (err, res) => {
                try {
                    const Nmky = res[0][process.env.DB_FLD_IMNM]
                    const params = {
                        Bucket: process.env.RNEXAW_BUNM,
                        Key: process.env.RNEXAW_BKYCATETRL + Nmky
                    }
                    const command = new DeleteObjectCommand(params);
                    await SSS.send(command);

                    await con.query('DELETE FROM ?? WHERE id = ?', [process.env.DB_TB_MAIN_CATETRA, req.body.deleidsct.delid])
                } catch {}
            })
        }

    }
}

const GMPOST = async (req, res) => {
    const data = []
    if (req.params[process.env.MPOSTCATEDETL] == process.env.DB_TB_MAIN) {
        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res = await executeQuery(query)
        const NMKY = res[0][process.env.DB_FLD_IMNM]

        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKY + NMKY} `



        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTDIS} FROM ${process.env.DB_TB_MAIN}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res2 = await executeQuery(query2)

        data.push({ Ul, res2 })
    }
    if (req.params[process.env.MPOSTCATEDETL] == process.env.DB_TB_CATE_CATEENT) {
        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATEENT}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res = await executeQuery(query)
        const NMKY = res[0][process.env.DB_FLD_IMNM]

        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATE + NMKY} `

        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTDIS} FROM ${process.env.DB_TB_MAIN_CATEENT}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res2 = await executeQuery(query2)

        data.push({ Ul, res2 })
    }
    if (req.params[process.env.MPOSTCATEDETL] == process.env.DB_TB_CATE_CATETRA) {
        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATETRA}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res = await executeQuery(query)
        const NMKY = res[0][process.env.DB_FLD_IMNM]

        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATETRL + NMKY} `


        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTDIS} FROM ${process.env.DB_TB_MAIN_CATETRA}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res2 = await executeQuery(query2)

        data.push({ Ul, res2 })
    }
    if (req.params[process.env.MPOSTCATEDETL] == process.env.DB_TB_CATE_CATEFIN) {

        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATEFIN}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res = await executeQuery(query)
        const NMKY = res[0][process.env.DB_FLD_IMNM]

        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATEFIN + NMKY} `


        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTDIS} FROM ${process.env.DB_TB_MAIN_CATEFIN}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res2 = await executeQuery(query2)

        data.push({ Ul, res2 })
    }
    if (req.params[process.env.MPOSTCATEDETL] == process.env.DB_TB_CATE_CATECOK) {

        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATECOK}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res = await executeQuery(query)
        const NMKY = res[0][process.env.DB_FLD_IMNM]


        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATECOK + NMKY} `


        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTDIS} FROM ${process.env.DB_TB_MAIN_CATECOK}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res2 = await executeQuery(query2)

        data.push({ Ul, res2 })
    }
    if (req.params[process.env.MPOSTCATEDETL] == process.env.DB_TB_CATE_CATERANDEX) {

        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATERANDEX}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res = await executeQuery(query)

        const NMKY = res[0][process.env.DB_FLD_IMNM]

        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATERANDEX + NMKY} `

        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTDIS} FROM ${process.env.DB_TB_MAIN_CATERANDEX}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res2 = await executeQuery(query2)

        data.push({ Ul, res2 })
    }
    if (req.params[process.env.MPOSTCATEDETL] == process.env.DB_TB_CATE_CATETEC) {
        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATETEC}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res = await executeQuery(query)
        const NMKY = res[0][process.env.DB_FLD_IMNM]


        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATETEC + NMKY} `


        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTDIS} FROM ${process.env.DB_TB_MAIN_CATETEC}  WHERE id = '${req.params[process.env.MPOSTDETL]}'`
        const res2 = await executeQuery(query2)

        data.push({ Ul, res2 })
    }

    res.send(data)
}

const GCATEPTS = async (req, res) => {
    const data = []
    if (req.params.name === "Entertainment") {
        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATEENT} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res = await executeQuery(query)
        for (const row of res) {
            const NMKY = row[process.env.DB_FLD_IMNM]

            const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATE + NMKY} `

            data.push({ Ul })
            data.push({ name: 'entertainment' })
        }
        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTID} FROM ${process.env.DB_TB_MAIN_CATEENT} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res2 = await executeQuery(query2)
        data.push({ res2 })
    }
    if (req.params.name === "Travel") {
        const urls = []
        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATETRA} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res = await executeQuery(query)
        for (const row of res) {
            const NMKY = row[process.env.DB_FLD_IMNM]

            const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATETRL + NMKY} `

            data.push({ Ul })
            data.push({ name: 'travel' })
        }
        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTID} FROM ${process.env.DB_TB_MAIN_CATETRA} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res2 = await executeQuery(query2)
        data.push({ res2 })
    }
    if (req.params.name === "Cooking") {
        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATECOK} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res = await executeQuery(query)
        for (const row of res) {
            const NMKY = row[process.env.DB_FLD_IMNM]

            const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATECOK + NMKY} `

            data.push({ Ul })
            data.push({ name: 'cooking' })
        }
        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTID} FROM ${process.env.DB_TB_MAIN_CATECOK} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res2 = await executeQuery(query2)
        data.push({ res2 })
    }
    if (req.params.name === "Technology") {
        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATETEC} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res = await executeQuery(query)
        for (const row of res) {
            const NMKY = row[process.env.DB_FLD_IMNM]

            const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATETEC + NMKY} `

            data.push({ Ul })
            data.push({ name: 'technology' })
        }
        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTID} FROM ${process.env.DB_TB_MAIN_CATETEC} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res2 = await executeQuery(query2)
        data.push({ res2 })
    }

    if (req.params.name === "Randomexplore") {
        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATERANDEX} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res = await executeQuery(query)
        for (const row of res) {
            const NMKY = row[process.env.DB_FLD_IMNM]

            const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATERANDEX + NMKY} `

            data.push({ Ul })
            data.push({ name: 'randomexplore' })
        }
        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTID} FROM ${process.env.DB_TB_MAIN_CATERANDEX} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res2 = await executeQuery(query2)
        data.push({ res2 })
    }

    if (req.params.name === "Financial") {
        const query = `SELECT ${process.env.DB_FLD_IMNM} FROM ${process.env.DB_TB_MAIN_CATEFIN} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res = await executeQuery(query)
        for (const row of res) {
            const NMKY = row[process.env.DB_FLD_IMNM]

            const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATEFIN + NMKY} `

            data.push({ Ul })
            data.push({ name: 'financial' })
        }
        const query2 = `SELECT ${process.env.DB_FLD_XARTTTL},${process.env.DB_FLD_XARTID} FROM ${process.env.DB_TB_MAIN_CATEFIN} ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 12 OFFSET ${req.params.count}`
        const res2 = await executeQuery(query2)
        data.push({ res2 })
    }

    res.send({ data })
}

const GSCRH = async (req, res) => {

    const data = []

    const searchQuery = req.body.srchV
    const query = `SELECT ${process.env.DB_FLD_IMNM},${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATEFIN} WHERE ${process.env.DB_FLD_XARTTTL} LIKE '%${searchQuery}%' ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 2 `
    const query1 = `SELECT ${process.env.DB_FLD_IMNM},${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATEENT} WHERE ${process.env.DB_FLD_XARTTTL} LIKE '%${searchQuery}%' ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 2 `
    const query2 = `SELECT ${process.env.DB_FLD_IMNM},${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATETRA} WHERE ${process.env.DB_FLD_XARTTTL} LIKE '%${searchQuery}%' ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 2 `
    const query3 = `SELECT ${process.env.DB_FLD_IMNM},${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATECOK} WHERE ${process.env.DB_FLD_XARTTTL} LIKE '%${searchQuery}%' ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 2 `
    const query4 = `SELECT ${process.env.DB_FLD_IMNM},${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATERANDEX} WHERE ${process.env.DB_FLD_XARTTTL} LIKE '%${searchQuery}%' ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 2 `
    const query5 = `SELECT ${process.env.DB_FLD_IMNM},${process.env.DB_FLD_XARTID},${process.env.DB_FLD_XARTTTL} FROM ${process.env.DB_TB_MAIN_CATETEC} WHERE ${process.env.DB_FLD_XARTTTL} LIKE '%${searchQuery}%' ORDER BY ${process.env.DB_FLD_XARTDT} DESC LIMIT 2 `

    const res0 = await executeQuery(query)
    const res1 = await executeQuery(query1)
    const res2 = await executeQuery(query2)
    const res3 = await executeQuery(query3)
    const res4 = await executeQuery(query4)
    const res5 = await executeQuery(query5)

    for (const row of res0) {
        const NMKY = row[process.env.DB_FLD_IMNM]

        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATEFIN + NMKY} `


        data.push({ Ul })
        data.push({ name: 'financial' })
        data.push({ id: row[process.env.DB_FLD_XARTID] })
        data.push({ TTl: row[process.env.DB_FLD_XARTTTL] })
    }
    for (const row of res1) {
        const NMKY = row[process.env.DB_FLD_IMNM]

        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATE + NMKY} `

        data.push({ Ul })
        data.push({ name: 'entertainment' })
        data.push({ id: row[process.env.DB_FLD_XARTID] })
        data.push({ TTl: row[process.env.DB_FLD_XARTTTL] })
    }
    for (const row of res2) {
        const NMKY = row[process.env.DB_FLD_IMNM]

        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATETRL + NMKY} `

        data.push({ Ul })
        data.push({ name: 'travel' })
        data.push({ id: row[process.env.DB_FLD_XARTID] })
        data.push({ TTl: row[process.env.DB_FLD_XARTTTL] })
    }
    for (const row of res3) {
        const NMKY = row[process.env.DB_FLD_IMNM]

        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATECOK + NMKY} `

        data.push({ Ul })
        data.push({ name: 'cooking' })
        data.push({ id: row[process.env.DB_FLD_XARTID] })
        data.push({ TTl: row[process.env.DB_FLD_XARTTTL] })
    }
    for (const row of res4) {
        const NMKY = row[process.env.DB_FLD_IMNM]

        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATERANDEX + NMKY} `

        data.push({ Ul })
        data.push({ name: 'randomexplore' })
        data.push({ id: row[process.env.DB_FLD_XARTID] })
        data.push({ TTl: row[process.env.DB_FLD_XARTTTL] })
    } for (const row of res5) {
        const NMKY = row[process.env.DB_FLD_IMNM]

        const Ul = `${process.env.AW_CD_NLNK}${process.env.RNEXAW_BKYCATETEC + NMKY} `

        data.push({ Ul })
        data.push({ name: 'technology' })
        data.push({ id: row[process.env.DB_FLD_XARTID] })
        data.push({ TTl: row[process.env.DB_FLD_XARTTTL] })
    }

    res.send(data)
}

module.exports = { handelSCRL, GSCRL, PPOST, GCATEPOST, DPOST, GMPOST, GCATEPTS, GSCRH };   