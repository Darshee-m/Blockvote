App = 
{
  loading: false,
  contracts: {},
  db:firebase.firestore(),
  gen_otp:null,
  qOTP:null, eOTP:null, resend:0, re_email:null,mins: 15,secs:15 * 60,

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.voteForCandidate()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const voting = await $.getJSON('evote.json')
    App.contracts.evote = TruffleContract(voting)
    App.contracts.evote.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.voting = await App.contracts.evote.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderCandidates: async () => {
    // Load the total task count from the blockchain
    var voterid = document.getElementById("vvid").value;
    //var voterid =100
    var v = await App.voting.voters(voterid);
    const con_id= v[6].toNumber();
    const candidateCount = await App.voting.candidatesCount()
    var candidatesList = $("#candidatesList")
    candidatesList.empty()
    
    // Render out each task with a new task template
    for (var i = 1; i <= candidateCount; i++) {
      // Fetch the task data from the blockchain
      console.log(i+""+i*100)
      var key = i*100
      const candidate = await App.voting.candidates(key)
      const cid = candidate[0].toNumber()
      console.log("candidates cid:"+cid)
      const can_name = candidate[1]
      const party_name = candidate[5]
      const constituencyId = candidate[3].toNumber()
      const constituencyName = candidate[4]
      console.log("voter's con name:"+con_id)
      console.log("candidates con name:"+constituencyId)
      console.log("candidates con name:"+constituencyName)
      //var check = con_name.localeCompare(constituencyId)
      //console.log("string match:"+check)
      
      if(con_id == constituencyId)
      {
        console.log(i+" "+cid+" "+can_name)
        var candidateTemplate = "<tr><td><input type='radio' name='ok' id='candidate' value= "+ cid+ ">" + can_name + "</td><td>" + party_name +  "</td><td><img class='rounded-circle' src='./static/"+party_name+".png' height='100' width='100'></td></tr>"
        candidatesList.append(candidateTemplate);
      }
      else{
        console.log("else part")
        continue;
      }
    }
  },

  getResults: async () => {
    // Load the total task count from the blockchain
    const c_id = document.getElementById("cid").value;
    
    const candidateCount = await App.voting.candidatesCount()
    var candidatesResult = $("#candidatesResult")
    candidatesResult.empty()
    // Render out each task with a new task template
    for (var i = 1; i <= candidateCount; i++) {
      // Fetch the task data from the blockchain
      console.log(i+""+i*100)
      var key = i*100
      const candidate = await App.voting.candidates(key)
      const cid = candidate[0].toNumber()
      console.log("candidates cid:"+cid)
      const can_name = candidate[1]
      const votes = candidate[2]
      const party_name = candidate[5]
      const constituencyId = candidate[3].toNumber()
      const constituencyName = candidate[4]
      // console.log("voter's con name:"+con_id)
      // console.log("candidates con name:"+constituencyId)
      // console.log("candidates con name:"+constituencyName)
      //var check = con_name.localeCompare(constituencyId)
      //console.log("string match:"+check)
      
      if(c_id == constituencyId)
      {
        console.log(i+" "+cid+" "+can_name)
        var candidateTemplate = "<tr><td><input type='radio' name='ok' id='candidate' value= "+ cid+ ">" + can_name + "</td><td>" + party_name +  "</td><td><img class='rounded-circle' src='./static/"+party_name+".png' height='100' width='100'></td><td>"+votes+"</td></tr>"
        candidatesResult.append(candidateTemplate);
      }
      else{
        console.log("else part")
        continue;
      }
    }
  },


  generate: async()=> {
    var SMlength=Math.floor(Math.random() * (13 - 8) ) + 8; 
    console.log("SMlength"+SMlength);
    
    var words;
    words=["bird", "clock", "boy", "plastic", "duck", "teacher", "lady", "professor", "hamster", "dog", "beautiful", "lazy", "professional", "lovely", "dumb", "rough", "soft", "hot", "vibrating", "slimy", "kicked", "ran", "flew", "dodged", "sliced", "rolled", "died", "breathed", "slept", "killed"]

    // generate random numbers
    var randomString = '';
    var flag;

    for(let i = 1; i <= SMlength; i++) 
    {
    flag=0;
    while(flag==0)
      {
        var index=Math.floor(Math.random() * (words.length - 0) ) + 0;  //generatig random index
        console.log("index"+index);
        
        if(Boolean(randomString.includes(words[index]))==false)
        flag=1;
      }
      if(i==1){
        randomString = randomString +""+words[index];
      }
      else{
        randomString = randomString +" "+words[index];
      }   
}
$('#secret_msg').html(randomString)

var RNlength=Math.floor(Math.random() * (7 - 4) ) + 4; 
    console.log("RNlength"+RNlength);


var randomNo = '';
for(let i = 1; i <= RNlength; i++) {
    let randomDigit = Math.floor(Math.random() * 10);
    console.log(randomDigit);
    randomNo = randomNo + randomDigit;
}
$('#secret_no').html(randomNo)
var strConcat=randomString.concat(randomNo)
console.log(strConcat)
var account = web3.currentProvider.selectedAddress
  var hash = await App.voting.testKeccak(strConcat)
  //var x = await App.voting.voterids(account);
  console.log(hash)
  await App.voting.storeHash(hash);
  },

registerVoter: async(lines)=>
{
  
  
  //alert('register voter');
  if(isNaN(lines[0]))
    
    {
    //alert('not a number :'+lines[0]); 
    }
    else{
      
    //alert('is a number'+lines[0]);  
      
    }
    
    
    if(typeof lines[1] == 'string')
    
    {
    //alert('is string :'+lines[1]);  
    }
    else{
      
    //alert('else :'+lines[1]); 
      
    }
    
    if(typeof lines[2] == 'string')
    
    {
      //alert('is string :'+lines[2]);
      
    }
    else{
      //alert('else :'+lines[2]);
      
      
    }
  
console.log(lines);
//var balance= web3.eth.getBalance(web3.eth.accounts[0]);
var v = await App.voting.voters(lines[0])
//contractInstance.giveRightToVote(r, {from: web3.eth.accounts[0]});
if(v[0]==lines[0])
{
  alert("Already given the right");
}
else
{
 await App.voting.giveRightToVote(lines[0],lines[1],lines[2],lines[3],{from: web3.eth.accounts[0],gas:3000000});
    //alert('added');
    
  }
  
      
 },
 registerCandidate: async(lines)=>
{
  
//console.log(lines);
//var balance= web3.eth.getBalance(web3.eth.accounts[0]);
var v = await App.voting.candidates(lines[0])
var votes = 0;
//contractInstance.giveRightToVote(r, {from: web3.eth.accounts[0]});
if(v[0]==lines[0])
{
  alert("Already registered");
}
else
{
 await App.voting.addCandidate(lines[0],lines[1],lines[2],lines[3],lines[4],votes,{from: web3.eth.accounts[0],gas:3000000});
    //alert('added');
    
  //uint toCandidate, string memory _name, uint _constid, string memory _constname, string memory _partyname, uint votes
  }
  
      
 },



voterRegistration: async()=>{
var r = document.getElementById("Voterid").value;
var v = await App.voting.voters(r);
if (v[3]==true)
{
  alert("You are already registered");
}
else if(v[0]==0)
{
  alert("You are not a valid voter");
}
else
{
var account = web3.currentProvider.selectedAddress
console.log(account)
$("#ID").html("Your Account ID: "+account);
//$("#bal").html("Balance: "+web3.eth.getBalance(account)/Math.pow(10,18));
//await App.voting.registerToVote(r);
}
 },

 checkLogin: async()=>{
  var account = web3.currentProvider.selectedAddress
  var r = document.getElementById("vvid").value;
  var secret_message = document.getElementById("sec_msg").value;
  var secret_number = document.getElementById("sec_num").value;

  var pass= secret_message.concat(secret_number)
  console.log(pass)
  //const content = $('#newTask').val()
  var hash_new = await App.voting.testKeccak(pass)
  console.log(hash_new)
  var v = await App.voting.voters(r);
  var x = await App.voting.voterids(account);
  //var check = x[2].localeCompare(secret_message)
  console.log(x[1])
  //v[3]==true && v[0] == x[0] && 
  if (hash_new == x[1])
  {
    alert("You have successfully logged in");
    // var account = web3.currentProvider.selectedAddress
    // console.log(account)
  $("#ID").html("Your account ID: "+v[4]);
    await App.renderCandidates();
  }
  else
  {
  alert("Sorry, Wrong Credentials")
  //await App.renderCandidates();
  }
   },

 voteForCandidate: async()=> {
//    var today = new Date();
//    console.log(today)
//   var dd = today.getDate();
//   var mm = today.getMonth()+1; //January is 0!
//   var yyyy = today.getFullYear();
//   if(dd<20) {
//     dd = '0'+dd
//   } 
//   if(mm<10) {
//     mm = '0'+mm
//   } 
//   today = dd + '/' + mm + '/' + yyyy;

// if(dd>ddV && mm>=mmV && yyyy>=yyyyV){    
//     alert("Voting is closed");    
//   }
//   else if(dd<ddS && mm<=mmS && yyyy<=yyyyS)
//   {
//     alert("Voting starts on "+dateS);
//   }
//   else{
     var r = document.getElementById("vvid").value;
    var account = await App.voting.voters(r)[4];
    console.log(account)
     $("#ID").html(account);
    if(await App.voting.voters(r)[1]==true)
    {
      alert("You have already voted");
    }
    else
    {
    //var e = document.getElementById("candidate").value;
    var ele = document.getElementsByName('ok'); 
              
            for(i = 0; i < ele.length; i++) { 
                if(ele[i].checked) 
                var e = ele[i].value; 
            } 
    console.log("e:"+e)
    var candidateName = e;  
    await App.voting.vote(e);
    alert("Thank you for Voting!")
    //{from: account} 
    }
   //}
 },

checkRegistration: async()=>
{


  var vid = document.getElementById("Voterid").value;
  console.log(vid);
  var v = await App.voting.voters(vid);
  console.log(v[0]);
  if(vid==null || vid=="")
  alert("Enter vid");
else if(v[0]==0)
{
  alert("You are not a valid voter");
}
else if (v[3]==true)
{
  alert("You are already registered");
}
  else
  {
    App.generateOTP();
  // var ref = App.db.collection("orders").doc(vid);

  // ref.get().then(function(doc) {
  //     if (doc.exists) {
  //         alert("Voter already registered");
  //     } else {
  //       App.generateOTP();
  //     }
  // }).catch(function(error) {
  //     console.log("Error getting document:", error);
  // });
  }
},

generateOTP: async()=>
 {
  
  var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
  gen_otp='';
    
  // Find the length of string 
  var len = string.length; 
  for (let i = 0; i < 6; i++ ) { 
      gen_otp += string[Math.floor(Math.random() * len)]; 
  } 

  console.log(gen_otp)

  App.storeData()
  App.countdown()
} ,

storeData: async()=>
{
  var vid = document.getElementById("Voterid").value;
  var v = await App.voting.voters(vid);
  if(App.resend==0) //first time opt generation
  {
    console.log("gen_otp",gen_otp);
  App.db.collection("orders").doc(vid).set({
  email: v[5],
  otp:gen_otp
})
.then(function() {
  console.log("Document successfully written!");
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});
  }
  else
  {

    App.db.collection("orders").doc(vid).set({
      email: re_email,
      otp:gen_otp
    })
    .then(function() {
      console.log("otp successfully updated!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });



  }

document.getElementById("register").disabled = false;
document.getElementById("otp").disabled = false;
},

countdown: async()=> { 
  setTimeout('App.Decrement()', 60); 
}, 

//Decrement function decrement the value. 
Decrement: async()=> { 
  if (document.getElementById) { 
      minutes = document.getElementById("minutes"); 
      seconds = document.getElementById("seconds"); 

      document.getElementById("counter").style.display = "block";

      //if less than a minute remaining 
      //Display only seconds value. 
      if (seconds < 59) { 
          seconds.value = App.secs; 
      } 

      //Display both minutes and seconds 
      //getminutes and getseconds is used to 
      //get minutes and seconds 
      else { 
          minutes.value = App.getminutes(); 
          seconds.value = App.getseconds(); 
      } 
      //when less than a minute remaining 
      //colour of the minutes and seconds 
      //changes to red 
      if (App.mins < 1) { 
          minutes.style.color = "red"; 
          seconds.style.color = "red"; 
      } 
      //if seconds becomes zero, 
      //then page alert time up 
      if (App.mins < 0) { 
          alert('time up'); 
          minutes.value = 0; 
          seconds.value = 0; 
      } 
      //if seconds > 0 then seconds is decremented 
      else { 
          App.secs--; 
          setTimeout('App.Decrement()', 1000); 
      } 
  } 
}, 

getminutes: async()=> { 
  //minutes is seconds divided by 60, rounded down 
  App.mins = Math.floor(App.secs / 60); 
  return App.mins; 
} ,

getseconds: async()=> { 
  //take minutes remaining (as seconds) away  
  //from total seconds remaining 
  return App.secs - Math.round(App.mins * 60); 
} ,

checkOTP: async()=>
{var vid = document.getElementById("Voterid").value;
  var docRef = App.db.collection("orders").doc(vid);

  docRef.get().then(async(doc)=> {
      if (doc.exists) {
          //console.log("Document data:", doc.data());
          App.qOTP = doc.get("otp"); // otp stored in firestore
          console.log("qotp ",App.qOTP);

          App.eOTP = document.getElementById("otp").value; //otp entered by user
          console.log("eotp ",App.eOTP);
          if(App.qOTP == App.eOTP)
          {
           await App.voting.registerToVote(vid);
           alert("voter registered");
           App.generate();
          //window.location.assign("secretMsg.html");
        }
          else 
          alert("OTP does not match or timeout");

      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
  
},

resendOTP: async()=>
{
  

  var vid = document.getElementById("Voterid").value;

  if(vid==null || vid=="")
  alert("Enter vid");
  else
  {
  var reRef = App.db.collection("orders").doc(vid);

    reRef.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            re_email = doc.get("email"); // otp stored in firestore
            console.log("re_email ",re_email);
            App.resend=1;
            App.generateOTP();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            window.alert("Register first");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        alert("Register first");
    });
  }
  
},
getVoterInfo: async() =>{
  var vid = document.getElementById("vid").value;
  var v = await App.voting.voters(vid); 
  var registered = v[3]
  var voted = v[1]
  console.log(registered+" "+voted)
  $('#registered').html(registered.toString())
  $('#voted').html(voted.toString())

}
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
