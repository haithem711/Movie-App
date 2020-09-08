export const initialState=null
export const reducer=(state ,action)=>{
    
    if (action.type==='Movies'){
        return action.payload 
    }
    
    return state
}