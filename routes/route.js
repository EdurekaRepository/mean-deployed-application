var mongoose = require( 'mongoose' );
var Employee = mongoose.model( 'Employee' );

exports.addEmployee=function(req,res){
                  var name=req.body.name;
                  var email=req.body.email;                  
                  var dob=req.body.dob;
                  var gender=req.body.gender;
                  var department=req.body.department;
                 
                  var today = new Date();
                  var dateOfBirth=new Date(dob);
                  var yearDifference = today.getFullYear() - dateOfBirth.getFullYear();
                  var monthDifference = today.getMonth() - dateOfBirth.getMonth();
                  if (monthDifference < 0 
                      || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) 
                  {
                                 yearDifference--;
                  }
                  var age=yearDifference;
                 

                  if(gender !== "Male" & gender !== "Female"){
                    var message="ERROR : Bad Request, Invalid value for gender ";
                    console.log(message);
                    res.status(400).send(message);
                    return;
                  }

                  var newEmployee=new Employee();

                  newEmployee.email=email;
                  newEmployee.name=name;
                  newEmployee.dob=dob;
                  newEmployee.gender=gender;
                  newEmployee.department=department;
                  newEmployee.age=age;

                  newEmployee.save(function(err,savedEmployee){
                       if(err){
                          var message="Error occured while storing new employee !!!";
                          console.log(message+"\n"+err);
                          res.status(500).send(message);
                        }else{
                         res.status(201).send(savedEmployee);
                          }
                 });

              }


exports.getEmployees=function(req,res){
                              Employee.find({}, function(err, records){

                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error Occured while fetching data");
                                        return;
                                      }else{
                                        var data=records;
                                        res.status(200).send(data);
                                      }

                              });

                            }


exports.getEmployee=function(req,res){
                                            var id=req.params.id;
                                            Employee.findOne({"_id":id}, function(err, record){
                                                    if(err){
                                                      console.log(err);
                                                      res.status(404).send("No Record Found");
                                                      return;
                                                    }else{
                                                      var data=record;
                                                      res.status(200).send(data);
                                                    }
                                            });
                                          }


exports.updateEmployee=function(req,res)
{
    var id=req.params.id;
    Employee.findOne({"_id":id},function(err,record){
                             if(err){
                               console.log("Error Occured ");
                               res.status(404).send("Record Not Found");
                             }
                             else{
                                   if(!record){
                                     res.status(404).send("No Employee found with id "+id);
                                   }
                                   else{
                                          var name=req.body.name;
                                          var email=req.body.email;                                          
                                          var dob=req.body.dob;
                                          var gender=req.body.gender;
                                          var department=req.body.department;
                                          var age;

                                          var today = new Date();
                                          var dateOfBirth=new Date(dob);
                                          var yearDifference = today.getFullYear() - dateOfBirth.getFullYear();
                                          var monthDifference = today.getMonth() - dateOfBirth.getMonth();
                                                      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
                                                             yearDifference--;
                                                       }
                                              age=yearDifference;

                                        record.name=name;
                                        record.email=email;                                        
                                        record.dob=dob;
                                        record.age=age;
                                        record.department=department;
                                        record.gender=gender;

                                          record.save(function(err,updatedRecord){
                                            if(err){
                                              console.log("Error Occured while updating record")
                                              res.status(500).send("Error Occured while updating record");
                                            }
                                            else{
                                              res.status(200).send(updatedRecord);
                                            }
                                          });
                                   }
                             }

                         });
}



exports.deleteEmployee=function(req,res){
                             var id=req.params.id;
                             Employee.findOneAndRemove({"_id":id},function(err){
                               if(err){
                                 console.log("Error : "+err);
                                 return res.status(404).send("Record not found");
                               }

                               return res.status(200).send("Record deleted Successfully");
                             });
              }
