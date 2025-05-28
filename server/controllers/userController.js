const transporter = require('../service/mailer');
const db = require('../service/db');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

class UserController{
    async getUser(req,res){
        try{
            const {email} = req.body;
            const response = await db.query('SELECT * FROM users WHERE email=$1',[email]);
            const data = response.rows[0];
            data?res.status(200).json(data):res.status(404).send('Not found!');
        }
        catch (e) {
            res.status(502).send(e.message);
        }

    }
    async register(req,res){
        try{
            const {username,password,email} = req.body;
            const hashPassword = await bcrypt.hash(password,6);
            const uid = uuid.v4();
            const response = await db.query("INSERT INTO users (username, password, email, uid) VALUES ($1, $2, $3, $4)",[username,String(hashPassword),email,uid]);
            res.status(201).send('Successfully registration!');
        }
        catch (e) {
            res.status(501).send(e.message);
        }

    }
    async login(req,res){
        try{
            const {email,password} = req.body;
            const candidate = await db.query("SELECT * FROM users WHERE email=$1",[email]);
            const data = candidate.rows[0];
            if(!data){
                res.status(404).send("User with this email was not found!");
            }
            const equals = await bcrypt.compare(password,data.password);
            if(equals!==true){
                res.status(403).send('Entered password is wrong!');
            }
            res.status(203).json(data);
        }catch (e) {
            console.log(e);
            res.status(501).send(e.message);
        }
    }
    async sendMailApprove(req,res){
        try{
            const {email} = req.body;
            const response = await db.query('SELECT * FROM users WHERE email=$1',[email]);
            const uid = response.rows[0].uid;
            const message = {
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Approve your email at server account',
                text: '',
                html:
                    `<h1>To approve your account you need to click the button</h1><a href="http://localhost:8000/auth/approve/${uid}"><button>Approve</button></a>`
            }
            const result = await transporter.sendMail({...message});
            res.status(202).send('success');
        }
        catch (e) {
            res.status(501).send('Server is broken!');
            console.log(e);
        }

    }
    async approveEmail(req,res){
        try{
            const {uid} = req.params;
            const response = await db.query('UPDATE users SET email_verified=true WHERE uid=$1',[uid]);
            res.status(200).send('<script>window.location.replace(\'http://localhost:5173/\');</script>');
        }
        catch (e) {
            console.log(e);
            res.status(501).send('Server error');
        }

    }
    async forgotPass(req,res){

    }
}

module.exports = new UserController();