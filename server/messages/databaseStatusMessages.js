const DatabaseQuerySuccessMessages = {
    QuerySuccessMessage:"Query Successful",
    QuerySuccessValue:1,
}

const DatabaseQueryErrorMessages = {
   
        queryFailedError: "Query Failed",
        queryFailedValue:0,
        

}

const DatabaseStatusMessages = {
    queryDataNotFound:"Requested Data was Not Found",
    queryDataNotFoundValue:2,
    queryTimeOut:"The Requested Operation Timed Out",
    queryTimeOutValue:"3",
}


module.exports = {
    DatabaseQuerySuccessMessages,
    DatabaseQueryErrorMessages,
    DatabaseStatusMessages
}