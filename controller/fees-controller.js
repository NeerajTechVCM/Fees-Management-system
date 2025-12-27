const Fees = require('../models/fees')

module.exports.collectFees = async (req,res) => {
     const { stuId, course,totalFees, amountPaid,paymentMethod,remarks } = req.body
        const userId = req.user.id;
    
        try {
            if (! stuId || !course|| !totalFees || !amountPaid || !paymentMethod || !remarks) {
                return res.json({
                    message: "pls fill all fields",
                    success: false
                })
            }
    
    
            const fees = await new Fees({
                stuId,
                course,
          
                totalFees,
                amountPaid,
                paymentMethod,
                remarks,
                userId
    
            });
    
            await fees.save().then(() => console.log("fees collect successfully"))
                .catch((err) => console.log(err));
                res.json({
                    message:"collected Successully",
                    success:true,
                    fees:{
                        stuId:fees.stuId,
                        course:fees.course,
                  
                        totalFees:fees.totalFees,
                        amountPaid:fees.amountPaid,
                        paymentMethod:fees.paymentMethod,
                        remarks:fees.remarks,
                        
                      
                      
                    }
                })
    
        }
        catch (e) {
            console.log(e);
            res.status(500).json({
              success: false,
              message: "Some error occurred",
            });
          }
} 


module.exports.getFeesHistory= async(req,res)=>{
    const userId= req.user.id;

    try {
        const feesHistory= await Fees.find({userId});

        if(feesHistory){
            console.log(feesHistory)
            res.json({
                message:"fees fetched succesfully",
                success:true,
                feesHistory:feesHistory
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            message:"internal Server error",
            success:false,
          
        })
    }
}