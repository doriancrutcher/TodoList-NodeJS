const express=require('express')
const app=express();
app.use(express.json())

let items=[] // array of objects {Task: String,Description:String}

//POST - Add Item to Todo List 
app.post('/todo/additem',(req,res)=>{
   console.log(req.body) 
   items.push(req.body)
   console.log(items)
   res.status(200).send("Item Added")
})


//GET - Read Item from TodoList
app.get('/todo/getitem/:task?',(req,res)=>{
const task=req.params.task

let sortedItems=items

if(task){
    sortedItems=sortedItems.filter((item)=>{return item.task===task})
    console.log(sortedItems)


    if(sortedItems.length>0){
        res.status(200).send({success:true,data:sortedItems})
    }else{
        res.status(404).send("no items present")
    }

}
if(!task){
    res.status(200).send(items)
}

})


//PUT - Update Item on Todo List 

app.put('/todo/updateitem/:task?',(req,res)=>{
    const task=req.params.task;
    const updatedItem=req.body;

    const itemIndex=items.findIndex((item)=>item.task===task)

    items[itemIndex]=updatedItem

    res.status(200).send({success:true,message:"items updated",data:items})
})

//DELETE - Delete Item from todo list 

app.delete('/todo/deleteitem/:task?',(req,res)=>{
    
})

// Starting Server 
app.listen(5001,()=>{
    console.log('listening on port 5001..')
})