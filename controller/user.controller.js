
const express =require("express");
const assert =require("assert");
const UserModel=require("../model").UserSchema;


module.exports= {
    index:(req,res) =>{
        res.render("index.ejs");
    },
    details:(req,res) =>{
        res.render("details.ejs");
    },
    contact:(req,res) =>{
        res.render("contact.ejs");
    },
    api:(req,res) =>{
        res.render("path-not-found.ejs");
    },
    createUser:(req,res) =>{
        let data = new UserModel(req.body);
        console.log(data);
         data.save().then(result =>{
             res.status(200).json({code:200,message: "Successfully saved new User"});
         })
         .catch(err =>{
             res.status(200).json( {code:304,message:"Unale to save User"})
         })
    },
    readUser:(req,res) =>{
      UserModel.find({},(err,result) =>{
          if(err){
              assert.deepStrictEqual(err,null);
              res.status(200).json({code:304, message:"No data found"});
          }else{
              res.json(result);
          }
      })
    },
    readSingleUser:(req,res) =>{
        //read userid from  route path
        let id =req.params.id;
        UserModel.findById({_id:id},(err,result)=>{
            if(err){ assert.deepStrictEqual(err,null);
            res.status(200).json({code:304, message: "No user found"});
            } else {
               if(result === null){
                   res.status(200).json({code:304,message:"No data found"});
               }else{
                   res.json(result);
               }
            }
            
        })
    },
    updateUser:(req,res) =>{
        //updatedata
        let id=req.params.id;
        let data=new UserModel(req.body);

        UserModel.findByIdAndUpdate(
            {_id: id},
            {
                name:data.name,
                email:data.email,
                mobile:data.mobile,
                username:data.username,
                password:data.password,
                created:new Date().toLocaleString()
            },
            {upsert:true},
            (err,result) =>{
                if(err) {
                    assert.deepStrictEqual(err,null);
                    res.status(200).json({code:304,message:"unable to update"});
                }else{
                    res.status(200).json({code:200,message:"Successfully Updated"});
                }
            }
        )
    },
    deleteUser:(req,res) =>{
        //read id from route path
        let id =req.params.id;
        UserModel.findByIdAndDelete({ _id:id}, (err,result) =>{
            if(err) {
                assert.deepStrictEqual(err,null);
                res.status(200).json({code:304, message:" User not found"});
            

            }else{
                res.status(200).json({code:200, message:"User Successfully Deleted"});
            }
        })
    },

}