const Course = require('../models/course')


module.exports.addCourse =async(req,res)=>{
    const {name,duration,description,fees} = req.body.formData;
    const {image} = req.body;
    const userId=req.user.id;

    try {
        if(!name || !duration || !description ||!fees || !image  ){
            return res.json({
                message:"pls fill all fields",
                success:false
            })
        }
        const course  = await new Course({
            name,
            duration,
           description,
          fees,
          userId,
          courseImg:image
          });
      
          await course.save().then(() => console.log("Course add  successfully"))
            .catch((err) => console.log(err));

            res.json({
                message:"Course Added Successully",
                success:true,
                course:{
                    name:course.name,
                    duration:course.duration,
                   description:course.description,
                  fees:course.fees,
                  courseImg:course.courseImg

                  
                }
            })
      
    
    } catch (error) {
        res.json({
            message:"internal server error",
            success:false,
        
        })
    }
   


}




module.exports.getAllCourses= async(req,res)=>{
    const userId= req.user.id;

    try {
        const courses = await Course.find({userId});

        if(courses){
            res.json({
                message:"courses fetched succesfully",
                success:true,
                courses:courses
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


module.exports.editCourse = async (req, res) => {
    const {name,duration,description,fees} = req.body.formData;
    const {image} = req.body;
    const { id: courseId } = req.params;
  
    if (!name && !duration && !description && !fees && !image) {
      return res.status(400).json({ message: 'No fields to update provided', success: false });
    }
 
   const updateData={};
    if (name){
       updateData.name = name;
    }
    if (duration){
      updateData.duration = duration;
    } 
 
    if (description){
      updateData.description = description;
    } 
    if (fees){
        updateData.fees = fees;
      } 
    if (image){
      updateData.courseImg = image;
    } 
  
    try {
      const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
      console.log(updatedCourse)
      if (updatedCourse) {
        res.json({
            name:updatedCourse.name,
            duration:updatedCourse.name,
           description:updatedCourse.name,
          fees:updatedCourse.name,
         
          courseImg:updatedCourse.courseImg,
          message: "Course Updated",
          success: true
        });
      } else {
        res.json({
          message: "An error occurred while updating course",
          success: false
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  