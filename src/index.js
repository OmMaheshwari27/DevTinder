const express= require("express");
const app=express();
const { adminauth, userauth } = require("./middlewares/auth");

app.use("/admin",adminauth,(req,res)=>{
    console.log("user was authorized");
    res.send("now admin can do anything");
})
app.use("/admin/manageUser",adminauth,(req,res)=>{
    console.log("user was authorized");
    res.send("now admin can ManageUsers");
})
app.use("/admin/UpdateProfile",adminauth,(req,res)=>{
    console.log("user was authorized");
    res.send("now admin can updateProfile");
})

app.use("/user/login",(req,res)=>{
    console.log("user tried to login");
})
app.use("/user/profile",userauth,(req,res)=>{
    console.log("user was verified");
})
app.use("/user/changePassword",userauth,(req,res)=>{
    console.log("user was verified");
});


app.listen(3001,()=>{
console.log("server is listen succesfully on port 3001");

});

//app.js old code
// app.get("/test",(req,res)=>{
//     res.send("i am test level");
// });

// app.get("/welcome",(req,res)=>{
//     res.send("i am at welcome");
// });

// app.get("/bye",(req,res)=>{
//     res.send("i am at exit level");
// });

// app.use("/bye",(req,res)=>{
//     // if nothing is sent back as response then it will case an infinite loop and later it will timed out.
// });

// app.post("/test",(req,res)=>{
//     console.log("post request here")
//     res.send("post request successfully done");
// })

// app.post("/welcome",(req,res)=>{
//     console.log("post request here")
//     res.send("post request successfully done");
// })

// app.post("/bye",(req,res)=>{
//     console.log("post request here")
//     res.send("post request successfully done");
// })


// one route can have multiple route handler
// it has a third paramter called next which is called inside the first route handler and then 2nd one will response
// but this undesirable
// this is basically known as chain of middleware(handler) until the actual handler is not met
app.use("/bye",(req,res,next)=>{
    console.log("1st post request here")
    next();
    res.send("post 1st request successfully done");
},(req,res)=>{
        console.log("2nd post request here")
    res.send("post 2nd request successfully done");
},(req,res)=>{
        console.log("3nd post request here")
    res.send("post 3nd request successfully done");
},
(req,res)=>{
        console.log("4th post request here")
    res.send("post 4th request successfully done");
}
)



// this one is the wild card for any route as handle is empty
// app.use("/",(req,res)=>{
//     res.send("i am server");
// });
app.listen(3000,()=>{
console.log("server is listen succesfully on port 3000");

});