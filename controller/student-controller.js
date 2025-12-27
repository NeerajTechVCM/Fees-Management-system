
const Student = require('../models/student')



module.exports.addStudent = async (req, res) => {
    const { fullName, email, phone, course, session } = req.body.stuFormData;
    const {image} = req.body;
    const userId = req.user.id;
    let stuId = 100;
    try {
        if (!fullName || !email || !phone || !course || !session || ! image) {
            return res.json({
                message: "pls fill all fields",
                success: false
            })
        }


        const checkEmail = await Student.findOne({  $and: [
            { userId: userId },
            { email: email }
          ] });

        if (checkEmail) {
            return res.json({
                success: false,
                message: "Email already exists",
               
            });
        }

        const lastStudent = await Student.findOne({userId}).sort({ _id: -1 });
        if (lastStudent) {
            stuId = Number(lastStudent.stuId )+ 1;
        } else {
            stuId = stuId + 1;
        }
        const student = await new Student({
            fullName,
            email,
            phone,
            session,
            courseName: course.name,
            courseId: course.id,
            fees:course.fees,
            stuId,
            userId,
            stuImg:image

        });

        await student.save().then(() => console.log("student added successfully"))
            .catch((err) => console.log(err));
            res.json({
                message:"student added Successully",
                success:true,
                student:{
                    fullName:student.fullName,
                    email:student.email,
                    phone:student.phone,
                    session:student.session,
                    courseName: student.courseName,
                    courseId: student.courseId,
                    fees:student.fees,
                    stuId:student.stuId,
                    stuImg:student.stuImg
                  
                  
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



module.exports.getAllStudent= async(req,res)=>{
    const userId= req.user.id;

    try {
        const students = await Student.find({userId});

        if(students){
            res.json({
                message:"students fetched succesfully",
                success:true,
                students:students
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



module.exports.editStudent= async (req, res) => {
    const { fullName, email, phone, course, session } = req.body.stuFormData;
    const {image} = req.body;
    const { id: stuId } = req.params;
  
    if (!fullName && !email && !phone && !course && !session &&! image) {
      return res.status(400).json({ message: 'No fields to update provided', success: false });
    }
 
   const updateData={};
    if (fullName){
       updateData.fullName =fullName;
    }
    if (email){
      updateData.email = email;
    } 
 
    if (phone){
      updateData.phone = phone;
    } 
   
    if (image){
      updateData.stuImg = image;
    } 
  
    try {
      const updatedStudent = await Student.findByIdAndUpdate(stuId, updateData, { new: true });
 
      if (updatedStudent) {
        res.json({
            fullName:updatedStudent.fullName,
            email:updatedStudent.name,
           phone:updatedStudent.name,
          stuImg:updatedStudent.stuImg,
          message: "Student updated",
          success:true
        });
      } else {
        res.json({
          message: "An error occurred while updating course",
          success: false
        });
    }
}  
     catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  