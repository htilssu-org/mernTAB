const service=require('../../services/services')

const createHotel=async(req,res)=>{
    try{
        console.log("Request ownerID in controller:", req.ownerID);
        const {address,numberOfRooms,taxCode,companyName,nation,facilityName,businessType,scale,ownerID}=req.body
        if(!address || !numberOfRooms || !taxCode || !companyName ||!nation ||!facilityName||!businessType||!scale){
            return res.status(400).json({message:'Input is required'})
        }
        const result =await service.createHotel(req.body,req.ownerID)
        return res.status(201).json(result)
    }catch(e){
        return res.status(500).json({message:e});
    }
}

const createRoom=async(req,res)=>{
    try{
        const{numberOfBeds,typeOfRoom,money}=req.body
        if(!numberOfBeds || !typeOfRoom || !money ){
        return res.status(400).json({message:'Input is required'})
        }
        const result=await service.createRoom(req.body)
        return res.status(201).json(result) 
    }catch(e){
        return res.status(500).json({message:e});
    }
}
module.exports={
    createHotel
}