const express=require("express");
const app=express();
const port=7070; 
const path=require("path");  
const bodyparser=require("body-parser");
const methodoverride=require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));

 app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views" ,path.join(__dirname,"views"));   
app.use(express.static(path.join(__dirname,"public"))); 

let lists=[ {
      content:"sleep",
},
{
    content:"earn money",
},];

app.get("/to-do-lists",(req,res)=>{ 
    res.render("index.ejs",{lists});

}); 

app.get("/to-do-lists/new",(req,res)=>{ 
    res.render("new.ejs");  
    });    

app.post("/to-do-lists",(req,res)=>{
      let {content}=req.body;
      lists.push({content});
      
      res.redirect("/to-do-lists");
});   


    app.patch("/to-do-lists/:content",(req,res)=>{   
            let {id}=req.params;
            let newcontent=req.body.content;
            let list=lists.find((l)=>id===l.id);
            list.content=newcontent;
            res.redirect("/to-do-lists");
    });

    app.get("/to-do-lists/:content/edit",(req,res)=>{
        let{id}=req.params;
        console.log(id);
        let list=lists.find((l)=>id===l.id);
      
        res.render("edit.ejs",{list}); 
    });     

    app.delete("/to-do-lists/:content",(req,res)=>{
 let id=req.params.content;
 console.log(id);
 lists=lists.filter((l)=>id!==l.content);
 res.redirect("/to-do-lists");
    });



app.listen(port,()=>{
    console.log(`litening the port ${port}`);

});

