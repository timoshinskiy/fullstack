const db = require('../service/db');
class productsController{
    async getAdminProducts(req,res){
        try{
            const username = req.params.username;
            const response = await db.query("SELECT * FROM products WHERE creator=$1",[username]);
            let data = response.rows[0];
            if(!data){
                res.status(400).send("You don't have any products!");
                return ;
            }
            if(!Array.isArray(data)){
                data=[data];
            }
            res.status(203).json(data);
        }
        catch (e) {
            res.status(501).send('Server is brake!');
            console.log(e)
        }
    }
    async getProducts(req,res){
        try{
            const response = await db.query("SELECT * FROM products");
            let data = await response.rows[0];
            if(!data){
                res.status(400).send("You don't have any products!");
                return ;
            }
            if(!Array.isArray(data)){
                data=[data];
            }
            res.status(200).json(data);
        }catch (e) {
            console.log(e);
            res.status(501).send(e.message);
        }
    }
    async editProduct(req,res){
        try{

        }catch (e) {

        }
    }
    async removeProduct(req,res){
        try{
            const {id} = req.params;
            const response = await db.query("SELECT * FROM products WHERE id=$1",[id])
            res.status(206).send('Successfully delete');
        }catch (e) {
            res.status(501).send(e.message);
        }
    }
    async getProduct(req,res){
        try{
            const {id} = req.params;
            const response = await db.query("SELECT * FROM products WHERE id=$1",[id]);
            const data = await response.rows[0];
            if(!data) {
                res.status(401).send('Not found product info');
                return ;
            }
            res.status(204).json(data);
        }catch (e) {
            res.status(501).send(e.message)
        }
    }
    async addProduct(req,res){
        try{
            const {name,description,full_description,price,creator} = req.body;
            const arr = [name,description,full_description,Number(price),creator];
            const response = await db.query("INSERT INTO products ( name, description, full_description, price, creator ) VALUES ( $1, $2, $3, $4, $5 )",arr);
            res.status(201).send('Product have been created!');
        }catch (e) {
            console.log(e);
            res.status(501).send(e.message);
        }
    }
    async orderProduct(req,res){
        try{

        }catch (e) {

        }
    }
}

module.exports = new productsController();