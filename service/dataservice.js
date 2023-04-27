// const jwt=require("jsonwebtoken")

const jwt=require("jsonwebtoken")

const db=require("./db")

// userDetails = {
//   1000: {
//     username: "anu",
//     acno: 1000,
//     password: "abc123",
//     balance: 0,
//     transaction: [],
//   },
//   1001: {
//     username: "venu",
//     acno: 1001,
//     password: "abc123",
//     balance: 0,
//     transaction: [],
//   },
//   1002: {
//     username: "thanu",
//     acno: 1002,
//     password: "abc123",
//     balance: 0,
//     transaction: [],
//   },
//   1003: {
//     username: "manu",
//     acno: 1003,
//     password: "abc123",
//     balance: 0,
//     transaction: [],
//   },
// };

register = (acno, uname, psw) => {
return db.User.findOne({acno}).then(user=>{
//if acno present in db then get the object of that user else null response

if(user){
  return {
status:false,
message: "user already present",
statuscode: 404,
  }
}

else{
  newUser=new db.User({
    username:uname,
    acno,
    password:psw,
    balance:0,
    transaction:[]
  })

  newUser.save()
  return{
    status: true,
    message: "registered",
    statuscode: 200,

  }
  

  }
})

}

//   if (acno in userDetails) {
//     return {
//       status: false,
//       message: "user already present",
//       statuscode: 404,
//     };
//   } else {
//     userDetails[acno] = {
//       username: uname,
//       acno,
//       password: psw,
//       balance: 0,
//       transaction: [],
//     };
//     console.log(userDetails);
//     return {
//       status: true,
//       message: "registered",
//       statuscode: 200,
//     };
//   }
// };

login = (acno, psw) => {

return db.User.findOne({acno,password:psw}).then(user=>{
if(user){
  currentUser=user.username
  currentAcno=acno
  const token =jwt.sign({acno},"superkey123")
  return {
    status: true,
    message: "login success",
    statuscode: 200,
    currentUser,
    currentAcno,
    // token
    token
  };

}

else{

  return {
    status: false,
    message: "incorrect acno or password",
    statuscode: 404,
  };

}



})
}



//   if (acno in userDetails) {
//     if (psw == userDetails[acno]["password"]) {
//       currentUser = userDetails[acno]["username"];
//       currentAcno = acno;

//       //token create 

//       const token =jwt.sign({acno},"superkey123")

//       // const token=jwt.sign({acno},"key1234")

//       return {
//         status: true,
//         message: "login success",
//         statuscode: 200,
//         currentUser,
//         urrentAcno,
//         // token
//         token
//       };
//     } else {
//       return {
//         status: false,
//         message: "incorrect password",
//         statuscode: 404,
//       };
//     }
//   } else {
//     return {
//       status: false,
//       message: "not registered yet",
//       statuscode: 404,
//     };
//   }
// };

deposit = (acno, psw, amnt) => {
  // to covert a string amnt to int
  var amount = parseInt(amnt);

return db.User.findOne({acno,password:psw}).then(user=>{
if(user){
  user.balance+=amount
  user.transaction.push({
    Type: "Credit",
    Amount: amount,
  });
user.save()
return {
  status: true,
  message: ` your ac has been credited with amount ${amount} and the balance is ${user.balance}`,
  statuscode: 200,
};

}


else{
  return {
    status: false,
    message: "incurrect acno or password",
    statuscode: 404,
  };

}




})


}












//   if (acno in userDetails) {
//     if (psw == userDetails[acno]["password"]) {
//       userDetails[acno]["balance"] += amount;

//       //add transaction data

//       userDetails[acno]["transaction"].push({
//         Type: "Credit",
//         Amount: amount,
//       });

//       return {
//         status: true,
//         message: ` your ac has been credited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
//         statuscode: 200,
//       };
//     } else {
//       return {
//         status: false,
//         message: "incurrect password",
//         statuscode: 404,
//       };
//     }
//   } else {
//     return {
//       status: false,
//       message: "incurrect acno",
//       statuscode: 404,
//     };
//   }
// };


withdraw = (acno, psw, amnt) => {
  var amount = parseInt(amnt)
  return db.User.findOne({ acno, password: psw }).then(user => {
    if (user) {
      if (amount <= user.balance) {
        user.balance -= amount
        user.transaction.push({
          Type: "Debit",
          Amount: amount
        })
        user.save()
        return {
          status: true,
          message: `Your Account have been Debited with amount ${amount} And The Available Balance is ${user.balance}`,
          statuscode: 200
        }
      } else {
        return {
          status: false,
          message: "Insufficient balance",
          statuscode: 404
        }
      }
    } else {
      return {
        status: false,
        message: " Incorrect Account number or Password",
        statuscode: 404
  }
}
})
}
  

// if (acno in userDetails) {
//   if (psw==userDetails[acno]["password"]) {
//     if (amount<=userDetails[acno]["balance"]) {
//       userDetails[acno]["balance"]-=amount 


//        //add transaction data

//      userDetails[acno]["transaction"].push(
//       {
//        Type:"Debit",
//        Amount:amount
//       }

//     )
//     // console.log(userDetails);
   

//     return {
//       status: true,
//       message: ` your ac has been debited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
//       statuscode: 200,
//     };
//     }
//     else{
//       return{
//         status: false,
//         message: "insufficient funds",
//         statuscode: 404,
//       }
      
//     }
//   }
//   else{
//     return {
//       status: false,
//       message: "incurrect password",
//       statuscode: 404,
//     };
//   }
// }
// return {
//   status: false,
//   message: "incurrect acno",
//   statuscode: 404,
// };

// }


getTransaction=(acno)=>{

  return db.User.findOne({acno}).then(user=>{
    return {
      status: true,
      transaction: user.transaction,
      statuscode: 200,
    };
  })
  // return {
  //   status: true,
  //   transaction: userDetails[acno].transaction,
  //   statuscode: 200,
  // };
  
}


deleteAcc=(acno)=>{
  return db.User.deleteOne({acno}).then(user=>{
    if(user){
      return{
        status: true,
        message:"ac deleted",
        statuscode:200
      }
    }
    else{
      return {
        status: false,
        message:"account number is not present",
        statuscode:401
      }
    }
})
}


module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,deleteAcc
};

