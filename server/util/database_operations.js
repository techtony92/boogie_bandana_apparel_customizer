const createConnectionPool = require("@databases/pg");
const {sql} = require("@databases/pg");
const {DatabaseQuerySuccessMessages, DatabaseQueryErrorMessages, DatabaseStatusMessages} = require("../messages/databaseStatusMessages");
const databaseConnector = async (transferConnection)=>{
    const connector = await createConnectionPool("postgres://tmk:nulltech599239@localhost:6000/apparel_customizer_database");
    transferConnection(connector);

}

const createProductTable = async (connector) => {
    await connector.query(sql`
    CREATE TABLE IF NOT EXISTS products(
        id SERIAL NOT NULL PRIMARY KEY,
        UUID BIGINT NOT NULL ,
        name VARCHAR(255) NOT NULL ,
        size VARCHAR(255) NOT NULL ,
        rating INT NOT NULL ,
        type VARCHAR(255) NOT NULL ,
        category VARCHAR(255) NOT NULL 
    )`);
}

const createUserTable = async (connector) => {
    await connector.query(sql`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL PRIMARY KEY,
    UUID BIGINT NOT NULL ,
    username VARCHAR(255) NOT NULL ,
    email VARCHAR(255) NOT NULL ,
    password VARCHAR(255) NOT NULL, 
    registered DATE
    )`);
}

const insertUser = async (connector,uuid,username,email,password, sendResult) =>{
    
    try {
        await connector.query(sql`
        INSERT INTO users (uuid, username,email,password, registered)
        VALUES (${uuid},${username}, ${email}, ${password}, ${PGSQL_date_now()})
        `);
        sendResult({successMessage:DatabaseQuerySuccessMessages.QuerySuccess,
            successValue:DatabaseQuerySuccessMessages.QuerySuccessValue
        })
    } catch (error) {
        sendResult({ErrorMessage: DatabaseQueryErrorMessages.queryFailedError,
                    ErrorValue:DatabaseQueryErrorMessages.queryFailedValue,
                    QueryError:error
                });
    }

    console.log(result);
};

const findUser = async(connector, queryBy,sendResult) =>{
    try {
        let result = await connector.query(sql`
        SELECT * FROM users WHERE email OR username = ${queryBy}
        `);
        if(result.length >= 0){
            sendResult({successMessage:DatabaseQuerySuccessMessages.QuerySuccess,
                successValue:DatabaseQuerySuccessMessages.QuerySuccessValue,
                result:result,
    
            })
        }

        sendResult({message:DatabaseStatusMessages.queryDataNotFound,
                    messageValue:DatabaseStatusMessages.queryDataNotFoundValue,
        })
    } catch (error) {
        sendResult({ErrorMessage: DatabaseQueryErrorMessages.queryFailedError,
                    ErrorValue:DatabaseQueryErrorMessages.queryFailedValue,
                    QueryError:error
        });
    }
}

const insertProduct = async (connector, uuid, name, size, rating,type,category, sendResult) => {
    try {
        await connector.query(sql`
        INSERT INTO products(uuid, name,size,rating,type,category)
        values(${uuid}, ${name}, ${size}, ${rating}, ${type}, ${category})
        `)
        sendResult({successMessage:DatabaseQuerySuccessMessages.QuerySuccess,
            successValue:DatabaseQuerySuccessMessages.QuerySuccessValue,

        })
    } catch (error) {
        sendResult({ErrorMessage: DatabaseQueryErrorMessages.queryFailedError,
            ErrorValue:DatabaseQueryErrorMessages.queryFailedValue,
            QueryError:error
        });
    }
}

const findProduct = async(connector, queryBy,sendResult) =>{
    try {
        let result = await connector.query(sql`
        SELECT * FROM products WHERE name OR size OR rating OR category OR type = ${queryBy}
        `);
        if(result.length >= 0){
            sendResult({successMessage:DatabaseQuerySuccessMessages.QuerySuccess,
                successValue:DatabaseQuerySuccessMessages.QuerySuccessValue,
                result:result,
    
            })
        }
        
        sendResult({message:DatabaseStatusMessages.queryDataNotFound,
                    messageValue:DatabaseStatusMessages.queryDataNotFoundValue,
        })
    } catch (error) {
        sendResult({ErrorMessage: DatabaseQueryErrorMessages.queryFailedError,
                    ErrorValue:DatabaseQueryErrorMessages.queryFailedValue,
                    QueryError:error
        });
    }
}

const PGSQL_date_now = () => {
    let date = new Date();
    let month = date.getMonth();
    let dayNumber = date.getDate();
    let year = date.getFullYear();
    return `${year}-${month}-${dayNumber}`;
}


module.exports = {
    databaseConnector,
    createUserTable,
    createProductTable,
    insertUser,
    findUser,
}