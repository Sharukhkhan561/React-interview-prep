import React, { useState } from 'react'

const Players = () => {
    const [name, setName]= useState("");
    const [players, setPlayers]= useState([]);
    const [finalPlayers, setFinalPlayers]= useState([]);

    const handleClick=()=>{
        if(players.indexOf(name) >=0){
            return;
        }
        setPlayers((prev)=>{
            return[...prev, name];
        })
        setName("");
    }

    const hanldeAddClick=(value)=>{
        if(finalPlayers.indexOf(value) >=0){
            return;
        }
        setFinalPlayers((prev)=>{
            return[...prev, value]
        })
    }
    const hanldeDeleteClick=(value)=>{
        const players= [...finalPlayers];
        const finalPlayerList= players.filter((el)=> el !==value)
        setFinalPlayers(finalPlayerList);
    }
    console.log("set players", players)
  return (
    <div>
        <input type="text" name="players" placeholder='Enter Name' value={name}
        onChange={(e)=>setName(e.target.value)} />
        <button onClick={handleClick}>Add</button>
         {/* Master team */}
         <h1>Master Team</h1>
         {
            players.length >0 ?

         <ul>
            {players.map((elem, index)=>{
                return(
                    <li>
                        <span>{elem}</span>
        <button onClick={()=>hanldeAddClick(elem)}>Add</button>
        <button onClick={()=>hanldeDeleteClick(elem)}>Delete</button>
                    </li>
                )
            })}
         </ul> :"No players will added"
         }

         {/* Final list  */}
         <h1>Final Team</h1>
         {
            finalPlayers.length >0 ?

         <ul>
            {finalPlayers.map((elem, index)=>{
                return(
                    <li>
                        <span>{elem}</span>
                    </li>
                )
            })}
         </ul> :"No players will added"
         }
    </div>
  )
}

export default Players