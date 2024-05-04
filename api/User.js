const express = require("express");
const router = express.Router()
const Users=require('./../models/User')

const bcrypt=require('bcrypt')

router.post('/signup',(req,res)=>{
        let {firstname,lastname,email,password,retypepassword,dateofbirth,gender}=req.body;
        firstname=firstname.trim();
        lastname=lastname.trim();
        email=email.trim();
        password=password.trim();
        retypepassword=retypepassword.trim();
        dateofbirth=dateofbirth.trim();
        gender=gender.trim();

        if(firstname==""||lastname==""||email==""||password==""||retypepassword==""||dateofbirth==""|| gender==""){
            res.json({
                status:"failed",
                message:"Input Feilds are Empty!! Please Fill the feilds"
            });

        }
        else if(!/^[a-zA-z]*$/.test(firstname)){
            res.json({
                status:"failed",
                message:"Invalid Firstmae entered!!"
            });
            
        }
        else if(!/^[a-zA-z]*$/.test(lastname)){
            res.json({
                status:"failed",
                message:"Invalid Lastname entered!!"
            });
        }
        else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            res.json({
                status:"failed",
                message:"Invalid Email!!"
            });
        }
        else if(!new Date(dateofbirth).getTime()){
            res.json({
                status:"failed",
                message:"Invalid Date of birth!!"
            });
        }
        else if(password.length<8 || retypepassword.length<8){
            res.json({
                status:"failed",
                message:"Password is too Short!!"
            });
        }
        else if(password!=retypepassword){
            res.json({
                status:"failed",
                message:"password and retype password is not same!!please check"
            });
        }
        else{
            Users.find({email}).then(result=>{
                if(result.length){
                    res.json({
                        status:"failed",
                        message:"Email Id is already exists!! "

                    })
                }
                else{
                    const saltrounds=10
                    bcrypt.hash(password,saltrounds).then(hashedpassword=>{
                        const newuser=new Users({
                            firstname,lastname,
                            email,password:hashedpassword
                            ,retypepassword,gender,dateofbirth
                        });
                        newuser.save().then(result=>{
                            res.json({
                                status:"SUCCESS",
                                message:"Signup Successfully",
                                date:result,
                            })
                        }).catch(err=>{
                            res.json({
                                status:"Failed",
                                message:"An Error Occured while registered!!",
                            })
                        })
                    })

                }
            }).catch(err=>{
                console.log(err);
                res.json({
                    status:"failed",
                    message:"Error Occured,Please Check all details!! "

                })
            })
        }

        
})

router.post('/signin',(req,res)=>{
    let {email,password}=req.body
    email=email.trim();
    password=password.trim();
    if(email==""||password==""){
        res.json({
            status:"Failed",
            message:"Please fill the Creditinals!!",
        })
    }else{
        Users.find({email}).then(data=>{
            if(data.length){
                const hashedpassword=data[0].password;
                bcrypt.compare(password,hashedpassword).then(result=>{
                    if(result){
                        res.json({
                            status:"Success",
                            message:"Signin Successfully",
                            data:data,
                        })
                    }else{
                        res.json({
                            status:"Failed",
                            message:"Invalid Password!!",
                        })
                    }
                }).catch(err=>{
                    res.json({
                        status:"Failed",
                        message:"An Error Occured to Compare Password!!",
                    })
                })
            }else{
                res.json({
                    status:"Failed",
                    message:"entered Invalid Creditinals",
                })
            }
        }).catch(err=>{
            res.json({
                status:"Failed",
                message:"An Error Occured while Checking the user!!",
            })
        })
    }
})
module.exports=router