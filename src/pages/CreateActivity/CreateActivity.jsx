import { useNavigate } from "react-router-dom"
import FormActivity from "../../components/formActivity/FormActivity"
import React, { useState } from "react";

function CreateActivity(){
    const navigate = useNavigate()

    function createPost(Activities){
        fetch('http://localhost:4000/activities', {
            method: 'POST',
            heraders: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(Activities),
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            console.log(data)
            navigate(`/Lovelace_1.2.4//activity/${data.id}`)
        })
        .catch((err)=>console.log(err))
        
    }
    return (
        <FormActivity handleSubmit={createPost}/>
    )
}

export default CreateActivity