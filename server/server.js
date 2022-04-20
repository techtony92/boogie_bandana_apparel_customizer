const express = require("express");
const app = express();
let PORT = process.env.PORT || 9000;
const userAPI = require("./api/api_user");
const productAPI = require("./api/api_product");
const authAPI = require("./api/api_auth");
const {databaseConnector, createProductTable, createUserTable} = require("./util/database_operations");

databaseConnector((connector)=>{
    createUserTable(connector);
    createProductTable(connector);
    
})

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());
app.use("/user", userAPI);
app.use("/products", productAPI);
app.use("/auth", authAPI);


app.listen(PORT, () =>{
    console.log(`Server Running on PORT ${PORT}`);
});


